<template>
    <h2>角色：{{ name }}</h2>
    <p>等级：{{ level }}</p>
    <p>血量：{{ hp }}</p>

    <button @click="selectRole">选择角色</button>
    <button @click="callRole">呼叫角色</button>

    <!-- slot -->
    <div>
        <h2>弹窗</h2>
        <slot/>
    </div>
    
    <!--需要从外部传入 <RoleCard>角色信息</RoleCard> -->

</template>


<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    console.log("组件加载完成")
    getUserList()
})

onUnmounted(() => {
    console.log("组件销毁")
})

function getUserList() {
    console.log("this is getUserList")
}
//普通写法
// defineProps({
//     name: String,
//     level: Number,
//     hp: Number
// })
//企业级写法
interface Props {
    name: string
    level: number
    hp: number
}
defineProps<Props>()

//emit

const emit = defineEmits(["select","call"])
function selectRole() {
    emit('select')
}
function callRole() {
    emit('call',"我是张三")
}
</script>