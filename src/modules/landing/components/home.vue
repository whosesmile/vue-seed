<template>
  <div :class="$style.style" v-if="list.length">
    <div class="banner">
      <ex-swipe style="padding-top: 50%;" :list="images"/>
    </div>

    <div class="list">
      <div class="item">
        <div class="text">SHA256/Bitcoin Miners</div>
        <router-link class="icon" :to="`/shopping/category/${123}`">
          <img width="24" src="//img1.qdingnet.com/efe549ac40a1bb2986693fd2047a2c41.png" />
        </router-link>
      </div>
      <router-link class="item" v-for="(item, idx) in list" :key="idx" :to="`/shopping/details/${item.id}`">
        <div class="avatar">
          <img width="110" height="110" src="//img1.qdingnet.com/d8bc9316e6c081c12692f7d967889e7e.gif" />
        </div>
        <div class="text">
          <h4>{{item.name}}</h4>
          <div class="brief">Shipping: 20-30 June No shipping to HongKong,Macau and Taiwan.</div>
          <div class="price text-primary">${{item.price}}</div>
        </div>
      </router-link>
    </div>

    <div class="list">
      <div class="item">
        <div class="text">Scypt/Litecoin Miners</div>
        <router-link class="icon" :to="`/shopping/category/${456}`">
          <img width="24" src="//img1.qdingnet.com/efe549ac40a1bb2986693fd2047a2c41.png" />
        </router-link>
      </div>
      <router-link class="item" v-for="(item, idx) in list" :key="idx" :to="`/shopping/details/${item.id}`">
        <div class="avatar">
          <img width="110" height="110" src="//img1.qdingnet.com/d8bc9316e6c081c12692f7d967889e7e.gif" />
        </div>
        <div class="text">
          <h4>{{item.name}}</h4>
          <div class="brief">Shipping: 20-30 June No shipping to HongKong,Macau and Taiwan.</div>
          <div class="price text-primary">${{item.price}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('landing/home');
export default {
  data() {
    let images = [];
    for (let i = 0; i < 5; i++) {
      images[i] = {
        src: '//img1.qdingnet.com/c2ed9d5c382fcea698613cc0234c88c9.png',
        onClick() {
          console.log('你点击了图片:', i);
        }
      };
    }
    return { images };
  },
  computed: {
    ...mapState(['list'])
  },
  methods: {
    ...mapActions(['listItems']),
    tipsToast: function(message, modal = false) {
      this.$store.dispatch({
        type: 'tipsToast',
        toast: {
          icon: 'warning',
          modal: modal,
          message: message
        }
      });
    }
  },
  mounted() {
    this.listItems();
  }
};
</script>

<style lang="less" module>
:local(.style) {
  .price {
    margin-top: 5px;
  }
  .list .icon img {
    display: block;
  }
}
</style>
