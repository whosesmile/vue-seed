<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="Bitcoin Miners" />
    </ex-header>
    <ex-content>
      <ex-loader url="/api/example/list" :list="list" :query="query" :callback="callback">
        <div class="list compact overlap">
          <router-link class="item" v-for="(item, idx) in list" :key="idx" :to="`/product/details/${item.id}`">
            <div class="avatar">
              <ex-image width="120" height="95" src="//img1.qdingnet.com/a3afb7ca236e6cc072ab19bfbfa8d6cf.png" />
            </div>
            <div class="text">
              <h4>{{item.name}}</h4>
              <div class="brief" ui-mode="2">Shipping within 10 working days after full payment.</div>
              <div class="price text-primary">${{item.price}}</div>
            </div>
          </router-link>
        </div>
      </ex-loader>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    return {
      query: { id: this.$route.params.id }
    };
  },
  computed: {
    // PS:如果不想用Vuex，可以直接声明给当前state
    list: function() {
      return this.$store.state.product.category.list;
    }
  },
  methods: {
    callback({ list }) {
      // PS:如果不想用Vuex，可以直接赋值给当前state
      this.$store.dispatch('product/category/listItems', { type: 'listItems', list: list });
    }
  }
};
</script>
<style lang="less" module>
:local(.style) {
  .demo {
    color: #f00;
  }
}
</style>
