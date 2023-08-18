import { ref } from 'vue'
const v = ref<string>('')
const arr = [1, 2, 3, 4, 5]

export default (props, context) => {
  const count = props.count
  return (
    <>
      {/* props.count */}
      <div>props: {count}</div>
      <input v-model={count} style={{ border: '1px solid red' }} />

      {/* ref value */}
      <div>ref: { v.value }</div>
      <input v-model={v.value} type="text" style={{ border: '1px solid green' }}  />

      <p>data-arr:</p>
      <div data-arr={arr}>1</div>
    </>
  )
}