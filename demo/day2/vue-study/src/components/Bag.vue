<template>
<div>
    <h2>背包</h2>
    <div v-for="item in items" :key="item.name">
        <p>{{item.name}}</p>
        <p>等级：{{item.level}}</p>
        <div v-if="item.equiped">已装备</div>
        <div v-else>未装备</div>
        <button v-if="item.equiped" @click="clickEquip(item.name)">攻击</button>
    </div>
</div>
</template>
<script setup lang="ts">
const items = [
    {
        name: "木剑",
        level: 1,
        equiped:true
    },
    {
        name: "铁剑",
        level: 5,
        equiped:false
    }
]
function clickEquip(name:string) {
    alert(name+"攻击成功")
}
</script>