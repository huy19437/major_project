import router from '../../router'
import httpRequest from '../../services/repository'
import userInformation from '../../services/getTokenInfo'

const state = {
    userInfo: null,
    token: null,
    loginError: null,
    registerError: null,
    nowRoute: "",
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
    },
    getNowRoute(state) {
        return state.nowRoute;
    }
}

const mutations = {
    setUserInfor(state, data) {
        if (data != null && typeof data == 'string') {
            if (data.lastIndexOf(" ") > 0) {
                state.userInfo = data.slice(data.lastIndexOf(" "));
            } else {
                state.userInfo = data;
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
    },
    setNowRoute(state, data) {
        state.nowRoute = data;
    }
}

const actions = {
    register({ commit }, params) {
        return new Promise((res, rej) => {
            console.log(params);
            httpRequest.post('/sign_up', params)
                .then(response => {
                    res(response.data);
                }).catch(err => {
                    commit('setRegisterError', err.response.data.message);
                    rej(err.response.data.message);
                })
        })
    },
    registerPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_up', params)
                .then(response => {
                    res(response.data);
                    console.log('response: ' + response.data);
                }).catch(err => {
                    console.log(err.response.data.message);
                    commit('setRegisterError', err.response.data.message);
                    rej(err.response.data.message);
                })
        })
    },
    login({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_in', params)
                .then(respone => {
                    console.log("hi");
                    localStorage.setItem('token', respone.data.token);
                    // router.push({ path: "/" });
                    res(respone.data);
                }).catch(err => {
                    commit('setLoginError', err.response.data.message);
                    rej(err.response.data.message);
                })
        })
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        commit('setUserInfor', null);
        router.push({ path: "/login" });

    },
    forgotPassword({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/passwords/forgot', params)
                .then(response => {
                    router.push({ path: "/reset" });
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                })
        })
    },
    resetPassword({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/passwords/reset', params)
                .then(response => {
                    router.push({ path: "/login" });
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                })
        })
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
    },
    nowRoute({ commit }, params) {
        commit('setNowRoute', params);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}