<script setup lang="ts">
import RoleCard from './components/RoleCard.vue';
function handleSelect() {
  console.log("父组件收到了选择角色")
  alert("父组件收到了选择角色")
}
function handleCall(name: string) {
  alert("呼叫角色:" + name)
}
</script>

<template>
  <RoleCard name="战士" :level="10" :hp="1000" @select="handleSelect" @call="handleCall">角色信息</RoleCard>
  
</template>
