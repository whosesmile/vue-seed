import axios from 'axios';

export default {
  namespaced: true,
  state: {
    count: 1,
    list: [],
  },
  getters: {
    double: ({ count }) => 2 * count,
  },
  mutations: {
    add(state, { count }) {
      state.count += count;
    },
    list(state, { list }) {
      state.list = list;
    },
  },
  actions: {
    listItems({ commit }, params = { page: 1 }) {
      return axios.get('/landing/ajax/home', {
        params: {
          page: params.page,
        },
        cache: true,
      }).then((data) => {
        commit({ type: 'list', list: data.list });
        return data;
      });
    }
  },
};
