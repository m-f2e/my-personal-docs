<template>
  <a :href="link" target="_blank" class="link">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
  defineProps({
    link: {
      type: String,
      default: ''
    }
  })
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TargetBlank',
})
</script>


<style scoped>
.link {
  background-color: #107c10;
  color: #fff;
  max-width: 120px;
  border: 1px solid #666666;
  font-size: 14px;
  box-sizing: border-box;
  padding: 6px 16px;
}
</style>