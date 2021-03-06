import router from '../../router'
import httpRequest from '../../services/repository'
import userInformation from '../../services/getTokenInfo'

const state = {
    userInfo: null,
    token: null,
    loginError: null,
    registerError: null,
    registerPartnerError: null,
    nowRoute: "",
    user: null,
}

const getters = {
    getUser(state) {
        return state.user;
    },
    getUserAddress(state) {
        return state.user.addresses;
    },
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
    getRegisterPartnerError(state) {
        return state.registerPartnerError;
    },
    getNowRoute(state) {
        return state.nowRoute;
    }
}

const mutations = {
    setUser(state, data) {
        state.user = data
    },
    setUserInfor(state, data) {
        if (data) {
            if (data.name != null && typeof data.name == 'string') {
                if (data.name.lastIndexOf(" ") > 0) {
                    let tmp = data.name.trim();
                    state.userInfo = tmp.slice(tmp.lastIndexOf(" "));
                } else {
                    state.userInfo = data.name.trim();
                }
            } else {
                state.userInfo = data.name;
            }
        } else if (data === null) {
            state.userInfo = null;
        }
        // console.log(state.userInfo);
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
    setRegisterPartnerError(state, data) {
        state.registerPartnerError = data;
    },
    setNowRoute(state, data) {
        state.nowRoute = data;
    }
}

const actions = {
    register({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_up', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    commit('setRegisterError', err.response ? err.response.data.message : err);
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    registerPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_up', params)
                .then(response => {
                    res(response.data);
                }).catch(err => {
                    commit('setRegisterPartnerError', err.response ? err.response.data.message : err);
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    registerDriver({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_up', params)
                .then(response => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    login({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/sign_in', params)
                .then(respone => {
                    localStorage.setItem('token', respone.data.token);
                    // router.push({ path: "/" });
                    res(respone.data);
                }).catch(err => {
                    console.log(err);
                    commit('setLoginError', err.response ? err.response.data.message : err);
                    rej(err.response ? err.response.data : err);
                })
        })
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        commit('setUserInfor', null);
        commit('setUser', null);
        router.push({ path: "/login" });

    },
    forgotPassword({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/passwords/forgot', params)
                .then(response => {
                    router.push({ path: "/reset" });
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    resetPassword({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/passwords/reset', params)
                .then(response => {
                    router.push({ path: "/login" });
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    getUserInfoFromLocal({ commit }) {
        // console.log(userInformation.getUser(localStorage.getItem('token')));
        commit('setUserInfor', userInformation.getUser(localStorage.getItem('token')));
    },
    user({ commit }) {
        commit('setUser', userInformation.getUser(localStorage.getItem('token')));
    },
    nowRoute({ commit }, params) {
        commit('setNowRoute', params);
    },
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
    activeAccount({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/activated_account', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    activeAccountDriver({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/activated_account_driver', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    activeAccountPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/activated_account_partner', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    resendActiveCode({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/user/confirmation', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    resendActiveCodePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/partner/confirmation', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    resendActiveCodeDriver({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/driver/confirmation', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
        })
    },
    resendActiveCodeChangeEmail({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/user/resend_change_email', params)
                .then(response => {
                    res(response.data.message);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                })
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