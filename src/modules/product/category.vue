<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title :title="title" />
    </ex-header>
    <ex-content>
      <div class="list compact overlap">
        <router-link class="item" v-for="(item, idx) in items" :key="idx" :to="`/product/details/${item.id}`">
          <div class="avatar">
            <img width="120" height="95" :src="item.img" />
          </div>
          <div class="text">
            <h4>{{item.name}}</h4>
            <div class="brief" ui-mode="2">{{item.description}}</div>
            <div class="price text-primary">${{item.price}}</div>
          </div>
        </router-link>
      </div>
    </ex-content>
  </ex-view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('product/category');
export default {
  data() {
    return {
      title: this.$route.query.type
    };
  },
  computed: {
    ...mapState(['list']),
    items() {
      const list = this.list.find(item => item.text === this.title);
      return list ? list.subList : [];
    }
  },
  mounted() {
    this.listItems();
  },
  methods: {
    ...mapActions(['listItems'])
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
