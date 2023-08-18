<!--
 * @Author: misterzhou
 * @Date: 2023-08-18 15:44:07
 * @LastEditTime: 2023-08-18 16:07:14
 * @LastEditors: misterzhou
 * @FilePath: /my-person-docs/components/TreeItem.vue
 * @Description: 递归组件
-->
<template>
  <div style="margin-left:10px;" class="tree">
    <div :key="index" v-for="(item,index) in data">
      <div @click='clickItem(item)'>{{item.name}}</div>
      <TreeItem @on-click='clickItem' v-if='item?.children?.length' :data="item.children"></TreeItem>
    </div>
  </div>
</template>

<script setup lang="ts">

type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}
 
type Props<T> = {
  data?: T[] | []
}
 
defineProps<Props<TreeList>>()

const clickItem = (item: TreeList) => {
  console.log(item)
}
</script>


<script lang="ts">
export default {
  name: "TreeItem"
}
</script>