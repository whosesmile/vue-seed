<template>
  <div ref="panel" class="loader">
    <slot />
    <div class="loadmore" v-if="loading">
      <i class="loading" />
      <span class="tips text-gray">{{$t('tips')}}</span>
    </div>
    <div class="feedback" v-else-if="list.length === 0">
      <div class="mark">
        <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
      </div>
      <div class="describe">{{$t('blank')}}</div>
    </div>
    <div class="divider" ui-mode="30%" v-else-if="isEnds">{{$t('ends')}}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  i18n: {
    messages: {
      en: { tips: 'Loading...', ends: 'NO MORE', blank: 'Nothing' },
      zh: { tips: '努力加载中', ends: '亲，我是有底线的', blank: '没有相关数据' }
    }
  },
  props: {
    url: { type: String, required: true },
    callback: { type: Function, default: n => n },
    list: { type: Array, default: () => [] }, // 默认值 比如从vuex中恢复时
    query: { type: Object, default: () => ({}) }, // 查询参数
    size: { type: Number, default: 20 },
    threshold: { type: Number, default: 300 } // 阈值
  },
  data() {
    return {
      page: 0,
      loading: false,
      items: [].concat(this.list) // 防止篡改原引用
    };
  },
  computed: {
    isEnds: function() {
      // 首页不展示ends信息
      return this.page > 1 && this.page * this.size > this.items.length;
    }
  },
  watch: {
    url: function(newVal, oldVal) {
      this.reload();
    },
    query: function(newVal, oldVal) {
      // TODO: 这里有一个隐患 如果query本身只是对调参数顺序 这个判定会返回错误 从而导致整个列表重置
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.reload();
      }
    }
  },
  mounted: function() {
    this.listener();
  },
  destroyed() {
    this.release();
  },
  methods: {
    // 提供一个方法用于重置数据 并重新加载
    reload() {
      this.page = 0;
      this.loading = false;
      this.items = [];
      this.callback({ list: this.items });
      // 重新绑定监听 防止之前被释放 并且会自动加载
      this.listener();
    },
    handler() {
      // 若容器被隐藏 不需要自动加载
      if (!this.$refs.panel.offsetParent) {
        return;
      }
      const BD = document.body;
      const DE = document.documentElement;
      const ST = Math.max(BD.scrollTop, DE.scrollTop); // scrollTop
      const SH = Math.max(BD.scrollHeight, DE.scrollHeight); // scrollHeight
      const CH = Math.min(BD.clientHeight, DE.clientHeight); // clientHeight
      // 如果距离底部距离大于阈值 则执行加载
      if (SH - ST - CH < this.threshold) {
        this.loadMore();
      }
    },
    release() {
      // 取消异步请求
      if (this.cancel) {
        this.cancel('cancel');
      }
      window.removeEventListener('scroll', this.handler);
    },
    listener() {
      this.release();
      window.addEventListener('scroll', this.handler);

      const count = this.items.length;
      // 如果默认数据为空 自动加载
      if (count === 0) {
        this.loadMore();
      } else {
        // 如果默认存在数据 重算页码
        this.page = Math.ceil(count / this.size);
      }
    },
    loadMore() {
      // 正在加载需要等待
      if (this.loading) {
        return;
      }
      // 如果当前数据小于理论数量 就认为已经没有下一页数据了
      if (this.page * this.size > this.items.length) {
        return;
      }

      this.loading = true;
      axios
        .get(this.url, {
          params: { page: this.page + 1, size: this.size, ...this.query },
          global: false, // 不触发全局事件(Toast提示)
          cancelToken: new axios.CancelToken(cancel => {
            this.cancel = cancel;
          })
        })
        .then(({ data }) => {
          this.loading = false;
          this.page = this.page + 1;
          this.items = this.items.concat(data.list);
          // 不足一页
          if (data.list.length < this.size) {
            this.release();
          }

          // 调用回调
          this.callback({ list: this.items });
        })
        .catch(() => {
          this.loading = false;
          this.release();
        });
    }
  }
};
</script>
