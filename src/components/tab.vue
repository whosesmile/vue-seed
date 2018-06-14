<template>
  <div :class="$style.style" v-if="active">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true }
  },
  computed: {
    active: function() {
      return this.index === this.$parent.tabIndex;
    }
  },
  created() {
    this.index = this.$parent.append(this.title);
  },
  destroyed() {
    this.$parent.remove(this.index);
  }
};
</script>
<style lang="less" module>
:local(.style) {
  padding: 15px;
  background: #fff;
}
</style>

