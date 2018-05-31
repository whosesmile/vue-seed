<template>
  <div ref="panel" class="loader">
    <slot />
    <div class="loadmore" v-if="loading">
      <i class="loading" />
      <span class="tips text-gray">{{tips}}</span>
    </div>
    <div class="feedback" v-else-if="list.length === 0">
      <div class="mark">
        <img width="197" height="98" src="//img1.qdingnet.com/c50aee1127e2b6a075250a6b26629bd2.png" alt="空白" />
      </div>
      <div class="describe" v-if="blank">{{blank}}</div>
    </div>
    <div class="divider" ui-mode="30%" v-else-if="isEnds">{{ends}}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    url: { type: String, required: true },
    callback: { type: Function, default: n => n },
    list: { type: Array, required: true }, // 默认值 比如从vuex中恢复时
    query: { type: Object, default: () => ({}) }, // 查询参数
    size: { type: Number, default: 20 },
    threshold: { type: Number, default: 300 }, // 阈值
    tips: { type: String, default: '努力加载中' }, // 加载文案
    ends: { type: String, default: '亲，我是有底线的' }, // 终点提示文案 传空就是不显示
    blank: { type: String, default: '没有相关数据' } // 空列表提示文案 传空就是不显示
  },
  data() {
    return {
      page: 0,
      loading: false
    };
  },
  computed: {
    isEnds: function() {
      // 达到极限 显示提示 (首页不展示ends信息)
      return this.ends && this.page > 1 && this.page * this.size > this.list.length;
    }
  },
  mounted: function() {
    this.listener();
  },
  destroyed() {
    this.release();
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
  methods: {
    // 提供一个方法用于重置数据 并重新加载
    reload() {
      this.page = 0;
      this.loading = false;
      this.list.splice(0);
      this.callback({ list: this.list });
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

      const count = this.list.length;
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
      if (this.page * this.size > this.list.length) {
        return;
      }

      this.loading = true;
      axios
        .get(this.url, {
          params: { page: this.page + 1, size: this.size, ...this.query },
          global: false, // 不触发全局事件(Toast提示)
          cancelToken: new axios.CancelToken(cancel => (this.cancel = cancel))
        })
        .then(data => {
          this.loading = false;
          this.page = this.page + 1;
          // TODO: 这不是一个遵循函数式编程的方案 容易引起BUG 只是应用起来会非常简单
          this.list.splice(this.list.length, 0, ...data.list);
          // 不足一页
          if (data.list.length < this.size) {
            this.release();
          }

          // 调用回调
          this.callback(data);
        })
        .catch(() => {
          this.loading = false;
          this.release();
        });
    }
  }
};
</script>
