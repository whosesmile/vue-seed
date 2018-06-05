<template>
  <div :class="$style.style">
    <div class="list">
      <div class="item-divider">组件演示</div>
      <router-link class="item" to="/example">
        <div class="text">组件演示</div>
        <i class="icon text-gray">&#xe61a;</i>
      </router-link>
      <div class="item-divider">分割载入</div>
      <router-link class="item" to="/account">
        <div class="text">个人中心</div>
        <i class="icon text-gray">&#xe61a;</i>
      </router-link>
      <router-link class="item" to="/account/orders">
        <div class="text">我的订单</div>
        <i class="icon text-gray">&#xe61a;</i>
      </router-link>
      <router-link class="item" to="/account/addresses">
        <div class="text">404异常</div>
        <i class="icon text-gray">&#xe61a;</i>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" module>
:local(.style) {
  .demo {
    color: #f00;
  }
}
</style>
