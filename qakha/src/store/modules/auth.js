import router from '../../router'
import httpRequest from '../../services/repository'
import userInformation from '../../services/getTokenInfo'

const state = {
    userInfo: null,
    token: null,
    loginError: null,
    registerError: null,
}

const getters = {
    userInfo(state) {
        return state.userInfo;
    },
    getUserName(state) {
        return state.userInfo;
    },
    getToken(state) {
        return state.token;
    },
    getLoginError(state) {
        return state.loginError;
    },
    getRegisterError(state) {
        return state.registerError;
    }
}

const mutations = {
    setUserInfor(state, data) {
        if (data != null && typeof data == 'string') {
            if (data.lastIndexOf(" ") > 0) {
                state.userInfo = data.slice(data.lastIndexOf(" "));
            }
        } else {
            state.userInfo = data;
        }
    },
    setToken(state) {
        state.token = localStorage.getItem('token');;
    },
    setLoginError(state, data) {
        state.loginError = data;
    },
    setRegisterError(state, data) {
        state.registerError = data;
    }
}

const actions = {
    register({ commit }, params) {
        return new Promise((res, rej) => {
            console.log(params);
            httpRequest.post('/v1/sign_up', params)
                .then(response => {
                    res(response.data);
                    // console.log(response.data);
                    // router.push({ path: "/login" });
                }).catch(err => {
                    // console.log(err);
                    commit('setRegisterError', err.response.data.message);
                    rej(err.response.data.message);
                })
        })
    },
    login({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/v1/sign_in', params)
                .then(respone => {
                    localStorage.setItem('token', respone.data.token);
                    router.push({ path: "/" });
                    res(respone.data);
                }).catch(err => {
                    commit('setLoginError', err.response.data.message);
                    rej(err.response.data.message);
                })
        })
    },
    logout({ commit }) {
        // return new Promise((res, rej) => {
        //     let params = { token: localStorage.getItem('token') };
        //     httpRequest.post('/logout', params)
        //         .then(result => {
                    localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    commit('setUserInfor', null);
                    router.push({ path: "/login" });
                    // state.userInfo = null;
        //         }).catch(err => {
        //             rej(err.response.data.message);
        //     })
        // })

    },
    getUserInfoFromLocal({ commit }) {
        commit('setUserInfor', userInformation.getUserName(localStorage.getItem('token')));
    },
    isAuthenticated() {
        return new Promise((res, rej) => {
            httpRequest.getAuthen('/checkAuthenticated')
                .then(res => {
                }).catch(err => {
                    localStorage.removeItem('token');
                    router.push({ path: "/" });
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