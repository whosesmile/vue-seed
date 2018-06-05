<template>
  <div class="carousel" :class="$style.style">
    <div class="roller" ref="roller" :style="style">
      <div class="slider" v-for="(item, idx) in list" :key="idx" :style="{transform: `translate3d(${idx * 100}%, 0px, 0px)`}" @click="onClick(idx)">
        <div class="frame"><img :src="source(item)" /></div>
      </div>
    </div>
    <ul class="decorators" v-if="decorators">
      <li class="item" v-for="(item, idx) in list" :key="idx" :class="{active: idx == index}" @click="slide.go(idx)" />
    </ul>
  </div>
</template>
<script>
import Env from '../utils/env';
import Emitter from '../utils/emitter';
class Slide extends Emitter {
  constructor(params) {
    super();
    this.index = 0;
    this.TIMER = 4000;
    this.roller = params.roller;
    this.autoplay = params.autoplay;
    this.width = this.roller.offsetWidth;
    this.frames = params.roller.children;
    if (this.autoplay) {
      this.timer = setInterval(this.timerTask, this.TIMER);
    }

    // 添加事件
    this.roller.addEventListener('touchstart', this.touchstart, Env.supportPassive ? { passive: false } : false);
    this.roller.addEventListener('touchmove', this.touchmove, Env.supportPassive ? { passive: false } : false);
    this.roller.addEventListener('touchend', this.touchend, Env.supportPassive ? { passive: false } : false);
  }

  // 释放绑定
  release() {
    clearInterval(this.timer);
    this.roller.removeEventListener('touchstart', this.touchstart, Env.supportPassive ? { passive: false } : false);
    this.roller.removeEventListener('touchmove', this.touchmove, Env.supportPassive ? { passive: false } : false);
    this.roller.removeEventListener('touchend', this.touchend, Env.supportPassive ? { passive: false } : false);
  }

  // 抛出事件
  animate(offset, transition = '300ms') {
    const transform = `translate3d(${offset}%, 0px, 0px)`;
    this.emit('next', { index: this.index, transform, transition });
  }

  // 自动播放
  timerTask = () => {
    this.index += 1;
    if (this.index >= this.frames.length) {
      this.index = 0;
    }
    this.animate(-this.index * 100);
  };

  // 拖拽开始
  touchstart = e => {
    // 暂停轮播
    clearInterval(this.timer);
    this.x1 = e.touches[0].pageX;
    this.x2 = e.touches[0].pageX;
  };

  // 拖拽过程
  touchmove = e => {
    e.preventDefault();
    this.x2 = e.touches[0].pageX;
    this.animate((this.x2 - this.x1) / this.width * 100 - this.index * 100, 0);
  };

  // 拖拽结束
  touchend = e => {
    let direction = this.x1 - this.x2 > 0 ? 1 : -1;
    let threshold = Math.abs(this.x1 - this.x2) > this.width / 5;

    if (threshold) {
      this.index = this.index + direction;
      if (this.index < 0) {
        this.index = 0;
      } else if (this.index >= this.frames.length) {
        this.index = this.frames.length - 1;
      }
    }
    this.animate(-this.index * 100);
    // 重启轮播
    if (this.autoplay) {
      this.timer = setInterval(this.timerTask, this.TIMER);
    }
  };

  // 定位跳转
  go(index) {
    this.index = index;
    this.animate(-this.index * 100);

    // 重新计时
    clearTimeout(this.timer);
    if (this.autoplay) {
      this.timer = setInterval(this.timerTask, this.TIMER);
    }
  }
}

export default {
  props: {
    list: { type: Array, default: () => [] },
    autoplay: { type: Boolean, default: true },
    decorators: { type: Boolean, default: true }
  },
  data() {
    return {
      index: 0,
      style: { transform: 'translate3d(0%, 0px, 0px)', transition: '0ms' }
    };
  },
  mounted() {
    if (this.list.length > 1) {
      this.start();
    }
  },
  destoryed() {
    if (this.slide) {
      this.slide.release();
    }
  },
  methods: {
    start() {
      this.slide = new Slide({
        autoplay: this.autoplay,
        roller: this.$refs.roller
      }).on('next', e => {
        this.index = e.index;
        this.style = { transform: e.transform, transition: e.transition };
      });
    },
    source(item) {
      return typeof item === 'string' ? item : item.src;
    },
    onClick(index) {
      const item = this.list[index];
      if (item.onClick) {
        item.onClick(item, index);
      }
    }
  }
};
</script>
<style lang="less" module>
:local(.style) {
  position: relative;
  overflow: hidden;
  background-color: #f2f2f2;
  .roller {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .slider {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .frame {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        img {
          flex: 1;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .decorators {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    font-size: 0;
    text-align: center;
    line-height: normal;
    .item {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 3px;
      border-radius: 100%;
      background-color: #d8d8d8;
      transition-property: background-color;
      transition-duration: 0.3s;
      &.active {
        background-color: #a1a1a1;
      }
    }
  }
}
</style>
