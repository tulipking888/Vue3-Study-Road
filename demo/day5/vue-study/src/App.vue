<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//用来跳转
const router = useRouter()
// 用来获取当前路由信息
const route = useRoute()

function goRole() {
  router.push('/role/1001')
}
function goHome() {
  router.push('/home')
}
//此时路由参数还没解析完成 → 输出 undefined
// console.log("动态路由参数",route.params.id)
// 监听路由参数变化（包括首次加载）
watch(
  () => route.params.id,
  (id) => {
    console.log("当前角色ID:", id)
    // 可以在这里根据 id 请求角色详情数据
  },
  { immediate: true }
)
</script>

<template>
  <!-- 显示路由页面 -->
  <router-view />

  <button @click="goRole">跳转角色管理页面</button>
  <button @click="goHome">跳转首页</button>
</template>
