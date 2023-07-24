import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, {slots}) {
    return () => (
      <div>
        {slots.default?.()}
      </div>
    )
  },
})