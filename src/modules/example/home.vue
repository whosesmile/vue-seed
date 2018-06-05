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
          <div class="text">对话框</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">Popup</div>
        <div class="item" @click="showPopup()">
          <div class="text">上浮窗</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">Picker</div>
        <div class="item" @click="showPicker()">
          <div class="text">选择器</div>
          <i class="icon text-gray">&#xe61a;</i>
        </div>
        <div class="item-divider">ActionSheet</div>
        <div class="item" @click="showSheet()">
          <div class="text">弹出式菜单</div>
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
          <h4 class="title">我是飘窗</h4>
          <!-- <button class="button text-primary" @click="hidePopup">确定</button> -->
        </div>
        <div class="list compact">
          <div class="item" v-for="item in [1,2,3,4,5]" :key="item" @click="hidePopup">
            <div class="text">北京欢迎你</div>
            <i class="icon text-gray">&#xe61a;</i>
          </div>
        </div>
      </ex-popup>

      <ex-picker v-bind="picker" />
    </ex-widgets>
  </ex-view>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      popup: false,
      picker: { show: false }
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
              onClick: () => {
                console.log('你点击了取消');
                this.$store.dispatch('hideModal');
              }
            },
            {
              text: '确定',
              onClick: () => {
                console.log('你点击了确定');
                this.$store.dispatch('hideModal');
              }
            }
          ]
        }
      });
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
                onClick: () => {
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
                onClick: () => {
                  console.log('你点击了放弃');
                  this.$store.dispatch('hideSheet');
                }
              }
            ]
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

    showPicker() {
      this.picker = {
        show: true,
        adjust: false,
        title: '选择城市',
        groups: [[{ name: '北京' }, { name: '上海', disabled: true }, { name: '广州' }, { name: '深圳' }, { name: '杭州' }, { name: '南京', disabled: true }]],
        checked: this.checked,
        dismiss: () => {
          this.picker.show = false;
        },
        // 变动处理: 返回联动列数据
        // 也可以返回Promise 以便处理异步 resolve的数据作为联动列数据
        // params:
        // index: 选中索引
        // group: 变动数组
        onChange: ({ index, group }) => {
          let data = null;
          let item = group[index];
          if (item.name === '北京') {
            data = [{ name: '东城' }, { name: '西城' }, { name: '海淀' }, { name: '朝阳', disabled: true }, { name: '西城' }];
          } else if (item.name === '上海') {
            data = [{ name: '徐汇' }, { name: '朝阳' }];
          } else if (item.name === '广州') {
            data = [{ name: '沙坝' }, { name: '天河' }];
          } else if (item.name === '深圳') {
            data = [{ name: '福田' }, { name: '盐田' }];
          } else if (item.name === '杭州') {
            data = [{ name: '萧山' }, { name: '西湖' }];
          } else if (item.name === '南京') {
            data = [{ name: '白下' }, { name: '玄武' }];
          }
          return data;
        },
        onCancel: () => {
          this.picker.show = false;
        },
        onConfirm: ({ list, checked }) => {
          // 更新选中索引 便于下次打开恢复上次选择
          this.checked = checked;
          this.picker.show = false;
          console.log('你选择了:', list.map(item => item.name).join(''));
        }
      };
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
