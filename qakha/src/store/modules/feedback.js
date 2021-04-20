import httpRequest from '../../services/repository'

const state = {
    feedbacks: [],
    showFeedback: false,
}

const getters = {
    getFeedbacks(state) {
        return state.feedbacks;
    },
    getFeedbacksStatus(state) {
        return state.showFeedback
    }
}

const mutations = {
    setFeedbacks(state, data) {
        state.feedbacks = data;
    },
    setShowFeeddBack(state, data) {
        state.showFeedback = data;
    }
}

const actions = {
    Feedbacks({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.get('/feedbacks/partner', { params })
                .then((response) => {
                    res(response.data.feedbacks);
                    commit('setFeedbacks', response.data.feedbacks);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    addFeedbacks({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders/feedbacks', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    addFeedbackPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders/feedbacks', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },

    showFeedback({ commit }, data) {
        commit('setShowFeeddBack', data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}