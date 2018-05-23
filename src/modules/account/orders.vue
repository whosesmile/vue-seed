<template>
  <div class="view" :class="$style.style">
    <header class="bar">
      <a class="menu text-gray" @click="back()">
        <i class="icon">&#xe60e;</i>
      </a>
      <h1 class="title"><b>订单</b></h1>
    </header>

    <section class="content">
      <div class="list" v-for="(item, idx) in list" :key="idx">
        <a class="item" href="javascript:;">
          <div class="text text-sm">天猫国际</div>
          <div class="extra text-sm">待支付</div>
        </a>
        <a class="item" ui-mode="15px" href="javascript:;">
          <div class="avatar">
            <img width="60" src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==">
          </div>
          <div class="text">
            <h4>北疆饭店</h4>
            <div class="brief">菜式很齐全，味道也不错，环境很温馨，并且不用排队，完美。</div>
          </div>
        </a>
        <div class="item">
          <div class="text text-sm">人均:<span class="text-driving">￥88.0</span></div>
          <div class="extra">
            <div class="button-group">
              <a class="button plain-success sm" href="javascript:;">立即支付</a>
              <a class="button default sm" href="javascript:;">查看详情</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [1, 2, 3, 4]
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

