import { ref, defineComponent } from 'vue'
// import type { Ref } from 'vue'

// export default ()=> {
//   const countRef = ref(111)
//   return (
//     <input v-model={countRef.value} />
//   )
// }

// export default defineComponent({
//   name: 'TsxComponent',
//   setup() {
//     const countRef = ref(111)
//     return () => (
//       <input v-model={countRef.value} />
//     )
//   }
// })

export default defineComponent({
  name: 'TsxComponent',
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