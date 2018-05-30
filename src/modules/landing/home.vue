<template>
  <ex-view :class="$style.style">
    <ex-header>
      <ex-title title="BITMAIN" />
    </ex-header>
    <ex-content>
      <div class="list" v-if="list.length">
        <div class="item-divider">组件演示</div>
        <router-link class="item" to="/example">
          <div class="text">组件演示</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <div class="item-divider">异步演示</div>
        <div class="item" v-for="(item, idx) in list" :key="idx">
          {{idx + 1}}: {{item.name}}
        </div>
        <div class="item-divider">全局缓存</div>
        <div class="item">
          <div class="text">
            <button class="button plain-primary" @click="add({count:2})">{{count}} x 2 = {{double}} @Vuex缓存数据</button>
          </div>
        </div>

        <div class="item-divider">跳转演示</div>
        <router-link class="item" to="/account">
          <div class="text">个人中心</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <router-link class="item" to="/account/orders">
          <div class="text">我的订单</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <router-link class="item" to="/settings">
          <div class="text">通用设置</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
      </div>
    </ex-content>
    <ex-footer class="btm-fixed">
      <ex-tabbar @click="tabActived" />
    </ex-footer>
  </ex-view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations, mapGetters } = createNamespacedHelpers('landing/home');
export default {
  computed: {
    ...mapState(['count', 'list']),
    ...mapGetters(['double'])
  },
  methods: {
    ...mapActions(['listItems']),
    ...mapMutations(['add']),

    // Tab点击回调
    tabActived(index) {
      console.log(`你激活了TabIndex: ${index}`);
    }
  },
  mounted() {
    this.listItems();
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
