<template>
  <div id="app">
    <router-view></router-view>
    <ex-widgets>
      <ex-toast v-bind="toast" />
    </ex-widgets>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['toast', 'modal'])
  }
};
</script>
