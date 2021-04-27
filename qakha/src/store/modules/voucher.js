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
                    res(response.data);
                    commit('setVoucher', response.data);
                    // console.log(state.vouchers);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })

    },
    applyVouchers({ commit }, params) {
        return new Promise((res, rej) => {
            // console.log(params);
            httpRequest.post('/orders/voucher', params)
                .then((response) => {
                    // console.log(response.data);
                    res(response.data);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    cancelVouchers({ commit }, params) {
        return new Promise((res, rej) => {
            // console.log(params);
            httpRequest.delete('/orders/voucher', { data: params })
                .then((response) => {
                    // console.log(response.data);
                    res(response.data.total_before_discount);
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
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