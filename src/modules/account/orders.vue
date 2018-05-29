<template>
  <ex-view :class="$style.style">
    <ex-header class="bar">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="订单" />
    </ex-header>
    <ex-content>
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
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    const list = [1, 2, 3, 4, 5];
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

