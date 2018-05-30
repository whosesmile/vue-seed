<template>
  <section ref="element" class="content" :style="style">
    <slot></slot>
  </section>
</template>
<script>
import { siblings } from '../utils/dom';
export default {
  data() {
    return {
      style: { marginTop: 0, marginBottom: 0 }
    };
  },
  methods: {
    // HEADER FOOTER 间距处理
    adjustMargin() {
      const container = this.$refs.element.parentNode;
      const header = container.querySelector('header.bar.top-fixed');
      const footer = container.querySelector('footer.bar.btm-fixed');
      if (header && header.parentNode === container) {
        this.style.marginTop = '44px';
      } else {
        this.style.marginTop = '0px';
      }
      if (footer && footer.parentNode === container) {
        this.style.marginBottom = '50px';
      } else {
        this.style.marginBottom = '0px';
      }
    }
  },
  mounted() {
    this.adjustMargin();
  },
  // 防止动态增删顶部和底部的Bar
  updated() {
    this.adjustMargin();
  }
};
</script>
