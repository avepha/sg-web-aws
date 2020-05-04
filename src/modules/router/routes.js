const Summary = resolve => {
  require.ensure(['../components/summary/components/Summary.vue'], () => {
    resolve(require('../components/summary/components/Summary.vue'))
  }, 'grobot-summary')
}
const McuStatus = resolve => {
  require.ensure(['../components/summary/components/McuStatus/McuStatus.vue'], () => {
    resolve(require('../components/summary/components/McuStatus/McuStatus.vue'))
  }, 'grobot-summary')
}

const Control = resolve => {
  require.ensure(['../components/control/Control.vue'], () => {
    resolve(require('../components/control/Control.vue'))
  }, 'grobot-control')
}
const Manual = resolve => {
  require.ensure(['../components/control/components/Manual.vue'], () => {
    resolve(require('../components/control/components/Manual.vue'))
  }, 'grobot-control')
}
const Timer = resolve => {
  require.ensure(['../components/control/components/Timer.vue'], () => {
    resolve(require('../components/control/components/Timer.vue'))
  }, 'grobot-control')
}

const Irrigation = resolve => {
  require.ensure(['../components/control/components/Irrigation.vue'], () => {
    resolve(require('../components/control/components/Irrigation.vue'))
  }, 'grobot-control')
}

const Setpoint = resolve => {
  require.ensure(['../components/control/components/Setpoint.vue'], () => {
    resolve(require('../components/control/components/Setpoint.vue'))
  }, 'grobot-control')
}

const AdvanceSetbound = resolve => {
  require.ensure(['../components/control/components/AdvanceSetbound.vue'], () => {
    resolve(require('../components/control/components/AdvanceSetbound.vue'))
  }, 'grobot-control')
}

const AdvanceTimingSetbound = resolve => {
  require.ensure(['../components/control/components/AdvanceTimingSetbound.vue'], () => {
    resolve(require('../components/control/components/AdvanceTimingSetbound.vue'))
  }, 'grobot-control')
}

const Conductivity = resolve => {
  require.ensure(['../components/control/components/control/Conductivity.vue'], () => {
    resolve(require('../components/control/components/control/Conductivity.vue'))
  }, 'conductivity')
}
// const Acidity = resolve => {
//     require.ensure(['../components/control/components/control/Acidity.vue'], () => {
//         resolve(require('../components/control/components/control/Acidity.vue'));
//     }, 'Acidity')
// }
const Co2 = resolve => {
  require.ensure(['../components/control/components/control/Co2.vue'], () => {
    resolve(require('../components/control/components/control/Co2.vue'))
  }, 'co2')
}

const Led = resolve => {
  require.ensure(['../components/control/components/control/Led.vue'], () => {
    resolve(require('../components/control/components/control/Led.vue'))
  }, 'Led')
}
const WaterProcess = resolve => {
  require.ensure(['../components/control/components/control/WaterProcess.vue'], () => {
    resolve(require('../components/control/components/control/WaterProcess.vue'))
  }, 'WaterProcess')
}


// import Setting from '../components/setting/Setting.vue';
// import SensorSetting from '../components/setting/components/Sensors/SensorSetting.vue';
// import ActivitySetting from '../components/setting/components/Activity.vue';
// import DateTime from '../components/setting/components/DateTime.vue';
// import Network from '../components/setting/components/Network/Network.vue';
// import Station from '../components/setting/components/Network/Station.vue';
// import Ap from '../components/setting/components/Network/Ap.vue';
const Setting = resolve => {
  require.ensure(['../components/setting/Setting.vue'], () => {
    resolve(require('../components/setting/Setting.vue'))
  }, 'setting')
}
const SensorSetting = resolve => {
  require.ensure(['../components/setting/components/Sensors/SensorSetting.vue'], () => {
    resolve(require('../components/setting/components/Sensors/SensorSetting.vue'))
  }, 'setting')
}
const ActivitySetting = resolve => {
  require.ensure(['../components/setting/components/Activity.vue'], () => {
    resolve(require('../components/setting/components/Activity.vue'))
  }, 'setting')
}
const DateTime = resolve => {
  require.ensure(['../components/setting/components/DateTime.vue'], () => {
    resolve(require('../components/setting/components/DateTime.vue'))
  }, 'setting')
}
const Network = resolve => {
  require.ensure(['../components/setting/components/Network/Network.vue'], () => {
    resolve(require('../components/setting/components/Network/Network.vue'))
  }, 'setting')
}
const Station = resolve => {
  require.ensure(['../components/setting/components/Network/Station.vue'], () => {
    resolve(require('../components/setting/components/Network/Station.vue'))
  }, 'setting')
}
const Ap = resolve => {
  require.ensure(['../components/setting/components/Network/Ap.vue'], () => {
    resolve(require('../components/setting/components/Network/Ap.vue'))
  }, 'setting')
}


// import DataLogger from '../components/datalogger/DataLogger.vue'
const DataLogger = resolve => {
  require.ensure(['../components/datalogger/DataLogger.vue'], () => {
    resolve(require('../components/datalogger/DataLogger.vue'))
  }, 'setting')
}
const GraphPanel = resolve => {
  require.ensure(['../components/datalogger/components/GraphPanel.vue'], () => {
    resolve(require('../components/datalogger/components/GraphPanel.vue'))
  }, 'graphpanel')
}


const ConnectionStatus = resolve => {
  require.ensure(['../components/@shared/ConnectionStatus.vue'], () => {
    resolve(require('../components/@shared/ConnectionStatus.vue'))
  }, 'connection-status')
}

const Full = resolve => {
  require.ensure(['../containers/Full.vue'], () => {
    resolve(require('../containers/Full.vue'))
  }, 'full')
}

const Login = resolve => {
  require.ensure(['../pages/Login.vue'], () => {
    resolve(require('../pages/Login.vue'))
  }, 'login')
}

const Location = resolve => {
  require.ensure(['../components/location/Location.vue'], () => {
    resolve(require('../components/location/Location.vue'))
  }, 'location')
}


const ShowData = resolve => {
  require.ensure(['../pages/ShowData.vue'], () => {
    resolve(require('../pages/ShowData.vue'))
  }, 'show-data')
}


export const routes = [
  {
    path: '/',
    redirect: '/summary',
    name: 'Home',
    component: Full,
    children: [
      {path: 'summary', name: 'summary', component: Summary},
      {path: 'status', name: 'status', component: McuStatus},
      {
        path: '/logger', name: 'logger', component: DataLogger,
        children: [
          {path: 'graph', name: 'graph-logger', component: GraphPanel}
        ]
      },
      {path: '/location', name: 'location', component: Location},
      {
        path: '/control', name: 'control', component: Control, children: [
          {path: ':ch/', name: 'control-ch', component: Control},
          {path: ':ch/manual', name: 'manual', component: Manual},
          {path: ':ch/timer', name: 'timer', component: Timer},
          {path: ':ch/setpoint', name: 'setpoint', component: Setpoint},
          {path: ':ch/advsb', name: 'setbound', component: AdvanceSetbound},
          {path: ':ch/advsbt', name: 'setboundTiming', component: AdvanceTimingSetbound},
          {path: ':ch/irrigation', name: 'irrigation', component: Irrigation},
        ]
      },
      {
        path: '/setting', name: 'grobot-setting', component: Setting, children: [
          {path: 'datetime', name: 'setting-datetime', component: DateTime},
          {
            path: 'network', name: 'setting-network', component: Network, children: [
              {path: 'station', name: 'setting-network-station', component: Station},
              {path: 'ap', name: 'setting-network-ap', component: Ap},
              {path: 'ap', name: 'setting-network-ap', component: Ap}
            ]
          },
        ]
      }
    ]
  },
  {
    path: '/pages',
    redirect: '/pages/login',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [
      {path: 'login', name: 'Login', component: Login},
      {path: 'show', name: 'show', component: ShowData}
    ]
  }
]
