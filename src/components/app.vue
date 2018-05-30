<template>
  <div id="app">
    <router-view></router-view>
    <ex-widgets>
      <ex-toast v-bind="toast" />
      <ex-modal v-bind="modal" />
      <ex-sheet v-bind="sheet" />
    </ex-widgets>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['toast', 'modal', 'sheet'])
  }
};
</script>
