<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="延迟图片" />
    </ex-header>
    <ex-content>
      <ex-loader url="/api/example/list" :callback="callback">
        <div class="list compact overlap">
          <div class="item" v-for="(item, idx) in list" :key="idx" ui-mode="15px">
            <div class="avatar">
              <ex-image width="46" height="46" :src="item.image" />
            </div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </ex-loader>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    callback({ list }) {
      this.list = list;
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
