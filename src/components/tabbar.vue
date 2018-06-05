<template>
  <div class="tabbar">
    <a class="item" :class="{active: tab === 0}" @click="active(0)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">Home</span>
    </a>
    <a class="item" :class="{active: tab === 1}" @click="active(1)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">Category</span>
    </a>
    <a class="item" :class="{active: tab === 2}" @click="active(2)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">Cart</span>
    </a>
    <a class="item" :class="{active: tab === 3}" @click="active(3)">
      <img class="icon" src="//img1.qdingnet.com/881f0984ac67e76d62543052f2e3088d.png" />
      <span class="label">Usercenter</span>
    </a>
  </div>
</template>
<script>
export default {
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

