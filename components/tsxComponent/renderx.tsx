import { ref } from 'vue'

export default (props, context) => {
  console.log(props, context)
  const count = props.count
  return (
    <div>
      <input v-model={count} style={{ border: '1px solid red' }} />
    </div>
  )
}