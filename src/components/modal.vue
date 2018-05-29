<template>
  <ex-mask @click="dismiss($event)" v-if="show">
    <div class="modal">
      <h3 class="title" v-if="title">{{title}}</h3>
      <div class="content" v-html="message"></div>
      <footer class="footer">
        <div class="button-group compact nesting">
          <button class="button square" v-for="(item, idx) in buttons" :key="idx" :class="[item.class || 'text-primary']" @click="item.click($event)">{{item.text}}</button>
        </div>
      </footer>
    </div>
  </ex-mask>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, type: false },
    title: { type: String },
    message: { type: String },
    dismiss: { type: Function, default: n => n },
    buttons: { type: Array, default: () => [] }
  }
};
</script>
