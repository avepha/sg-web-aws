// import GrobotSummary from '../components/summary/GrobotSummary.vue'
// import Summary from '../components/summary/components/Summary.vue'
// import Sensors from '../components/summary/components/Sensors/Sensors.vue'
// import RealTimeGraph from '../components/summary/components/RealTimeGraph.vue'
// import Activity from '../components/summary/components/Activity.vue'
// import McuStatus from '../components/summary/components/McuStatus/McuStatus.vue'
const GrobotSummary = resolve => {
    require.ensure(['../components/summary/GrobotSummary.vue'], () => {
        resolve(require('../components/summary/GrobotSummary.vue'));
    }, 'grobot-summary')
}
const Summary = resolve => {
    require.ensure(['../components/summary/components/Summary.vue'], () => {
        resolve(require('../components/summary/components/Summary.vue'));
    }, 'grobot-summary')
}
const McuStatus = resolve => {
    require.ensure(['../components/summary/components/McuStatus/McuStatus.vue'], () => {
        resolve(require('../components/summary/components/McuStatus/McuStatus.vue'));
    }, 'grobot-summary')
}


// import Control from '../components/control/Control.vue';
// import Manual from '../components/control/components/Manual.vue'
// import Timer from '../components/control/components/Timer.vue'
// import Setpoint from '../components/control/components/Setpoint.vue'
// import Setbound from '../components/control/components/Setbound.vue'
// import Irrigation from '../components/control/components/Irrigation.vue'
const Control = resolve => {
    require.ensure(['../components/control/Control.vue'], () => {
        resolve(require('../components/control/Control.vue'));
    }, 'grobot-control')
}
const Manual = resolve => {
    require.ensure(['../components/control/components/Manual.vue'], () => {
        resolve(require('../components/control/components/Manual.vue'));
    }, 'grobot-control')
}
const Timer = resolve => {
    require.ensure(['../components/control/components/Timer.vue'], () => {
        resolve(require('../components/control/components/Timer.vue'));
    }, 'grobot-control')
}
const Setpoint = resolve => {
    require.ensure(['../components/control/components/Setpoint.vue'], () => {
        resolve(require('../components/control/components/Setpoint.vue'));
    }, 'grobot-control')
}
const Setbound = resolve => {
    require.ensure(['../components/control/components/Setbound.vue'], () => {
        resolve(require('../components/control/components/Setbound.vue'));
    }, 'grobot-control')
}

const Hybrid = resolve => {
    require.ensure(['../components/control/components/Hybrid.vue'], () => {
        resolve(require('../components/control/components/Hybrid.vue'));
    }, 'grobot-Hybrid')
}
const Irrigation = resolve => {
    require.ensure(['../components/control/components/Irrigation.vue'], () => {
        resolve(require('../components/control/components/Irrigation.vue'));
    }, 'grobot-control')
}

const AdvanceCondition = resolve => {
    require.ensure(['../components/control/components/AdvanceCondition.vue'], () => {
        resolve(require('../components/control/components/AdvanceCondition.vue'));
    }, 'grobot-control')
}
const AdvanceSetbound = resolve => {
    require.ensure(['../components/control/components/AdvanceSetbound.vue'], () => {
        resolve(require('../components/control/components/AdvanceSetbound.vue'));
    }, 'grobot-control')
}
const AdvanceTimingSetbound = resolve => {
    require.ensure(['../components/control/components/AdvanceTimingSetbound.vue'], () => {
        resolve(require('../components/control/components/AdvanceTimingSetbound.vue'));
    }, 'grobot-control')
}

const Conductivity = resolve => {
    require.ensure(['../components/control/components/control/Conductivity.vue'], () => {
        resolve(require('../components/control/components/control/Conductivity.vue'));
    }, 'conductivity')
}
// const Acidity = resolve => {
//     require.ensure(['../components/control/components/control/Acidity.vue'], () => {
//         resolve(require('../components/control/components/control/Acidity.vue'));
//     }, 'Acidity')
// }
const Co2 = resolve => {
    require.ensure(['../components/control/components/control/Co2.vue'], () => {
        resolve(require('../components/control/components/control/Co2.vue'));
    }, 'co2')
}

const Led = resolve => {
    require.ensure(['../components/control/components/control/Led.vue'], () => {
        resolve(require('../components/control/components/control/Led.vue'));
    }, 'Led')
}
const WaterProcess = resolve => {
    require.ensure(['../components/control/components/control/WaterProcess.vue'], () => {
        resolve(require('../components/control/components/control/WaterProcess.vue'));
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
        resolve(require('../components/setting/Setting.vue'));
    }, 'setting')
}
const SensorSetting = resolve => {
    require.ensure(['../components/setting/components/Sensors/SensorSetting.vue'], () => {
        resolve(require('../components/setting/components/Sensors/SensorSetting.vue'));
    }, 'setting')
}
const ActivitySetting = resolve => {
    require.ensure(['../components/setting/components/Activity.vue'], () => {
        resolve(require('../components/setting/components/Activity.vue'));
    }, 'setting')
}
const DateTime = resolve => {
    require.ensure(['../components/setting/components/DateTime.vue'], () => {
        resolve(require('../components/setting/components/DateTime.vue'));
    }, 'setting')
}
const Network = resolve => {
    require.ensure(['../components/setting/components/Network/Network.vue'], () => {
        resolve(require('../components/setting/components/Network/Network.vue'));
    }, 'setting')
}
const Station = resolve => {
    require.ensure(['../components/setting/components/Network/Station.vue'], () => {
        resolve(require('../components/setting/components/Network/Station.vue'));
    }, 'setting')
}
const Ap = resolve => {
    require.ensure(['../components/setting/components/Network/Ap.vue'], () => {
        resolve(require('../components/setting/components/Network/Ap.vue'));
    }, 'setting')
}


// import DataLogger from '../components/datalogger/DataLogger.vue'
const DataLogger = resolve => {
    require.ensure(['../components/datalogger/DataLogger.vue'], () => {
        resolve(require('../components/datalogger/DataLogger.vue'));
    }, 'setting')
}
const GraphPanel = resolve => {
    require.ensure(['../components/datalogger/components/GraphPanel.vue'], () => {
        resolve(require('../components/datalogger/components/GraphPanel.vue'));
    }, 'graphpanel')
}


const ConnectionStatus = resolve => {
    require.ensure(['../components/@shared/ConnectionStatus.vue'], () => {
        resolve(require('../components/@shared/ConnectionStatus.vue'));
    }, 'connection-status')
}

const Full = resolve => {
    require.ensure(['../containers/Full.vue'], () => {
        resolve(require('../containers/Full.vue'));
    }, 'full')
}

const Login = resolve => {
    require.ensure(['../pages/Login.vue'], () => {
        resolve(require('../pages/Login.vue'));
    }, 'login')
}

const Location = resolve => {
    require.ensure(['../components/location/Location.vue'], () => {
        resolve(require('../components/location/Location.vue'));
    }, 'location')
}


const ShowData = resolve => {
    require.ensure(['../pages/ShowData.vue'], () => {
        resolve(require('../pages/ShowData.vue'));
    }, 'show-data')
}




export const routes = [
    {
        path: '/',
        redirect: '/summary',
        name: 'Home',
        component: Full,
        children: [
            { path: 'summary', name: "summary", component: Summary },
            { path: 'status', name: "status", component: McuStatus },
            {
                path: '/logger', name: 'logger', component: DataLogger,
                children: [
                    { path: 'graph', name: 'graph-logger', component: GraphPanel }
                ]
            },
            { path: '/location', name: 'location', component: Location },
            {
                path: '/control', name: 'control', component: Control, children: [
                    { path: ':ch/', name: "control-ch", component: Control },
                    { path: ':ch/manual', name: "manual", component: Manual },
                    { path: ':ch/timer', name: "timer", component: Timer },
                    { path: ':ch/hybrid', name: "hybrid", component: Hybrid },
                    { path: ':ch/setpoint', name: "setpoint", component: Setpoint },
                    { path: ':ch/setbound', name: "setbound", component: Setbound },
                    { path: ':ch/irrigation', name: "irrigation", component: Irrigation },
                    { path: ':ch/advcond', name: "advancecondition", component: AdvanceCondition },
                    { path: ':ch/advsb', name: "advancesetbound", component: AdvanceSetbound },
                    { path: ':ch/advsbt', name: "advancetimingsetbound", component: AdvanceTimingSetbound },
                    { path: 'conductivity', name: "conductivity", component: Conductivity },
                    // { path: 'acidity', name: "acidity", component: Acidity },
                    { path: 'co2', name: "co2", component: Co2 },
                    { path: 'led', name: "led", component: Led },
                    { path: 'water', name: "water", component: WaterProcess },
                ]
            },
            {
                path: '/setting', name: 'grobot-setting', component: Setting , children: [
                    { path: 'datetime', name: 'setting-datetime', component: DateTime },
                    {
                        path: 'network', name: 'setting-network', component: Network, children: [
                            { path: 'station', name: 'setting-network-station', component: Station },
                            { path: 'ap', name: 'setting-network-ap', component: Ap },
                            { path: 'ap', name: 'setting-network-ap', component: Ap }
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
            render(c) { return c('router-view') }
        },
        children: [
            { path: 'login', name: 'Login', component: Login },
            { path: 'show', name: 'show', component: ShowData }
        ]
    }

    // {path: '/grobot-summary',name: 'grobot-summary', component: GrobotSummary, children:[
    //     {path: 'summary', name:"summary", component: Summary },
    //     {path: 'status', name:"mcu-status", component: McuStatus }
    // ]},
    // {path: '/grobot-control', name:'grobot-control', component: Control, children:[
    //     {path: ':ch/', name: "control-ch", component: Control},
    //     {path: ':ch/manual',name:"manual", component: Manual},
    //     {path: ':ch/timer',name:"timer", component: Timer},
    //     {path: ':ch/setpoint',name:"setpoint", component: Setpoint},
    //     {path: ':ch/setbound',name:"setbound", component: Setbound},
    //     {path: ':ch/irrigation',name:"irrigation", component: Irrigation},
    // ]},
    // {path: '/grobot-setting', name: 'grobot-setting', component: Setting , children: [
    //     {path: 'datetime', name:'setting-datetime', component: DateTime},
    //     {path: 'sensors', name:'setting-sensors', component: SensorSetting},
    //     {path: 'activity', name: 'setting-activity', component: ActivitySetting},
    //     {path: 'network', name: 'setting-network', component: Network, children:[
    //         {path: 'station', name: 'setting-network-station', component: Station},
    //         {path: 'ap', name: 'setting-network-ap', component: Ap}
    //     ]},
    // ]},
    // {path: '/grobot-datalogger', name: 'datalogger', component: DataLogger},
    // {path: '/connection-status', name: 'connection-status', component: ConnectionStatus},
    // {path: '/*', redirect: "/grobot-summary/summary"}
]
