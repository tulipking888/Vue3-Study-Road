<template>
    <el-table :data="roles">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="level" label="角色等级" />
    </el-table>
</template>

<script setup lang="ts">
//页面调用接口
import { onMounted, ref } from 'vue';
import { getRoleList } from '../api/role';

interface Role {
    id:number
    name:string
    level:number
}
const roles = ref<Role[]>([])

onMounted(() => {
    loadData()
})


async function loadData() {
    try {
        const res = await getRoleList()
        console.log('loadData', res)
        roles.value = res.data.data
    } catch (error) {
        console.log("请求失败", error)
    }

}
</script>