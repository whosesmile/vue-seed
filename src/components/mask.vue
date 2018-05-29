<template>
  <div class="ex-widget-layer" @click.self="$emit('click', $event)">
    <slot />
  </div>
</template>
