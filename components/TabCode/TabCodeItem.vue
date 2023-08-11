<template>
  <div class="code-item">
    <code>
      <slot></slot>
    </code>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabCodeItem',
})
</script>

<style lang="scss" scoped>
.code-item {
  background-color: rgb(244, 244, 245);
  padding: 16px;
  display: flex;
}
</style>