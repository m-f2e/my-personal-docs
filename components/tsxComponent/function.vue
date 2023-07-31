<script>
import { h } from 'vue'
function Heading(props, { attrs,slots }) {
  return h(`h${props.level}`, {
    ...attrs,
    onClick: () => {
      console.log('click')
    }
  }, slots)
}
// Heading.props = ['level']
Heading.props = {
  level: {
    type: String,
    default: '1'
  }
}
export default Heading
</script>
