<template>
  <div class="tabbar">
    <a class="item" :class="{active: tab === 0}" @click="active(0)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">{{$t('home')}}</span>
    </a>
    <a class="item" :class="{active: tab === 1}" @click="active(1)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">{{$t('category')}}</span>
    </a>
    <a class="item" :class="{active: tab === 2}" @click="active(2)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">{{$t('cart')}}</span>
    </a>
    <a class="item" :class="{active: tab === 3}" @click="active(3)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">{{$t('usercenter')}}</span>
    </a>
  </div>
</template>
<script>
export default {
  i18n: {
    messages: {
      en: { home: 'Home', category: 'Category', cart: 'Cart', usercenter: 'UserCenter' },
      zh: { home: '首页', category: '分类', cart: '购物车', usercenter: '我的' }
    }
  },
  props: {
    index: { type: Number, default: 0 },
    force: { type: Boolean, default: false }
  },
  data() {
    return { tab: this.index };
  },
  methods: {
    active(index) {
      if (this.force || this.tab !== index) {
        this.tab = index;
        this.$emit('click', index);
      }
    }
  }
};
</script>

