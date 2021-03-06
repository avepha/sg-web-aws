import * as log from 'loglevel'
import {router} from '../../router/router'
import * as Cognito from '../../lib/aws-cognito'

const state = {
  isAuth: false,
  cognitoUser: null,
  AUTH_ERRORS: {}
}

const getters = {
  cognitoUser(state) {
    return state.cognitoUser
  },
  AUTH_ERRORS: (state) => state.AUTH_ERRORS,
}

const mutations = {
  SET_AUTH_ERRORS: (state, {topic, message}) => {
    state.AUTH_ERRORS[topic] = message ? message : undefined
  }
}

const actions = {
  LOGIN_USER: ({dispatch, commit, state}, authData) => {
    clearCognitoLocalStorage()
    Cognito.loginUser(authData.username, authData.password)
      .then(userData => {
        localStorage.setItem('username', authData.username)
        return loginUserSuccess(dispatch, userData.userObj, userData.awsCredentials, 'user_pool', '')
      })
      .catch((error) => {
        commit('SET_AUTH_ERRORS', {topic: 'login', message: error.message})
      })
  },
  LOGOUT_USER: ({dispatch, commit, state}) => {
    Cognito.logoutUser()
      .then(() => {
        Cognito.clearCachedId()
        sessionStorage.clear()
        localStorage.clear()
        // router.push({name: 'Login'})
        location.reload()
      })
  },
  IS_AUTH: ({dispatch}) => {
    isAuth(dispatch)
  }
}
// check is already logged in
// route to dashboard
const isAuth = async (dispatch) => {
  const isLoggedIn = await Cognito.authUser()
  if (isLoggedIn) {
    authenticationSuccess(dispatch)
  }
}

const clearCognitoLocalStorage = () => {
  let len = localStorage.length
  for (let i = 0; i < len; i += 1, len = localStorage.length) {
    const key = localStorage.key(i)
    if (key.includes('CognitoIdentityServiceProvider') || key.includes('aws.cognito.identity')) {
      log.debug('Cleared key from localStorage', key)
      localStorage.removeItem(key)
    }
  }
}

const loginUserSuccess = (dispatch, user, awsCredentials, provider, token) => {
  sessionStorage.setItem('awsCredentials', JSON.stringify(awsCredentials))
  sessionStorage.setItem('isLoggedIn', 'true')
  sessionStorage.setItem('provider', provider)
  sessionStorage.setItem('providerToken', token)
  authenticationSuccess(dispatch)
}

// Init iot, route to dashboard
const authenticationSuccess = (dispatch) => {
  // router.push('/pages/show');
  router.push('/summary')
  dispatch('INIT_IOT')
}

export default {
  state,
  getters,
  mutations,
  actions
}
