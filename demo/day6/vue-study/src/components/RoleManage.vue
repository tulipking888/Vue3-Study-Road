<template>
    <h2>角色管理</h2>
    <el-button type="primary" @click="openDialog">新增角色</el-button>
    <el-table :data="roles2">
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="level" label="角色等级" />
    </el-table>

    <el-dialog v-model="visible" title="新增角色">
        <el-input v-model="form.name" placeholder="输入角色名称" />
    </el-dialog>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const roles2 = [
    {
        name: "战士",
        level: 10
    },
    {
        name: "法师",
        level: 20
    }
]

const visible = ref(false)

const form = reactive({
    name: ""
})

function openDialog() {
    visible.value = true
}

</script>