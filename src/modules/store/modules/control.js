import Vue from 'vue';
import control from '../../components/control/components/models/control.js';

import axios from '../../axios/axios';
const state = {
    sensorName:['vpd','soil', 'par', 'temperature', 'humidity', 'co2', 'light']
}
var controlName = ['manual', 'timer', 'setpoint', 'setbound', 'hybrid',  'irrigation', 'advancecondition']

const getters = {
    
    getControlName: (state,getters)=>{
        var data = []
        getters.GET_CONTROL.forEach(c=>{
            data.push(controlName[c.mode]);
        })
        return data;
    },
    getSensorName: (state)=>{
        return state.sensorName
    }
}

const mutations = {
    updateControl: (state, payload)=>{
        state.control = payload;
    }
}

const actions = {
    
}

export default{
    state,
    getters,
    mutations,
    actions
}