import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    count:1 //初始值
  },
  mutations: {
    addmu(state){state.count++},
    lessmu(state){state.count--}
  },
  actions: {
    addac({commit}){commit('addmu')},
    lessac({commit}){commit('lessmu')}
  }
})
