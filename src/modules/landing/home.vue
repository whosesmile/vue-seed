<template>
  <ex-view :class="$style.style">
    <ex-header class="top-fixed">
      <ex-menu @click="tipsToast('TODO')">
        <img width="24" src="//img1.qdingnet.com/bc5f3936ea2d93be4c9de70f9f246fac.png" />
      </ex-menu>
      <ex-title :title="title" />
    </ex-header>
    <ex-content>
      <div class="panes">
        <transition :name="animate">
          <div class="pane" key="home" v-if="index===0">
            <ex-landing-home />
          </div>
          <div class="pane" key="category" v-else-if="index===1">
            <ex-landing-category />
          </div>
          <div class="pane" key="cart" v-else-if="index===2">
            <ex-landing-cart />
          </div>
          <div class="pane" key="usercenter" v-else-if="index===3">
            <ex-landing-usercenter />
          </div>
        </transition>
      </div>
    </ex-content>
    <ex-footer class="btm-fixed">
      <ex-tabbar :index="index" @click="tabActived" />
    </ex-footer>
  </ex-view>
</template>
<script>
import Home from './components/home';
import Category from './components/category';
import Cart from './components/cart';
import UserCenter from './components/usercenter';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('landing/home');
export default {
  data() {
    return {
      animate: 'ex-move-ltr'
    };
  },
  components: {
    'ex-landing-home': Home,
    'ex-landing-category': Category,
    'ex-landing-cart': Cart,
    'ex-landing-usercenter': UserCenter
  },
  computed: {
    ...mapState(['index']),
    title: function() {
      switch (this.index) {
        case 0:
          return 'BITMAIN';
        case 1:
          return 'Category';
        case 2:
          return 'Cart';
        case 3:
          return 'Usercenter';
      }
    }
  },
  methods: {
    ...mapActions(['setIndex']),
    tabActived(index) {
      if (index >= this.index) {
        this.animate = 'ex-move-ltr';
        this.setIndex({ index });
      } else {
        this.animate = 'ex-move-rtl';
        this.setIndex({ index });
      }
    },
    tipsToast: function(message, modal = false) {
      this.$store.dispatch({
        type: 'tipsToast',
        toast: {
          icon: 'warning',
          modal: modal,
          message: message
        }
      });
    }
  }
};
</script>
<style lang="less" module>
:local(.style) {
  .panes {
    position: relative;
    width: 100%;

    .pane {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
