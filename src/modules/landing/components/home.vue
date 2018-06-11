<template>
  <div :class="$style.style" v-if="list.length">
    <div class="banner">
      <ex-swipe style="padding-top: 50%;" :list="images"/>
    </div>

    <div class="list" v-for="item in [0,1,2,3,4,5,6,7,8,9]" :key="item">
      <div class="item">
        <div class="text">SHA256/Bitcoin Miners</div>
        <router-link class="text-sm link" :to="`/product/category/${123}`">More</router-link>
      </div>
      <router-link class="item" v-for="(item, idx) in list" :key="idx" :to="`/product/details/${item.id}`">
        <div class="avatar">
          <ex-image width="120" height="95" src="//img1.qdingnet.com/ee328e05e71d2cd17797526c514a79c5.png" />
        </div>
        <div class="text">
          <h4>{{item.name}}</h4>
          <div class="brief" ui-mode="2">Shipping within 10 working days after full payment. Shipping within 10 working days after full payment.</div>
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
    let images = [{ src: '//img1.qdingnet.com/3a906e27d91567e606db5a5582805ff2.png' }, { src: '//img1.qdingnet.com/9c343e9562b683b825e9bdec584c174e.png' }, { src: '//img1.qdingnet.com/46151c02ffd04eef688470a435a4b427.png' }];
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
