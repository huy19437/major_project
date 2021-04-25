import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";
import axios from 'axios';

const state = {
    address: [],
}

const getters = {
    getAddressLocal(state) {
        return state.address;
    },
}

const mutations = {
    setAddress(state, data) {
        state.address = data;
    },
    pushAddress(state, data) {
        state.address.push(data);
    },
    addAddress(state, data) {
        state.address = data;

    },
}

const actions = {
    getAddress({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/addresses')
                .then((response) => {
                    res(response.data);
                    commit('setAddress', response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    getUserCurrentAddress({ commit }, params) {
        return new Promise((res, rej) => {
            axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', { params })
                .then((response) => {
                    res(response.data);
                    // commit('setAddress', response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    addAddress({ commit }, params) {
        // console.log(params);
        return new Promise((res, rej) => {
            httpRequest.post('/addresses', params)
                .then((response) => {
                    // console.log(response.data);
                    res(response.data);
                    commit('pushAddress', response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateAddress({ commit }, params) {
        // console.log(params.id);
        return new Promise((res, rej) => {
            httpRequest.patch('/addresses/' + params.id, { name: params.name })
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deleteAddress({ commit }, params) {
        // console.log(params);
        return new Promise((res, rej) => {
            httpRequest.delete('/addresses/' + params)
                .then((response) => {
                    // console.log(response.data);
                    // commit('setAddress', response.data);
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
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