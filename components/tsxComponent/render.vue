<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  data() {
    return {
      message: 'Hello, world!'
    };
  },
  render() {
    return h('div', [
      h('h1', this.message),
      h('button', {
        style: {
          color: 'red',
          border: '1px solid skyblue',
          padding: '5px 20px',
        },
        onClick: () => {
          alert('---');
          this.message = 'Hello, world!!!!';
        }
      }, 'Click me')
    ])
  }
});
</script>
