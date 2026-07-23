<script setup lang="ts">
import { reactive, ref } from 'vue';

import RoleManage from './components/RoleManage.vue';

const name = ref('')
const roleName = ref('')
const roleLevel = ref('')

const form = reactive({
  name: "",
  level: 1,
  job: ""
})

const roles = [
  {
    id: 1,
    name: "战士",
    level: 10
  },
  {
    id: 2,
    name: "法师",
    level: 20
  }
]



const visible = ref(false)

function clickEdit() {
  visible.value = true 
}
</script>

<template>
  <el-button>普通按钮</el-button>
  <el-button type="primary">新增</el-button>
  <el-button type="success">成功</el-button>
  <el-button type="warning">警告</el-button>
  <el-button type="danger">删除</el-button>

  <el-input placeholder="请输入名称" />
  <el-input v-model="name" placeholder="请输入你的姓名" />

  <!-- 基础form -->
  <el-form>
    <el-form-item label="角色名称">
      <el-input v-model="roleName" />
    </el-form-item>

    <el-form-item label="角色等级">
      <el-input v-model="roleLevel" />
    </el-form-item>

  </el-form>

  <!-- 表单数据管理 -->
  <el-input v-model="form.name" />


  <!-- 基础Table -->
  <el-table :data="roles">
    <el-table-column prop="id" , label="ID" />
    <el-table-column prop="name" , label="角色名称" />
    <el-table-column prop="level" , label="等级" />

    <!-- 操作 -->
    <el-table-column label="操作">
      <template #default="scope">
        <!-- 这里的内容会被插入到每一行的单元格中 <el-table-column> 组件只认 <template> 作为插槽内容 -->
        <el-button @click="clickEdit">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>

    </el-table-column>
  </el-table>

  <!-- Dialog -->
  <el-dialog v-model="visible" title="新增角色">
    角色表单内容
  </el-dialog>


  <RoleManage />

</template>
