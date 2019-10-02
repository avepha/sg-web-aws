import moment from 'moment'
import * as Cognito from '../../lib/aws-cognito'
import * as IoT from '../../lib/aws-iot'
import * as Api from '../../lib/api-gateway'

const state = {
  isIoTInit: false,
  thingName: '801934a38630'
}

const getters = {
  GET_THINGNAME: (state) => {
    return state.thingName
  }
}

const mutations = {
  UPDATE_IOT_INIT: (state, isInit) => {
    state.isIoTInit = isInit
  },
  SET_THINGNAME: (state, thingName) => {
    state.thingName = thingName
  }
}

const actions = {
  INIT_IOT: async (context) => {
    InitIoT(context)
  },
  UPDATE_THING: async ({state, dispatch}, data) => {
    IoT.updateThing(state.thingName, data)
    // setTimeout( ()=> {
    //     dispatch('REQUEST_SHADOW');
    // }, 4000);
  },
  REQUEST_SHADOW: async ({state}, data) => {
    console.log('[INFO] REQUEST_SHADOW', state.thingName)
    IoT.requestShadow(state.thingName)
  }
}

const InitIoT = async (context) => {
  let login = await Cognito.authUser()
  if (!login) {
    console.log('No Authority')
    return
  }
  if (context.state.isIoTIniCLOSEDt) {
    console.log('Iot is already initialized...')
    return
  }

  context.dispatch('popupWifi', 'pending')
  const identityId = Cognito.getIdentityId()
  console.log('identityId', identityId)
  let resMid = await Api.getMid(identityId)
  resMid = resMid.items[0]

  context.commit('SET_THINGNAME', resMid.mid)
  const attachs = await Api.attachConnectPolicy(identityId)
  console.log('attach', attachs)
  const awsCredentials = JSON.parse(sessionStorage.getItem('awsCredentials'))

  IoT.initNewClient(awsCredentials)

  IoT.attachConnectHandler((data) => {
    console.log('[Info] AWS-IoT Device: CONNECTED')
    IoT.subscribe('STREAM_STATUS/' + resMid.mid)

    context.dispatch('popupWifi', 'success')
  })
  IoT.attachCloseHandler((data) => {
    console.log('[Info] AWS-IoT Device: CLOSED')
  })
  IoT.attachMessageHandler((topic, jsonPayload) => {
    const payload = JSON.parse(jsonPayload.toString())
    if (topic.startsWith('STREAM_STATUS')) {
      context.commit('SET_SENSORS', payload.sensors)

      const datetime = (payload.datetime !== undefined) ?
        moment(payload.datetime)
        : moment()

      context.commit('SET_DATETIME', {
        date: datetime.format('YYYY-MM-DD'),
        time: datetime.format('HH:mm:ss')
      })

      context.commit('SET_GPIO', payload.gpio)
    }
  })

  IoT.registerThing(context.state.thingName)
  IoT.attachThingConnectHander(() => {
    console.log('[Info] AWS-IoT Shadow: CONNECTED')
    setTimeout(() => {
      console.log('get thingname', context.getters.GET_THINGNAME)
      IoT.getThing(context.getters.GET_THINGNAME)

    }, 2000)
  })
  IoT.attachThingErrorHandler((err) => console.log('[Info] AWS-IoT Shadow: ERROR', err))

  IoT.attachThingDeltaHandler((thingName, stateObject) => {
    console.log('received delta on ' + thingName + ': ' +
      JSON.stringify(stateObject.state))
  })

  IoT.attachThingStatusHandler((thingName, stat, clientToken, stateObject) => {
    console.log(stat, stateObject)
    if (stat === 'accepted') {
      // check get message
      if (stateObject.state.reported) {
        const state = stateObject.state.reported
        const control = [state.control.ch1, state.control.ch2, state.control.ch3, state.control.ch4]
        context.commit('SET_CONTROL', control)
      }
    }
  })
}


export default {
  state,
  getters,
  mutations,
  actions

}
