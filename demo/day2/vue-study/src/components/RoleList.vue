<template>
    <div>
        <h2>角色列表</h2>

        <div v-for="role in roles" :key="role.name">
            <h3>{{ role.name }}</h3>
            <p>等级：{{ role.level }}</p>
            <p>职业：{{ role.job }}</p>
            <button @click="selectRole(role)">选择角色</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'


// 1. 定义类型
interface Role {
    name: string
    level: number
    job: string
}

const roles = ref<Role[]>([
    {
        name: "战士",
        level: 10,
        job: "近战"
    },
    {
        name: "法师",
        level: 20,
        job: "远程"
    },
    {
        name: "射手",
        level: 30,
        job: "物理"
    }
])
function selectRole(role: Role) {
    console.log("选择角色：", role.name)
}
</script>