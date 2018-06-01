import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './schema';
import dispatch from './utils/dispatch';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: modules,

  state: {
    toast: {},
    modal: {},
    sheet: {},
  },
  mutations: {
    showToast(state, { toast }) {
      clearTimeout(this.toastTimer);
      state.toast = { ...toast, show: true };
    },
    hideToast(state) {
      clearTimeout(this.toastTimer);
      state.toast = { ...state.toast, show: false };
    },
    tipsToast(state, { toast }) {
      state.toast = { ...toast, show: true };
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        store.dispatch('hideToast');
      }, 3000);
    },
    showModal(state, { modal }) {
      state.modal = { ...modal, show: true };
    },
    hideModal(state) {
      state.modal = { ...state.modal, show: false };
    },
    showSheet(state, { sheet }) {
      state.sheet = { ...sheet, show: true };
    },
    hideSheet(state) {
      state.sheet = { ...state.sheet, show: false };
    },
  },
  actions: {
    showToast: dispatch('showToast'),
    hideToast: dispatch('hideToast'),
    tipsToast: dispatch('tipsToast'),
    showModal: dispatch('showModal'),
    hideModal: dispatch('hideModal'),
    showSheet: dispatch('showSheet'),
    hideSheet: dispatch('hideSheet'),
  },
});

export default store;
