<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>首页</b></h1>
    </header>
    <div class="content">
      <div class="list compact">
        <div class="item-divider">列表注解</div>
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
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    back: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
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
