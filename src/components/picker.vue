<template>
  <transition name="ex-widget" @enter="enter">
    <ex-mask v-if="show" @click="dismiss($event)">
      <div class="picker">
        <div class="header">
          <a class="button text-gray" @click="cancel">{{cancelText}}</a>
          <h4 class="title">{{title}}</h4>
          <a class="button text-primary" :disabled="disabled" @click="confirm">{{confirmText}}</a>
        </div>
        <div class="content">
          <ex-picker-group v-for="(items, idx) in groupsImpl" :key="idx" :items="items" :adjust="adjust" :index="checkedImpl[idx]" @change="change($event, idx)"/>
        </div>
      </div>
    </ex-mask>
  </transition>
</template>
<script>
export default {
  props: {
    title: { type: String },
    show: { type: Boolean, default: false },
    // 更改主列后重置联动列的索引
    reset: { type: Boolean, default: true },
    adjust: { type: Boolean, default: true },
    // groups = [[ item, item, ...], [ item, item, ...] ],
    groups: { type: Array, default: () => [] },
    checked: { type: Array },
    dismiss: { type: Function, default: n => n },
    onCancel: { type: Function, default: n => n },
    onChange: { type: Function, default: n => n },
    onConfirm: { type: Function, default: n => n },
    cancelText: { type: String, default: '取消' },
    confirmText: { type: String, default: '确定' }
  },
  data() {
    // 转存为实例状态 以便做更新处理
    const groupsImpl = [].concat(this.groups);
    const checkedImpl = [...(this.checked || Array(groupsImpl.length).fill(-1))];
    return { groupsImpl, checkedImpl };
  },
  computed: {
    disabled() {
      return this.groupsImpl.some((items, index) => {
        const item = items[this.checkedImpl[index]];
        return item && item.disabled;
      });
    }
  },
  watch: {
    checked(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkedImpl.splice(0, this.checkedImpl.length, ...(this.checked || Array(this.groupsImpl.length).fill(-1)));
      }
    },
    groups(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.groupsImpl.splice(0, this.groupsImpl.length, ...this.groups);
        this.checkedImpl.splice(0, this.checkedImpl.length, ...(this.checked || Array(this.groupsImpl.length).fill(-1)));
      }
    }
  },
  methods: {
    enter: (el, done) => done(),
    // 处理联动逻辑
    change(e, groupIndex) {
      this.checkedImpl.splice(groupIndex, 1, e.index);
      const promise = this.onChange({ index: e.index, group: this.groupsImpl[groupIndex] });
      if (promise) {
        if (typeof promise.then === 'function') {
          promise.then(group => {
            this.update(e, groupIndex + 1, group);
          });
        } else {
          this.update(e, groupIndex + 1, promise);
        }
      }
    },
    // 更新联动列数据
    update(e, index, group) {
      if (Array.isArray(group)) {
        this.groupsImpl.splice(index, 1, group);
        // 重置联动列的索引
        if (this.reset && index < this.groupsImpl.length) {
          // 仅手动触发才重置 防止初始预设的索引被覆盖
          if (e.type === 'touchend') {
            this.checkedImpl.splice(index, 1, -1);
          }
        }
      }
    },
    // 取消
    cancel(e) {
      this.onCancel(e);
    },
    // 确定
    confirm() {
      let list = [];
      let checked = this.checkedImpl;

      for (let i = 0; i < checked.length; i++) {
        list[i] = this.groupsImpl[i][checked[i]];
      }
      this.onConfirm({ list, checked });
    }
  }
};
</script>
