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
      </template>
    </ex-content>
  </ex-view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('product/details');
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['product'])
  },
  methods: {
    ...mapActions(['getProduct'])
  },
  mounted() {
    this.getProduct({ productId: this.$route.params.id });
  }
};
</script>
<style lang="less" module>
:local(.style) {
  .banner.autofix {
    background-color: #fff;
    & > img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .demo {
    color: #f00;
  }
}
</style>
