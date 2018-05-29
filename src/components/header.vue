<template>
  <header class="bar" v-if="!nested">
    <slot></slot>
  </header>
</template>
<script>
export default {
  computed: {
    nested: function() {
      return false;
    }
  }
};
</script>
