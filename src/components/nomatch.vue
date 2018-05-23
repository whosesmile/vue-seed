<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>页面未找到</b></h1>
    </header>
    <div class="section">
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
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    reload: function() {
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
