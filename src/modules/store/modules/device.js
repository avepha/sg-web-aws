
const state = {
    sensors: { "ec": 0, "ph": 0, "water": 0, "light": 0, "temperature": 0, "humidity": 0, "co2": 0, "floating": 0, "date": "2018-01-01", "time": "00:00:00", "timestamp": 0, "mid": "-" },
    control: [],
    gpio: []
}

const getters = {
    GET_DATETIME: (state) =>{ 
        return { date: state.sensors.date, time: state.sensors.time }
    },
    GET_SENSORS: (state) => {
        return state.sensors;
    },
    GET_CONTROL: (state) => {
        return state.control;
    },
    control: (state) =>{ 
        return state.control;
    },
    GET_GPIO: (state) => {
        return state.gpio
    }
}

const mutations = {
    SET_SENSORS: (state, sensors) => {
        state.sensors = sensors;
    },
    SET_CONTROL: (state, control) => {
        state.control = control;
    },
    SET_GPIO: (state, gpio) => {
        state.gpio = gpio;
    }
}

const actions = {
    UPDATE_CONTROL: ({dispatch,state})=>{
        console.log('[INFO] UPDATE_THING');
        var control = {
            ch1: state.control[0],
            ch2: state.control[1],
            ch3: state.control[2],
            ch4: state.control[3]
        }
        dispatch('UPDATE_THING', {control: control});
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
