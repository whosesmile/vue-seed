<template>
  <h1 class="title">
    <b v-if="title">{{title}}</b>
    <slot></slot>
  </h1>
</template>
<script>
export default {
  props: {
    title: { type: String }
  },
  mounted() {
    if (this.title) {
      document.title = this.title;
    }
  },
  watch: {
    title: function(title) {
      document.title = title;
    }
  }
};
</script>
