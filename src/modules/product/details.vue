<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title :title="product.name" />
    </ex-header>
    <ex-content>
      <template v-if="product.productId">
        <div class="banner autofix" style="padding-top: 50%">
          <img :src="product.img" />
        </div>
        <div class="summary">
          <h3 class="name">{{product.name}}</h3>
          <div class="description text-sm text-darkgray">{{product.description}}</div>
          <div class="price text-primary text-strong text-xl">{{product.price|currency}}</div>
          <div class="weight text-xs text-gray">{{$t('weight')}}: {{product.weight}} kg</div>
        </div>
      </template>
    </ex-content>
    <ex-footer class="btm-fixed">
      <div class="cell">
        <img width="24" height="24" src="//img1.qdingnet.com/705aed821745754bc94eab423f40fb4c.png" />
      </div>
      <div class="button-group compact">
        <button class="button primary square">Add To Cart</button>
      </div>
    </ex-footer>
  </ex-view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('product/details');
export default {
  i18n: {
    messages: {
      en: { weight: 'Weight' },
      zh: { weight: '重量' }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['product'])
  },
  mounted() {
    this.getProduct({ productId: this.$route.params.id });
  },
  methods: {
    ...mapActions(['getProduct'])
  }
};
</script>
<style lang="less" module>
:local(.style) {
  .banner.autofix {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    & > img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .summary {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding: 15px;
    .name {
      font-weight: 500;
      font-size: 16px;
    }
    .price {
      margin: 3px 0 8px;
    }
  }
}
</style>
