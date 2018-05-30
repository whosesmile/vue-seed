<template>
  <transition name="ex-widget" @enter="enter">
    <ex-mask class="transparent" v-if="show && modal">
      <div class="toast" v-html="fragment()"></div>
    </ex-mask>
    <div class="toast" v-else-if="show && !modal" v-html="fragment()"></div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    modal: { type: Boolean, default: false },
    icon: { type: String },
    message: { type: String }
  },
  data() {
    return {
      presets: {
        success: "&#xe61c;",
        failure: "&#xe61d;",
        warning: "&#xe601;"
      }
    };
  },
  methods: {
    enter: (el, done) => done(),
    fragment() {
      let frag = "";
      if (this.icon === "loading") {
        frag += `<i class="icon waiting"><i>`;
      } else if (/^&#\w+;$/.test(this.icon)) {
        frag += `<i class="icon">${this.icon}</i>`;
      } else if (/^(https?)?\/\//.test(this.icon)) {
        frag += `<i class="icon"><img src="${this.icon}" /></i>`;
      } else if (this.presets[this.icon]) {
        frag += `<i class="icon">${this.presets[this.icon]}</i>`;
      } else {
        frag += `<i v-else class="icon">&#xe601;</i>`;
      }

      if (this.message && this.icon !== "loading") {
        frag += `<span class="text">${this.message}</span>`;
      }
      return `<div class="ooxx">${frag}</div>`;
    }
  }
};
</script>
