import axios from 'axios';

export default {
  namespaced: true,
  state: {
    product: {},
  },
  mutations: {
    fetched(state, { product }) {
      state.product = product;
    },
  },
  actions: {
    getProduct({ commit }, params = {}) {
      const base = () => axios.get('/api/product/details', { params: params });
      const info = () => axios.get('/api/product/tabinfo', { params: params });
      axios.all([base(), info()])
        .then(axios.spread(function (details, tabinfo) {
          const product = { ...details.data, tabinfo: tabinfo.data };
          commit({ type: 'fetched', product });
        }));
    },
  },
};
