<template>
  <div class="view">
    <header class="bar">
      <a class="menu text-gray" @click="back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>一蓑烟雨任平生</b></h1>
    </header>
    <div class="list compact">
      <div class="item-divider">列表注解</div>
      <div class="item tapable" @click="back()" v-for="(item, idx) in list" :key="idx">
        <div class="text">返回首页</div>
        <i class="icon text-gray">&#xe61a;</i>
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
<style lang="less" scoped>
</style>
