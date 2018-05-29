import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './schema';

Vue.use(Vuex);

// 快捷方式 兼容: store.dispatch
const dispatch = function (type) {
  return ({ commit }, payload = {}) => {
    commit({ type: type, ...payload });
  };
};

const store = new Vuex.Store({
  modules: modules,

  state: {
    toast: {},
    modal: {},
  },
  mutations: {
    showToast(state, { toast }) {
      state.toast = { ...toast, show: true };
    },
    hideToast(state) {
      state.toast = { ...state.toast, show: false };
    },
    showModal(state, { modal }) {
      state.modal = { ...modal, show: true };
    },
    hideModal(state) {
      state.modal = { ...state.modal, show: false };
    },
  },
  actions: {
    showToast: dispatch('showToast'),
    hideToast: dispatch('hideToast'),
    showModal: dispatch('showModal'),
    hideModal: dispatch('hideModal'),
  },
});

export default store;
