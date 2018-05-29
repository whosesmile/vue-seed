<template>
  <ex-mask class="transparent" v-if="modal && show">
    <div class="toast">
      <div class="ooxx">
        <i v-if="is('loading')" class="icon waiting" />
        <i v-else-if="is('icon')" class="icon" v-html="icon" />
        <i v-else-if="is('img')" class="icon"><img :src="icon" /></i>
        <i v-else-if="is('presets')" class="icon" v-html="presets[icon]" />
        <i v-else class="icon">&#xe601;</i>

        <span class="text" v-if="!is('loading') && message">{{message}}</span>
      </div>
    </div>
  </ex-mask>
  <div class="toast" v-else-if="!modal && show">
    <div class="ooxx">
      <i v-if="is('loading')" class="icon waiting" />
      <i v-else-if="is('icon')" class="icon" v-html="icon" />
      <i v-else-if="is('img')" class="icon"><img :src="icon" /></i>
      <i v-else-if="is('presets')" class="icon" v-html="presets[icon]" />
      <i v-else class="icon">&#xe601;</i>

      <span class="text" v-if="!is('loading') && message">{{message}}</span>
    </div>
  </div>
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
        success: '&#xe61c;',
        failure: '&#xe61d;',
        warning: '&#xe601;'
      }
    };
  },
  methods: {
    is(type) {
      switch (type) {
        case 'loading':
          return this.icon === 'loading';
        case 'presets':
          return this.presets[this.icon];
        case 'icon':
          return /^&#\w+;$/.test(this.icon);
        case 'img':
          return /^(https?)?\/\//.test(this.icon);
        default:
          return false;
      }
    }
  }
};
</script>
