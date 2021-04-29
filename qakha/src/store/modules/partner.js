import httpRequest from '../../services/repository'

const state = {
    partners2: JSON.parse(localStorage.getItem('partners')),
    partnerId: 0,
}

const getters = {
    getPartnersLocal(state) {
        return state.partners2;
    },
    getPartnerId(state) {
        return state.partnerId;
    }
}

const mutations = {
    setPartners(state, data) {
        state.partners2 = data;
    },
    setPartnerId(state, data) {
        state.partnerId = data
    }
}

const actions = {
    getPartners({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    localStorage.setItem('partners', JSON.stringify(response.data));
                    res(response.data);
                    commit('setPartners', JSON.parse(localStorage.getItem('partners')));
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    partnerId({ commit }, params) {
        commit('setPartnerId', params)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}