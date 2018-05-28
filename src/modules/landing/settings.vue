<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>设置</b></h1>
    </header>
    <div class="content">
      <div class="list compact">
        <div class="item-divider">列表注解</div>
        <div class="item tapable" @click="$router.back()" v-for="(item, idx) in list" :key="idx">
          <div class="text">返回首页</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
      </div>
    </div>
  </div>
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

