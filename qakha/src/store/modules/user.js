import router from '../../router'
import httpRequest from '../../services/repository'
import userInformation from '../../services/getTokenInfo'

const state = {
    user: {},
}

const getters = {
    getUserInfo(state) {
        return state.user;
    },
}

const mutations = {
    setUser(state, data) {
        state.user = data
    },
}

const actions = {
    updateUser({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.patch('/user', params)
                .then(response => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    showUser({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/user')
                .then(response => {
                    res(response.data);
                    commit('setUser', response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    changePassWord({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.patch('/user/change_password', params)
                .then(response => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
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