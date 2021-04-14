import httpRequest from '../../services/repository'

const state = {
    distance: 0,
    subtt: 0
}

const getters = {
    getDistance(state) {
        return state.distance;
    },
    getSubtotal(state) {
        return state.subtt;
    }
}

const mutations = {
    setDistance(state, data) {
        state.distance = data;
    },
    setSubTotal(state, data) {
        state.subtt = data
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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}