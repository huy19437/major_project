import httpRequest from '../../services/repository'
import createMutationsSharer from "vuex-shared-mutations";

const state = {
    carts: [
        {
            "id": 5,
            "quantity": 2,
            "product_id": 2,
            "user_id": 33,
            "partner_id": 3,
            "created_at": "2021-04-07T14:28:54.395Z",
            "updated_at": "2021-04-07T15:15:17.422Z"
        },
        {
            "id": 7,
            "quantity": 1,
            "product_id": 15,
            "user_id": 33,
            "partner_id": 3,
            "created_at": "2021-04-07T14:43:55.849Z",
            "updated_at": "2021-04-07T14:43:55.849Z"
        },
        {
            "id": 8,
            "quantity": 3,
            "product_id": 23,
            "user_id": 33,
            "partner_id": 3,
            "created_at": "2021-04-07T14:44:26.241Z",
            "updated_at": "2021-04-07T15:40:14.997Z"
        },
        {
            "id": 9,
            "quantity": 1,
            "product_id": 18,
            "user_id": 33,
            "partner_id": 3,
            "created_at": "2021-04-07T15:04:50.799Z",
            "updated_at": "2021-04-07T15:04:50.799Z"
        }
    ],
    // carts: [],
    counter: 0,
    isShopping: false,
}

const getters = {
    getCartLocal(state) {
        return state.carts;
    },
    getShoppingStatus(state) {
        return state.isShopping;
    }
}

const mutations = {
    addProductToCart(state, data) {
        function isEqual(objA, objB) {
            var aProps = Object.getOwnPropertyNames(objA);
            var bProps = Object.getOwnPropertyNames(objB);
            if (aProps.length != bProps.length) {
                console.log("1");
                return false;
            }

            for (var i = 0; i < aProps.length - 1; i++) {
                var propName = aProps[i];
                if (objA[propName] !== objB[propName]) {
                    console.log(aProps);
                    console.log(objA[propName] + '====' + objB[propName]);
                    console.log("2");
                    return false;
                }
            }
            return true;
        }
        function add(object) {
            if (object) {
                if (state.carts.filter(x => x.id === object.id).length === 0) {
                    state.carts.push(object)
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            add(data[i]);
        }
        console.log(state.carts)

    },
    setCart(state, data) {
        state.carts = data;
    },
    increment(state) {
        state.counter++;
    },
    setIsShopping(state, data) {
        state.isShopping = data;
    }
}

const actions = {
    getCart({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    // console.log(response);
                    res();
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    addProductToCart({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/carts', params)
                .then((response) => {
                    res();
                    commit('addProductToCart', response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateCounter({ commit }) {
        commit("increment");
    },
    setCartsNull({ commit }) {
        commit('setCart', null);
    },
    setShoppingStatus({ commit }, data) {
        commit('setIsShopping', data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    plugins: [createMutationsSharer({ predicate: ["increment"] })],
}