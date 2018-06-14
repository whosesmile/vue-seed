<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="选项卡 (参考有赞)" />
    </ex-header>
    <ex-content>
      <ex-tabview>
        <ex-tab v-for="(item, idx) in labels(3)" :key="idx" :title="item">
          {{item}}
        </ex-tab>
      </ex-tabview>

      <div class="divider" ui-mode="25%">超过四个标签滚动</div>

      <ex-tabview>
        <ex-tab v-for="(item, idx) in labels(10)" :key="idx" :title="item">
          {{item}}
        </ex-tab>
      </ex-tabview>

      <div class="divider" ui-mode="25%">添加点击行为</div>

      <ex-tabview @click="tipsToast">
        <ex-tab v-for="(item, idx) in labels(3)" :key="idx" :title="item">
          {{item}}
        </ex-tab>
      </ex-tabview>

      <div class="divider" ui-mode="25%">双向绑定:v-model</div>

      <ex-tabview v-model="index">
        <ex-tab v-for="(item, idx) in labels(4)" :key="idx" :title="item">
          当前TAB为: {{index}}
        </ex-tab>
      </ex-tabview>
    </ex-content>
  </ex-view>
</template>
<script>
export default {
  data() {
    return { index: 3 };
  },
  methods: {
    labels(n) {
      let list = [];
      for (let i = 0; i < n; i++) {
        list.push('标签' + (i + 1));
      }
      return list;
    },
    tipsToast(index) {
      this.$store.dispatch({
        type: 'tipsToast',
        toast: {
          message: `你点击了第${index}个标签`
        }
      });
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
