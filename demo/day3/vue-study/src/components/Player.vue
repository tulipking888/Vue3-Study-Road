<template>
    <p>{{ level }}</p>


    <!-- ref -->
    <div>
        <h2>
            等级：{{ level2 }}
        </h2>
        <button @click="levelUp">升级</button>
    </div>

    <!-- reactive -->
    <h2>角色：{{ player.name }}</h2>
    <p>等级：{{ player.level }}</p>
    <p>血量：{{ player.hp }}</p>

    <!-- computed -->
    <p>战斗力值：{{power}}</p>

    <!-- watch -->
    <button @click="dechp" class="hpbar">血量值：{{hp}}</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue';

let level = 10
level++


let level2 = ref(10)
level2.value++

function levelUp() {
    level2.value++
}

const player = reactive({
    name: "战士",
    level: 10,
    hp: 1000
})


//computed

const attack = ref(100)
const level3 = ref(10)
const power = computed(()=>{
    return attack.value * level3.value
})

//watch

const hp = ref(1000)
watch(hp,(value)=>{
    console.log("当前生命:",value)
})
function dechp() {
    hp.value--
}

//watchEffect
watchEffect(()=>{
    console.log("监控当前生命:",hp.value)
})
</script>

<style scoped>
.hpbar {
    width: 200px;
    height: 30px;
    margin: 0 auto;
}
</style>