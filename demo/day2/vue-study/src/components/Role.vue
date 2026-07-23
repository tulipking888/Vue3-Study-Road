<script setup lang="ts">
import hero from '../assets/hero.png'
const role = {
    name: "战士",
    level: 10,
    skill: "剑气斩"
}
const hp = 30
const hp2 = 100

function attack(name: string) {
    alert(`${name}攻击成功`)
}

const online = false
const visible = true

const roles = [
    {
        name: "战士",
        level: 10
    },
    {
        name: "法师",
        level: 20
    }
]
</script>

<template>
    <h2>角色:{{ role.name }}</h2>
    <h2>等级:{{ role.level }}</h2>
    <h2>技能:{{ role.skill }}</h2>

    <!-- 动态class绑定 -->
    <img :src="hero" width="100" height="100">

    <div :class="{ danger: hp < 50 }">
        生命值:{{ hp }}
    </div>

    <div :class="{ danger: hp2 < 50 }">
        生命值:{{ hp2 }}
    </div>

    <!-- v-on事件绑定 -->
    <div class="btn-group">
        <button @click="attack('')" class="attack-button">攻击</button>
        <button @click="attack('战士')" class="attack-button">战士攻击</button>
    </div>


    <!-- v-if -->
    <div v-if="online">ONLINE</div>

    <div v-if="hp > 0">存活</div>
    <div v-else>死亡</div>

    <!-- v-show -->

    <div v-show="visible">背包</div>

    <!-- v-for -->
    <div v-for="role in roles">{{role.name}}:{{ role.level }}</div>

    <!-- key -->
     <div v-for="role in roles" :key="role.name">{{role.name}}</div>

</template>
<style scoped>
.danger {
    color: red;
}

.btn-group {
    display: flex;
    flex-direction: column;
    /* 垂直排列 */
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
    /* 按钮之间的间距 */
}

.attack-button {
    width: 100px;
    height: 30px;
    background-color: blue;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin: 0 auto;
}
</style>