
const state = {
  sensors: {
    ec: 0,
    ph: 0,
    soil: 0,
    vpd: 0,
    temperature: 0,
    humidity: 0,
    par: 0,
    co2: 0,
    light: 0,
    water: 0
  },
  // 0:vpd, 1:soil, 2:par, 3:temp, 4:humi, 5:co2
  sensorName: ['ec', 'ph', 'water', 'temperature', 'humidity', 'co2', 'light']
}
const getters = {
  getSensors(state) {
    return state.sensors;
  }
}

const mutations = {
  updateSensors(state, payload) {
    state.sensors = payload;
  }
}

const actions = {
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
