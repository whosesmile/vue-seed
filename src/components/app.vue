<template>
  <div id="app">
    <router-view></router-view>
    <widgets>
      <toast v-bind="toast" />
    </widgets>
  </div>
</template>

<script>
import toast from './toast';
import widgets from './widgets';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      message: 'Hello world!'
    };
  },
  components: {
    toast,
    widgets
  },
  computed: {
    ...mapState(['toast', 'modal'])
  }
};
</script>
