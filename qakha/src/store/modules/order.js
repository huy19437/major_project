import httpRequest from '../../services/repository'

const state = {
    distance: 0,
    subtt: 0,
    coins_user: 0,
    order: {},
    order_details: [],
    history_order: [],
}

const getters = {
    getDistance(state) {
        return state.distance;
    },
    getSubtotal(state) {
        return state.subtt;
    },
    getCoinsUser(state) {
        return state.coins_user;
    },
    getOrder(state) {
        return state.order
    },
    getOrderDetails(state) {
        return state.order_details
    },
    getHistoryOrder(state) {
        return state.history_order
    }
}

const mutations = {
    setDistance(state, data) {
        state.distance = data;
    },
    setSubTotal(state, data) {
        state.subtt = data
    },
    setCoinsUser(state, data) {
        state.coins_user = data
    },
    setOrder(state, data) {
        state.order = data
    },
    setOrderDetails(state, data) {
        state.order_details = data
    },
    setHistoryOrder(state, data) {
        state.history_order = data
    }
}

const actions = {
    getDistanceForShip({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders/calc_distance', params)
                .then((response) => {
                    res(response.data);
                    commit('setDistance', response.data);
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    createOrder({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders', params)
                .then((response) => {
                    console.log(response);
                    res(response.data);
                    commit('setOrder', response.data.order);
                    commit('setOrderDetails', response.data.order_details);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    coinsUsers({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/orders/coins_user')
                .then((response) => {
                    console.log(response.data);
                    commit('setCoinsUser', response.data.coins);
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.message);
                });
        })
    },
    historyOrders({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/orders')
                .then((response) => {
                    commit('setHistoryOrder', response.data);
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.message);
                });
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}