import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import partner from './modules/partner'
import cart from './modules/cart'
import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    partner,
    cart
  },
  plugins: [createMutationsSharer({ predicate: ["cart/setCart"] })],
})