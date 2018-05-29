<template>
  <ex-view :class="$style.style">
    <ex-header class="bar">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="设置" />
    </ex-header>
    <ex-content>
      <div class="list compact">
        <div class="item-divider">列表注解</div>
        <div class="item tapable" @click="$router.back()" v-for="(item, idx) in list" :key="idx">
          <div class="text">返回首页</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
      </div>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    const list = [1, 2];
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

