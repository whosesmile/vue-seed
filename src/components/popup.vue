<template>
  <transition name="ex-widget" @enter="enter">
    <ex-mask v-if="show" @click="dismiss($event)">
      <div class="popup">
        <slot />
      </div>
    </ex-mask>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    dismiss: { type: Function, default: n => n }
  },
  methods: {
    enter: (el, done) => done()
  }
};
</script>
