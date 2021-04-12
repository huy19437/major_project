import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import partner from './modules/partner'
import cart from './modules/cart'
import checkout from './modules/checkout'
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    partner,
    cart,
    checkout
  },
  plugins: [createMutationsSharer({ predicate: ["cart/setCart"] })],
})