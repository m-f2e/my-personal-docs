import tsxComStyle from './index.module.scss'
import { ref } from 'vue'
import type { Ref } from 'vue'

export default ({count}: {count: Ref<number>})=> {
  let refCount = ref(count)
  return (
    <div class={tsxComStyle.box} onClick={() => {console.log('---');refCount.value++;}}>
      <p>count: {refCount.value}</p>
    </div>
  )
}