<template>
  <ex-view :class="$style.style">
    <ex-header class="bar">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="我的" />
    </ex-header>
    <ex-content>
      <div class="list">
        <router-link class="item" to="/account/orders">
          <div class="avatar">
            <img width="16" src="//img1.qdingnet.com/899826a5bde2edb56611b67b0ba7c7ae.png" />
          </div>
          <span class="text">我的订单</span>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <router-link class="item" to="/account/addresses">
          <div class="avatar">
            <img width="16" src="//img1.qdingnet.com/41a2bbb947f173727de845f70f7c36ab.png" />
          </div>
          <span class="text">收货地址</span>
          <span class="extra">404演示</span>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <router-link class="item" to="/account/cart">
          <div class="avatar">
            <img width="16" src="//img1.qdingnet.com/f15e58120c2c48a10ea98680ec7eb1b5.png" />
          </div>
          <span class="text">购物车</span>
          <span class="extra">404演示</span>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
      </div>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return { list };
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
