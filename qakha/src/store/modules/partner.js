import httpRequest from '../../services/repository'

const state = {
    // partners2: null,
    get partners() {
        try {
            const storage = localStorage.getItem('partners');
            if (storage) {
                return JSON.parse(storage);
            }
        } catch (e) {
            return [];
        }
        return [];
    },
    set partners(data) {
        // this.partners2 = data;
    },
    partnerId: 0,
    isLoading: 0
}

const getters = {
    getPartnersLocal(state) {
        return state.partners;
    },
    getPartnerId(state) {
        return state.partnerId;
    },
    getIsLoading(state) {
        return state.isLoading
    }
}

const mutations = {
    setPartners(state, data) {
        state.partners = data;
    },
    setPartnerId(state, data) {
        state.partnerId = data
    },
    setIsLoading(state, data) {
        state.isLoading = data
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
    getPartnersBestRated({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/suggest_partners')
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    getPartnersNearBy({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/suggest_partners_nearby', params)
                .then((response) => {
                    res(response.data);
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