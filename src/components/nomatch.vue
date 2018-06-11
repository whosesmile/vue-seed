<template>
  <ex-view :class="$style.style">
    <ex-header>
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="NOT FOUND" />
    </ex-header>
    <ex-content>
      <div class="feedback">
        <div class="mark">
          <img width="197" height="98" src="//img1.qdingnet.com/a93623660fa443e00a6a2fbbf3578635.png" alt="空白" />
        </div>
        <h3 class="title">Oops!</h3>
        <div class="describe">HMMM, SOMETHING IS NOT RIGHT?</div>
      </div>
      <div class="vspace hspace">
        <a class="button plain-primary" @click="$router.back()">RETURN</a>
        <a class="button default" @click="reload()">RELOAD</a>
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

