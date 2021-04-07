import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";

const state = {
    cart: [],
    counter: 0,
}

const getters = {
    getCartLocal(state) {
        return state.cart;
    },
}

const mutations = {
    addProductToCart(state, data) {
        state.cart.data.unshift(data);
    },
    setCart(state, data) {
        state.cart = data;
    },
    deleteProductFromCart(state, productId) {
        state.cart.data = state.cart.data.filter(product => product.id != productId);
    },
    updateCart(state, params) {
        state.cart.data = state.cart.data.map(product => {
            if (product.id == params.id) {
                product = params.data;
                product.id = params.id;
            }
            return product
        })
    },
    increment(state) {
        state.counter++;
    },
}

const actions = {
    getCart({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    // console.log(response);
                    res();
                    commit('setPartners', response.data);
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    addPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/partners', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deletePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.delete('/partners/' + params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updatePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.put('/partners/' + params.id, params.data)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateCounter({ commit }) {
        commit("increment");
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    plugins: [createMutationsSharer({ predicate: ["increment"] })],
}