export default {
  namespaced: true,
  state: {
    count: 1,
  },
  getters: {
    double: ({ count }) => 2 * count,
  },
  mutations: {
    add(state, { count }) {
      state.count += count;
    },
  },
  actions: {
    add({ commit }, count = 1) {
      commit({ type: 'add', count: count });
    },
  },
};
