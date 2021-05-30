import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";
import axios from 'axios';

const state = {
    // vouchers: [
    //     {
    //         "id": 1,
    //         "code": "FSDN",
    //         "discount": 15000.0,
    //         "condition": 60000.0,
    //         "status": "effective",
    //         "expiry_date": "30-07-2021 00:00",
    //         "usage_limit": 10,
    //         "description": "Code 15k off, min order 60k",
    //         "partner_id": 20,
    //         "created_at": "2021-04-28T10:04:19.245+07:00",
    //         "updated_at": "2021-04-28T10:04:19.245+07:00"
    //     },
    //     {
    //         "id": 2,
    //         "code": "ALLFREE",
    //         "discount": 15000.0,
    //         "condition": 40000.0,
    //         "status": "effective",
    //         "expiry_date": "26-08-2021 00:00",
    //         "usage_limit": 10,
    //         "description": "Code 15k off, min order 40k",
    //         "partner_id": 20,
    //         "created_at": "2021-04-28T10:04:19.264+07:00",
    //         "updated_at": "2021-04-28T10:04:19.264+07:00"
    //     },
    // ],
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
                    console.log(response.data);
                    res(response.data);
                    commit('setVoucher', response.data);
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
                    res(response.data);
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