import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";
import axios from 'axios';

const state = {
    vouchers: [],
}

const getters = {
    getVouchersLocal(state) {
        return state.vouchers;
    },
}

const mutations = {
    setVoucher(state, data) {
        state.vouchers = data;
    },
}

const actions = {
    getVouchersFlPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.get('/orders/vouchers', { params })
                .then((response) => {
                    console.log(response);
                    res(response.data);
                    commit('setVoucher', response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })

    },
    applyVouchers({ commit }, params) {
        return new Promise((res, rej) => {
            console.log(params);
            httpRequest.post('/orders/voucher', params)
                .then((response) => {
                    console.log(response);
                    res(response.data.total_after_discount);
                    // commit('setVoucher', response.data.voucher);
                }).catch(err => {
                    rej(err.response.data.error);
                });
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