const state = {
  sensorName: ['temperature', 'humidity', 'vpd', 'soil_temperature', 'soil', 'soil_potential', 'co2', '', 'par']
}
var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'hybrid', 'irrigation', 'advancecondition']

const getters = {

  getControlName: (state, getters) => {
    var data = []
    getters.GET_CONTROL.forEach(c => {
      data.push(controlName[c.mode])
    })
    return data
  },
  getSensorName: (state) => {
    return state.sensorName
  }
}

const mutations = {
  updateControl: (state, payload) => {
    state.control = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
