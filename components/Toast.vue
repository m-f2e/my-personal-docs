<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <p class="modal-title">{{ message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  message: '',
})

const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)
let timer;

watch(() => props.modelValue, (newVal) => {
  showModal.value = newVal
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    showModal.value = false
    emit('update:modelValue', false)
  }, 2000)
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toast',
})
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}
.modal-container {
  min-width: 80px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  .modal-title {
    color: #fff;
  }
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
