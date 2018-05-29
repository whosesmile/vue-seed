<template>
  <a class="menu" @click="$emit('click', $event)">
    <slot></slot>
  </a>
</template>
