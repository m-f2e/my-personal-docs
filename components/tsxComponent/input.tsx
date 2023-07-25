import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'TsxInput',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const countRef = ref(props.modelValue)
    const onChange = (el) => {
      emit('update:modelValue', el.target.value)
    }
    return () => (
      <input v-model={countRef.value} onInput={onChange} />
    )
  }
})