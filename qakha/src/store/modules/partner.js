import httpRequest from '../../services/repository'

const state = {
    partners: {},
}

const getters = {
    getPartnersLocal(state) {
        return state.partners;
    }
}

const mutations = {
    addNewPartner(state, data) {
        state.partners.data.unshift(data);
    },
    setPartners(state, data) {
        state.partners = data;
    },
    deleteOnePartner(state, productId) {
        state.partners.data = state.partners.data.filter(partner => partner.id != partnerId);
    },
    updateOnePartner(state, params) {
        state.partners.data = state.partners.data.map(partner => {
            if (partner.id == params.id) {
                partner = params.data;
                partner.id = params.id;
            }
            return partner
        })
    }
}

const actions = {
    getPartners({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    res();
                    commit('setPartners', response.data);
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    addPartner({ commit }, params) {
		return new Promise((res, rej) => {
            httpRequest.post('/partners', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deletePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.delete('/partners/'+ params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updatePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.put('/partners/' + params.id, params.data)
                .then((response) => {
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