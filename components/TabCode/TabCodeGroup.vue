<template>
  <div class="code-group">
    <div class="code-tab">
      <div class="code-tab-item" :class="{ active: modelValue === item.name }" v-for="(item, index) in items" :key="index" @click="tabCodeChange(item)">{{ item.title }}</div>
    </div>
    <template v-for="(item, index) in slots.default?.()" :key="index">
      <component v-if="modelValue === item.props.name" :is="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSlots, reactive } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const items = reactive([])

slots.default?.().map((item) => {
  items.push({ title: item.props.title, name: item.props.name })
})

const tabCodeChange = (item) => {
  emit('update:modelValue', item.name)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TabCodeGroup',
})
</script>

<style lang="scss" scoped>
.code-group {
  border-radius: 4px;
  overflow: hidden;
  .code-tab {
    background-color: #e4e4e7;
    padding: 0 10px;
    display: flex;
    .code-tab-item {
      margin: 6px 0;
      padding: 6px 12px;
    }
    .active {
      font-weight: 600;
    }
  }
}
</style>