<template>
  <ex-view :class="$style.style">
    <ex-header>
      <ex-menu class="text-gray" @click="$router.back()">
        <i class="icon">&#xe60e;</i>
      </ex-menu>
      <ex-title title="组件演示" />
    </ex-header>
    <ex-content>
      <div class="list compact overlap">
        <div class="item-divider">Toast</div>
        <div class="item" @click="tipsToast('默认吐司')">
          <div class="text">默认吐司</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item" @click="tipsToast('模态吐司', true)">
          <div class="text">模态吐司</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">Modal</div>
        <div class="item" @click="showModal()">
          <div class="text">打开弹窗</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">Popup</div>
        <div class="item" @click="showPopup()">
          <div class="text">打开飘窗</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">ActionSheet</div>
        <div class="item" @click="showSheet()">
          <div class="text">弹出菜单</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">Loader</div>
        <router-link class="item" to="/example/loader">
          <div class="text">自动加载</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
        <div class="item-divider">Image</div>
        <router-link class="item" to="/example/image">
          <div class="text">延迟图片</div>
          <i class="icon text-gray">&#xe61a;</i>
        </router-link>
      </div>
    </ex-content>

    <ex-widgets>
      <ex-popup :show="popup" :dismiss="hidePopup">
        <div class="header">
          <button class="button text-gray" @click="hidePopup">取消</button>
          <h4 class="title">我是飘窗</h4>
          <button class="button text-primary" @click="hidePopup">确定</button>
        </div>
        <div class="list compact">
          <div class="item" v-for="item in [1,2,3,4,5]" :key="item" @click="hidePopup">
            <div class="text">{{item}}: HELLO WORLD</div>
            <i class="icon text-gray">&#xe61a;</i>
          </div>
        </div>
      </ex-popup>
    </ex-widgets>
  </ex-view>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      popup: false
    };
  },
  methods: {
    tipsToast: function(message, modal = false) {
      this.$store.dispatch({
        type: 'tipsToast',
        toast: {
          icon: 'warning',
          modal: modal,
          message: message
        }
      });
    },

    showModal: function() {
      this.$store.dispatch({
        type: 'showModal',
        modal: {
          title: '温馨提示',
          message: '六千年和一瞬间',
          dismiss: () => {
            console.log('你点击了空白');
            this.$store.dispatch('hideModal');
          },
          buttons: [
            {
              text: '取消',
              click: () => {
                console.log('你点击了取消');
                this.$store.dispatch('hideModal');
              }
            },
            {
              text: '确定',
              click: () => {
                console.log('你点击了确定');
                this.$store.dispatch('hideModal');
              }
            }
          ]
        }
      });
    },

    showPopup() {
      this.popup = true;
    },

    hidePopup() {
      this.popup = false;
    },

    showSheet() {
      this.$store.dispatch({
        type: 'showSheet',
        sheet: {
          title: '警告',
          message: '确定要删除订单吗？',
          dismiss: () => {
            console.log('你点击了空白');
            this.$store.dispatch('hideSheet');
          },
          buttons: [
            [
              {
                text: '删除',
                class: 'text-warning',
                click: () => {
                  console.log('你点击了删除');
                  this.$store.dispatch('hideSheet');
                  axios.get('/landing/ajax/home').then(() => {
                    this.$store.dispatch({
                      type: 'tipsToast',
                      toast: { icon: 'success', message: '删除成功' }
                    });
                  });
                }
              }
            ],
            [
              {
                text: '放弃',
                class: 'text-gray',
                click: () => {
                  console.log('你点击了放弃');
                  this.$store.dispatch('hideSheet');
                }
              }
            ]
          ]
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
