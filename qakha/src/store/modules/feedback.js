import httpRequest from '../../services/repository'

const state = {
    feedbacks: [],
    showFeedback: false,
    avg_point: 0
}

const getters = {
    getFeedbacks(state) {
        console.log('hi');
        return state.feedbacks;
    },
    getFeedbacksStatus(state) {
        return state.showFeedback
    },
    getAveragePoint(state) {
        return state.avg_point
    }
}

const mutations = {
    setFeedbacks(state, data) {
        state.avg_point = data.avg_point
        state.feedbacks = []
        data.feedbacks.forEach(element => {
            state.feedbacks.unshift(element)
        });
    },
    setShowFeeddBack(state, data) {
        state.showFeedback = data;
    },
    setAveragePoint(state, data) {
        state.avg_point = data
    }
}

const actions = {
    Feedbacks({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.get('/feedbacks/partner', { params })
                .then((response) => {
                    res(response.data.feedbacks);
                    commit('setFeedbacks', response.data);
                    // commit('setAveragePoint', response.data.avg_point);
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