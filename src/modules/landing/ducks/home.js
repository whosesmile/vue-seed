import axios from 'axios';
import dispatch from '../../../utils/dispatch';

export default {
  namespaced: true,
  state: {
    index: 0,
    list: [],
  },
  mutations: {
    list(state, { list }) {
      state.list = list;
    },
    setIndex(state, { index }) {
      state.index = index;
    }
  },
  actions: {
    setIndex: dispatch('setIndex'),
    listItems({ commit }, params = { page: 1 }) {
      return axios.get('/api/landing/home', {
        params: {
          page: params.page,
        },
        cache: true,
      }).then((data) => {
        commit({ type: 'list', list: data.list });
        return data;
      });
    },
  },
};
