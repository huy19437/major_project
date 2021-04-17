import httpRequest from '../../services/repository'

const state = {
    distance: 0,
    subtt: 0,
    coins_user: 0
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
                    // commit('setDistance', response.data);
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}