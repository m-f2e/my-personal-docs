import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TsxContainer',
  setup(props, {slots}) {
    return () => (
      <div>
        {slots.default?.()}
      </div>
    )
  },
})