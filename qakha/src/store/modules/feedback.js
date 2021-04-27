import httpRequest from '../../services/repository'

const state = {
    feedbacks: [],
    showFeedback: false,
    avg_point: 0,
    number_of_reviews: 0
}

const getters = {
    getFeedbacks(state) {
        return state.feedbacks;
    },
    getFeedbacksStatus(state) {
        return state.showFeedback
    },
    getAveragePoint(state) {
        return state.avg_point
    },
    getNumberOfReviews(state) {
        return state.number_of_reviews
    }
}

const mutations = {
    setFeedbacks(state, data) {
        state.avg_point = data.avg_point
        state.number_of_reviews = data.number_of_reviews
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
    },
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
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    addFeedbacks({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders/feedbacks', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    addFeedbackPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/orders/feedbacks', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
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