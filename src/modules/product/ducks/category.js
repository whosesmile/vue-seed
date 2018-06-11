import axios from 'axios';

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    list(state, { list }) {
      state.list = list;
    },
  },
  actions: {
    listItems({ commit }, params = {}) {
      return axios.get('/api/landing/home', {
        params: params,
        cache: true,
      }).then(({ data }) => {
        commit({ type: 'list', list: data });
        return data;
      });
    },
  },
};
