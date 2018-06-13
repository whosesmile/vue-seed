<template>
  <h1 class="title">
    <b v-if="title" v-html="slogan"></b>
    <slot></slot>
  </h1>
</template>
<script>
export default {
  props: {
    title: { type: String }
  },
  computed: {
    slogan() {
      if (this.title === 'BITMAIN') {
        return '<img width="100" src="//img1.qdingnet.com/4880a7869699859b831775236ca879dd.svg" />';
      }
      return this.title;
    }
  },
  watch: {
    title: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        document.title = this.title;
      }
    }
  },
  mounted() {
    if (this.title) {
      document.title = this.title;
    }
  }
};
</script>
