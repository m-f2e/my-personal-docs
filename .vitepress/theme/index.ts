import DefaultTheme from 'vitepress/theme'
import TargetBlank from '../../components/TargetBlank.vue'
import Button from '../../components/Button.vue'
import Toast from '../../components/Toast.vue'
import TsxContainer from '../../components/tsxContainer'
import Modal from '../../components/Modal.vue'

// 组件注册
const components = [
  TargetBlank,
  Button,
  Toast,
  TsxContainer,
  Modal
]

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    components.forEach((component) => {
      app.component(component.name, component);
    })
  }
}