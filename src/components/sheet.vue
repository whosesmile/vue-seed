<template>
  <transition name="ex-widget" @enter="enter">
    <ex-mask @click="dismiss($event)" v-if="show">
      <div class="actionsheet">
        <header class="header" v-if="title || message">
          <h4 v-if="title">{{title}}</h4>
          <span>{{message}}</span>
        </header>
        <div class="menus" v-for="(group, idx) in list" :key="idx">
          <div class="item" v-for="(item, idx) in group" :key="idx" :class="[item.class]" @click="item.onClick">{{item.text}}</div>
        </div>
      </div>
    </ex-mask>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    title: { type: String },
    message: { type: String },
    dismiss: { type: Function, default: n => n },
    buttons: { type: Array, default: () => [] }
  },
  methods: {
    enter: (el, done) => done()
  },
  computed: {
    // 转换为二维数组
    list: function() {
      let list = this.buttons;
      if (!Array.isArray(list[0])) {
        list = [list];
      }
      return list;
    }
  }
};
</script>
