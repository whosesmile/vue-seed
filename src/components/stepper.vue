<template>
  <div :class="$style.style">
    <button class="minus" @click="minus" :disabled="valueImpl === min" />
    <input type="number" pattern="[0-9]*" @input="input" :value="valueImpl" />
    <button class="plus" @click="plus" :disabled="valueImpl === max" />
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Number, default: 1 },
    step: { type: Number, default: 1 },
    min: { type: Number, default: 1 },
    max: { type: Number, default: Infinity }
  },
  data() {
    const val = this.correct(this.value);
    if (val !== this.value) {
      this.$emit('input', val);
    }
    return {
      valueImpl: val
    };
  },
  watch: {
    value(newVal) {
      const val = this.correct(newVal);
      if (val !== this.valueImpl) {
        this.valueImpl = val;
        this.$emit('input', val);
      }
    }
  },
  methods: {
    correct(val) {
      return val === '' || isNaN(val) ? this.min : Math.min(Math.max(val, this.min), this.max);
    },
    minus() {
      this.valueImpl = this.correct(this.valueImpl - this.step);
      this.$emit('input', this.valueImpl);
    },
    input(e) {
      this.valueImpl = this.correct(e.target.value);
      e.target.value = this.valueImpl;
      this.$emit('input', this.valueImpl);
    },
    plus() {
      this.valueImpl = this.correct(this.valueImpl + this.step);
      this.$emit('input', this.valueImpl);
    }
  }
};
</script>

<style lang="less" module>
:local(.style) {
  display: inline-block;
  font-size: 0;
  button {
    position: relative;
    width: 40px;
    height: 30px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    vertical-align: middle;
    &:focus {
      outline: 0;
    }
    &:active {
      background-color: #f9f9f9;
    }
    &[disabled] {
      background: #f9f9f9;
    }
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #777;
      margin: auto;
    }
  }
  input {
    width: 40px;
    height: 30px;
    padding: 0 3px;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    color: #666;
    font-size: 14px;
    vertical-align: middle;
    text-align: center;
    -webkit-appearance: none;
    &:focus {
      outline: 0;
    }
  }
  .minus {
    border-radius: 2px 0 0 2px;
    &:before {
      width: 13px;
      height: 1px;
    }
    &:after {
      content: none;
    }
  }
  .plus {
    border-radius: 0 2px 2px 0;
    &:before {
      width: 13px;
      height: 1px;
    }
    &:after {
      width: 1px;
      height: 13px;
    }
  }
}
</style>

