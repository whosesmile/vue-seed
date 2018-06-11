import dispatch from '../../../utils/dispatch';
export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    listItems(state, { list }) {
      state.list = list;
    },
  },
  actions: {
    listItems: dispatch('listItems'),
  },
};
