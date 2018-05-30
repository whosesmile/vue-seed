<template>
  <ex-view :class="$style.style">
    <ex-header>
      <ex-title title="BITMAIN" />
    </ex-header>
    <ex-content>
      <div class="list" v-if="list.length">
        <div class="item-divider">组件演示</div>
        <div class="item" @click="showToast()">
          <div class="text">默认吐司</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item" @click="showToast(true)">
          <div class="text">模态吐司</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item" @click="showModal()">
          <div class="text">打开弹窗</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>

        <div class="item-divider">Vuex异步加载</div>
        <div class="item" v-for="(item, idx) in list" :key="idx">
          {{idx + 1}}: {{item.name}}
        </div>
        <div class="item-divider">Vuex同步示范</div>
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
    },

    showToast: function(modal = false) {
      this.$store.dispatch({
        type: 'showToast',
        toast: {
          icon: 'warning',
          modal: modal,
          message: modal ? '模态吐司' : '你好世界'
        }
      });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.dispatch('hideToast');
      }, 3000);
    },

    showModal: function() {
      this.$store.dispatch({
        type: 'showModal',
        modal: {
          title: '温馨提示',
          message: '六千年和一瞬间',
          dismiss: () => {
            this.$store.dispatch('hideModal');
          },
          buttons: [
            {
              text: '取消',
              click: () => {
                this.$store.dispatch('hideModal');
              }
            },
            {
              text: '确定',
              click: () => {
                this.$store.dispatch('hideModal');
              }
            }
          ]
        }
      });
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
