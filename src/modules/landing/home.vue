<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>首页</b></h1>
    </header>
    <div class="content">
      <div class="list compact overlap">
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

      <div class="list">
        <div class="item" v-for="(item, idx) in list" :key="idx">{{item.name}}</div>
      </div>

      <div class="hspace vspace">
        <button class="button success" @click="add(2)">Vuex缓存数据:{{count}}, {{double}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  "landing/home"
);
export default {
  data() {
    return { list: [] };
  },

  mounted() {
    axios.get("/landing/ajax/home", ({ list }) => {
      this.list = list;
    });
  },

  computed: {
    ...mapState(["count"]),
    ...mapGetters(["double"])
  },

  methods: {
    ...mapActions(["add"])
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
