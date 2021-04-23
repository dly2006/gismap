import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    city:1 //初始值
  },
  getters:{
    getCity(state){
      return state.city
    }
  },
  mutations:{
    setCity(state,name){
      state.city = name;
    }
  },
  actions:{
    setCityName({commit,state},name){
      commit('setCity',name)
    }
  }
})
