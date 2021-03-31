import httpRequest from '../../services/repository'

const state = {
    products: {},
}

const getters = {
    getProductsLocal(state) {
        return state.products;
    }
}

const mutations = {
    addNewProduct(state, data) {
        state.products.data.unshift(data);
    },
    setProduct(state, data) {
        state.products = data;
    },
    deleteOneProduct(state, productId) {
        state.products.data = state.products.data.filter(product => product.id != productId);
    },
    updateOneProduct(state, params) {
        state.products.data = state.products.data.map(product => {
            if (product.id == params.id) {
                product = params.data;
                product.id = params.id;
            }
            return product
        })
    }
}

const actions = {
    getProducts({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.get('/products')
                .then((response) => {
                    res();
                    commit('setProduct', response.data);
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    addProduct({ commit }, params) {
		return new Promise((res, rej) => {
            httpRequest.post('/products', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deleteProduct({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.delete('/products/'+ params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updateProduct({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.put('/products/' + params.id, params.data)
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