<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>首页</b></h1>
    </header>
    <div class="content">
      <template v-if="list.length">
        <div class="list compact overlap">
          <div class="item-divider">Vuex异步加载</div>
          <div class="item" v-for="(item, idx) in list" :key="idx">
            {{idx + 1}}: {{item.name}}
          </div>
          <div class="item-divider">Vuex同步示范</div>
          <div class="item">
            <div class="text">
              <button class="button plain-driving" @click="add({count:2})">Vuex缓存数据:{{count}}, {{double}}</button>
            </div>
          </div>
          <div class="item-divider">跳转演示</div>
          <router-link class="item tapable" to="/">
            <div class="text">重复首页</div>
            <div class="extra">不会触发</div>
            <i class="icon text-gray">&#xe61a;</i>
          </router-link>
          <router-link class="item tapable" to="/account">
            <div class="text">个人中心</div>
            <i class="icon text-gray">&#xe61a;</i>
          </router-link>
          <router-link class="item tapable" to="/account/orders">
            <div class="text">我的订单</div>
            <i class="icon text-gray">&#xe61a;</i>
          </router-link>
          <router-link class="item tapable" to="/settings">
            <div class="text">通用设置</div>
            <i class="icon text-gray">&#xe61a;</i>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers("landing/home");
export default {
  computed: {
    ...mapState(["count", "list"]),
    ...mapGetters(["double"])
  },
  methods: {
    ...mapActions(["listItems"]),
    ...mapMutations(["add"])
  },
  mounted() {
    this.listItems();
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
