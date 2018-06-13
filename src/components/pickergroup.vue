<template>
  <div ref="panel" class="group" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="roller" :style="style">
      <div class="item" :class="{disabled:item.disabled}" v-for="(item, idx) in items" :key="idx">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    adjust: { type: Boolean },
    items: { type: Array, required: true },
    index: { type: Number, default: -1 },
    height: { type: Number, default: 238 },
    itemHeight: { type: Number, default: 34 },
    animation: { type: Boolean, default: true }
  },

  data() {
    return {
      touchId: null,
      touching: false,
      stpoint: 0,
      sttrans: 0,
      translate: 0,
      indexImpl: this.index,
      animating: this.animation
    };
  },
  computed: {
    style: function() {
      return {
        transform: `translate3d(0,${this.translate}px,0)`,
        transition: this.animating ? 'transform .3s, -webkit-transform .3s' : 'none'
      };
    },
    volume: function() {
      return this.height / this.itemHeight;
    }
  },
  watch: {
    index(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.indexImpl = newVal;
      }
    },
    items(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.adjustOffset();
      }
    }
  },
  mounted() {
    this.adjustOffset(true);
  },
  methods: {
    label(item) {
      return item.name;
    },
    change(e = {}) {
      e.index = this.indexImpl;
      this.$emit('change', e);
    },
    // 自动调整定位偏移
    adjustOffset(propagate = false) {
      if (this.items.length === 0) {
        return;
      }
      // 防止溢出
      if (this.indexImpl > this.items.length - 1) {
        this.indexImpl = this.items.length - 1;
        propagate = true;
      }
      // 最接近的值
      if (this.indexImpl < 0) {
        this.indexImpl = 0;
        propagate = true;
      }

      // 自动调整禁用元素
      let backup = this.indexImpl;
      this.indexImpl = this.adjustDisabled(this.indexImpl);
      if (this.indexImpl !== backup) {
        propagate = true;
      }

      // 找到中位数
      let median = (this.volume - 1) / 2;

      this.stpoint = 0;
      this.sttrans = 0;
      this.touchId = null;
      this.touching = false;
      this.animating = true;
      this.translate = (median - this.indexImpl) * this.itemHeight;
      if (propagate) {
        this.change();
      }
    },
    // 如果被禁用 自动调整索引
    adjustDisabled(indexImpl) {
      if (!this.adjust) {
        return indexImpl;
      }
      let count = this.items.length;
      if (indexImpl < 0) {
        indexImpl = 0;
      }
      if (indexImpl >= count) {
        indexImpl = count - 1;
      }

      // 记录初始位置
      let start = indexImpl;
      if (this.items[indexImpl].disabled === true) {
        while (this.items[indexImpl].disabled === true) {
          indexImpl += 1;

          // 找到底部
          if (indexImpl >= count) {
            indexImpl = 0;
          }

          // 防止死循环
          if (indexImpl === start) {
            indexImpl = start;
            break;
          }
        }
      }

      return indexImpl;
    },
    touchstart(e) {
      if (this.touching || this.items.length <= 1) {
        return;
      }
      this.touching = true;
      this.animating = false;
      this.sttrans = this.translate;
      this.stpoint = e.targetTouches[0].pageY;
      this.touchId = e.targetTouches[0].identifier;
    },
    touchmove(e) {
      e.preventDefault();
      if (!this.touching || this.items.length <= 1) {
        return;
      }
      if (e.targetTouches[0].identifier !== this.touchId) {
        return;
      }
      this.translate = this.sttrans + (e.targetTouches[0].pageY - this.stpoint);
    },
    touchend(e) {
      if (!this.touching || this.items.length <= 1) {
        return;
      }

      // 计算位置
      let median = (this.volume - 1) / 2;
      let count = this.items.length;
      let translate = this.translate;
      let itemHeight = this.itemHeight;

      // 超过上限
      if (translate > median * itemHeight) {
        translate = median * itemHeight;
      } else if (translate < (-count + median + 1) * itemHeight) {
        // 超过下限
        translate = (-count + median + 1) * itemHeight;
      } else if (translate % itemHeight !== 0) {
        // 校准位置
        let reminder = translate % itemHeight;
        if (Math.abs(reminder) > itemHeight / 2) {
          translate += reminder > 0 ? itemHeight - reminder : -itemHeight - reminder;
        } else {
          translate -= reminder;
        }
      }

      // 备份初始值
      let backup = this.indexImpl;

      // 尝试自动调整 (disabled)
      let indexImpl = this.adjustDisabled(median - translate / itemHeight);
      translate = (median - indexImpl) * itemHeight;

      this.touching = false;
      this.animating = true;
      this.sttrans = 0;
      this.stpoint = 0;
      this.touchId = null;
      this.indexImpl = indexImpl;
      this.translate = translate;

      if (backup !== indexImpl) {
        this.change(e);
      }
    }
  }
};
</script>
