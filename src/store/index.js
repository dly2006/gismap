import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    // state mutation action getter module
    state:{
      count: 1
    },
    mutations: {
      addmu(state){state.count++},
    },
    actions: {
      addac({commit}){commit('addmu')},
    }
})
