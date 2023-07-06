import DefaultTheme from 'vitepress/theme'
import MTargetBlank from '../../components/TargetBlank.vue'
import MButton from '../../components/Button.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MButton', MButton);
    app.component('MTargetBlank', MTargetBlank);
  }
}