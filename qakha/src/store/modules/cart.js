import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";
import axios from 'axios';

const state = {
    // carts: [
    //     {
    //         "id": 5,
    //         "quantity": 2,
    //         "product_id": 2,
    //         "user_id": 33,
    //         "partner_id": 3,
    //         "created_at": "2021-04-07T14:28:54.395Z",
    //         "updated_at": "2021-04-07T15:15:17.422Z"
    //     },
    //     {
    //         "id": 7,
    //         "quantity": 1,
    //         "product_id": 15,
    //         "user_id": 33,
    //         "partner_id": 3,
    //         "created_at": "2021-04-07T14:43:55.849Z",
    //         "updated_at": "2021-04-07T14:43:55.849Z"
    //     },
    //     {
    //         "id": 8,
    //         "quantity": 3,
    //         "product_id": 23,
    //         "user_id": 33,
    //         "partner_id": 3,
    //         "created_at": "2021-04-07T14:44:26.241Z",
    //         "updated_at": "2021-04-07T15:40:14.997Z"
    //     },
    //     {
    //         "id": 9,
    //         "quantity": 1,
    //         "product_id": 18,
    //         "user_id": 33,
    //         "partner_id": 3,
    //         "created_at": "2021-04-07T15:04:50.799Z",
    //         "updated_at": "2021-04-07T15:04:50.799Z"
    //     }
    // ],
    carts: [],
    isShopping: false,
}

const getters = {
    getCartLocal(state) {
        return state.carts;
    },
    getShoppingStatus(state) {
        return state.isShopping;
    }
}

const mutations = {
    addProductToCart(state, data) {
        state.carts = data;

    },
    setCart(state, data) {
        state.carts = data;
    },
    setIsShopping(state, data) {
        state.isShopping = data;
    }
}

const actions = {
    getCart({ commit }, params) {
        console.log(params);
        return new Promise((res, rej) => {
            httpRequest.get('/cart', { params })
                .then((response) => {
                    res(response.data);
                    commit('setCart', response.data.carts);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    addProductToCart({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/carts', params)
                .then((response) => {
                    console.log(response.data);
                    res(response.data);
                    commit('setCart', response.data.carts);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateCart({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.patch('/carts', params)
                .then((response) => {
                    console.log(response.data);
                    commit('setCart', response.data.carts);
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deleteCart({ commit }, params) {
        console.log(params);
        return new Promise((res, rej) => {
            httpRequest.delete('/carts', { data: params })
                .then((response) => {
                    console.log(response.data);
                    commit('setCart', response.data.carts);
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateCounter({ commit }) {
        commit("increment");
    },
    setCartsNull({ commit }) {
        commit('setCart', null);
    },
    setShoppingStatus({ commit }, data) {
        commit('setIsShopping', data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}