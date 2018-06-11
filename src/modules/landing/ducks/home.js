import axios from 'axios';
import dispatch from '../../../utils/dispatch';

export default {
  namespaced: true,
  state: {
    // home
    index: 0,
    list: [],
    // category
    category: 'all',
  },
  mutations: {
    list(state, { list }) {
      state.list = list;
    },
    setIndex(state, { index }) {
      state.index = index;
    },
    setCategory(state, { category }) {
      state.category = category;
    }
  },
  actions: {
    // home
    setIndex: dispatch('setIndex'),
    listItems({ commit }, params = {}) {
      return axios.get('/api/landing/home', {
        params: params,
        cache: true,
      }).then(({ data }) => {
        commit({ type: 'list', list: data });
        return data;
      });
    },
    // category
    setCategory: dispatch('setCategory'),
  },
};
