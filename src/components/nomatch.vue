<template>
  <ex-view :class="$style.style">
    <ex-header>
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="页面未找到" />
    </ex-header>
    <ex-content>
      <div class="feedback">
        <div class="mark">
          <img width="197" height="98" src="//img1.qdingnet.com/a93623660fa443e00a6a2fbbf3578635.png" alt="空白" />
        </div>
        <h3 class="title">Oops!</h3>
        <div class="describe">服务器走进了黑森林，没有找到出口...</div>
      </div>
      <div class="vspace hspace">
        <a class="button default" @click="reload()">重新加载</a>
      </div>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  methods: {
    reload() {
      location.reload();
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

