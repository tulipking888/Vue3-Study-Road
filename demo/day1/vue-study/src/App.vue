<script setup lang="ts">
import Role from './components/Role.vue'
</script>

<template>
  <Role />

  <div class="box">
    <h1>我的第一个vue项目</h1>
  </div>

  <div class="title">
    <h1>我是一个标题</h1>
  </div>
  
</template>

<style scoped>
.box {
  width: 800px;
  margin: 100px auto;
  background-color: red;
}
.title h1{
  font-size: 50px;
  color: blue;
}
</style>