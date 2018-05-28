import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './schema';

Vue.use(Vuex);

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

  },
});

export default store;
