<template>
  <div class="tabview" :class="$style.style">
    <div class="wrap">
      <div ref="tabs" class="navbar underline primary" :class="{scroll}">
        <div class="item" :class="{active: tabIndex === idx}" v-for="(tab, idx) in tabs" :key="idx" @click="setIndex(idx)">{{tab}}</div>
      </div>
    </div>
    <div class="panes">
      <slot />
    </div>
  </div>
</template>
<script>
import { raf } from '../utils/raf';
export default {
  props: {
    index: { type: Number, default: 0 },
    duration: { type: Number, default: 300 }
  },
  data() {
    return {
      tabs: [],
      tabIndex: -1
    };
  },
  computed: {
    scroll: function() {
      return this.tabs.length > 4;
    }
  },
  mounted() {
    this.tabIndex = this.index;
  },
  methods: {
    append(tab) {
      this.tabs.push(tab);
      return this.tabs.length - 1;
    },
    remove(index) {
      this.tabs.splice(index, 1);
    },
    setIndex(index) {
      this.tabIndex = index;
      this.animate();
      this.$emit('click', index, this.tabs[index]);
    },
    animate() {
      // 标签滚动
      if (this.scroll && this.$refs.tabs) {
        const tabs = this.$refs.tabs;
        const list = Array.from(tabs.querySelectorAll('.item'));
        const item = list[this.tabIndex];
        const { scrollLeft, offsetWidth: tabsWidth } = tabs;
        const { offsetLeft, offsetWidth: itemWidth } = item;
        this.scrollX(tabs, scrollLeft, offsetLeft - (tabsWidth - itemWidth) / 2);
      }
    },
    scrollX(el, from, to) {
      let count = 0;
      const frames = Math.round(this.duration / 25);
      const animate = () => {
        el.scrollLeft += (to - from) / frames;
        count += 1;
        if (frames > count) {
          raf(animate);
        }
      };
      animate();
    }
  }
};
</script>
<style lang="less" module>
@import '../less/fn.less';
:local(.style) {
  position: relative;
  .hairline(0, 0, 1px, 0);
  .wrap {
    position: relative;
    .hairline(1px, 0);
    .navbar {
      transform: none;
      &:before,
      &:after {
        content: none;
      }
    }
  }
  .scroll {
    overflow: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      flex: 0 0 22%;
    }
  }
}
</style>
