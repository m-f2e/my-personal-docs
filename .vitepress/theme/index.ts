import DefaultTheme from 'vitepress/theme'
import MTargetBlank from '../../components/MTargetBlank.vue'
import Button from '../../components/Button.vue'
import Toast from '../../components/Toast.vue'
import TsxContainer from '../../components/tsxContainer'
import Modal from '../../components/Modal.vue'
import TabCodeGroup from '../../components/TabCode/TabCodeGroup.vue'
import TabCodeItem from '../../components/TabCode/TabCodeItem.vue'

// 组件注册
const components = [
  MTargetBlank,
  Button,
  Toast,
  TsxContainer,
  Modal,
  TabCodeGroup,
  TabCodeItem
]

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    components.forEach((component) => {
      app.component(component.name, component);
    })
  }
}