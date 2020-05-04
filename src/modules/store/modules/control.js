const state = {
  sensorName: ['temperature', 'humidity', 'vpd', 'soil_temperature', 'soil', 'soil_potential', 'co2', '', 'par']
}

const getters = {
  getSensorName: (state) => {
    return state.sensorName
  }
}

const mutations = {
  updateControl: (state, payload) => {
    state.control = payload
  }
}

export default {
  state,
  getters,
  mutations,
}
