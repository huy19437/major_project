import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import products from './modules/products'
import partner from './modules/partner'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    products,
    partner
  },
})