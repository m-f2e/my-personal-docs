<!--
 * @Author: misterzhou
 * @Date: 2023-08-18 14:16:53
 * @LastEditTime: 2023-08-18 15:22:29
 * @LastEditors: misterzhou
 * @FilePath: /my-person-docs/components/waterFallVue.vue
 * @Description: 瀑布流示例组件
-->
<template>
  <div class="wraps">
    <div 
      v-for="item in waterList" 
      class="items" 
      :style="{height:item.height+'px',background:item.background,top:item.top+'px',left:item.left + 'px'}">
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const props = defineProps<{
  list: any[]
}>()
const waterList = reactive<any[]>([])

const init = () => {
  const heightList: any[] = []
  const width = 130
  const x = document.body.clientWidth
  const column = Math.floor(x / width)
  for (let i = 0; i < props.list.length; i++) {
    if (i < column) {
      props.list[i].top = 10
      props.list[i].left = i * width
      heightList.push(props.list[i].height + 10)
      waterList.push(props.list[i])
    } else {
      console.log('$---', heightList);
      // 找到最高的高度
      let current = heightList[0]
      let index = 0
      heightList.forEach((h, idx) => {
        if (current > h) {
          current = h
          index = idx
        }
      })
      props.list[i].top = current + 20
      props.list[i].left = index * width
      heightList[index] = heightList[index] + props.list[i].height + 20
      heightList.push(props.list[i].height + 10)
      waterList.push(props.list[i])
    }
  }
}

onMounted(() => {
  window.onresize = () => init()
  init()
})
</script>

<style scoped lang="scss">
.wraps {
  position: relative;
  height: 100%;
  .items {
    position: absolute;
    width: 120px;
  }
}
</style>