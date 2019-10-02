import moment from 'moment'

const state = {
  sensors: {
    temperature: 0,
    humidity: 0,
    vpd: 0,
    soil_temperature: 0,
    soil: 0,
    soil_potential: 0,
    co2: 0,
    light: 0,
    par:0,
    paracc: 0,
  },
  control: [],
  gpio: [],
  date: moment().format('YYYY-MM-DD'),
  time: moment().format('HH:mm:ss')
}

const getters = {
  GET_DATETIME: (state) => {
    return {
      date: state.date,
      time: state.time
    }
  },
  GET_SENSORS: (state) => {
    return state.sensors;
  },
  GET_CONTROL: (state) => {
    return state.control;
  },
  control: (state) => {
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
  },
  SET_DATETIME: (state, datetime) => {
    state.date = datetime.date;
    state.time = datetime.time;
  }
}

const actions = {
  UPDATE_CONTROL: ({
    dispatch,
    state
  }) => {
    console.log('[INFO] UPDATE_THING');
    var control = {
      ch1: state.control[0],
      ch2: state.control[1],
      ch3: state.control[2],
      ch4: state.control[3]
    }
    dispatch('UPDATE_THING', {
      control: control
    });
  },
  UPDATE_CONTROL_CH: ({dispatch, state}, ch) => {
    const control = {}
    const channel = parseInt(ch)
    control[`ch${(channel + 1)}`] = state.control[channel];
    dispatch('UPDATE_THING', {
      control,
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
