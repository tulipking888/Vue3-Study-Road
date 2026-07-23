<template>
    <div>
        <h2>角色名称：{{ name }}</h2>
        <h2>等级：{{ level }}</h2>
        <h2>技能：{{ skill }}</h2>
    </div>

    <div class="role-info">
        <div class="row">
            <span class="label">角色名称：</span>
            <span class="value">{{ name }}</span>
        </div>
        <div class="row">
            <span class="label">等级：</span>
            <span class="value">{{ level }}</span>
        </div>
        <div class="row">
            <span class="label">技能：</span>
            <span class="value">{{ skill }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = "战士"
const level = ref(10)
const skill = "剑气斩"
</script>

<style scoped>
h2 {
    color: red;
}

.role-info {
    width: 400px;           /* 固定宽度，让对齐效果更明显 */
    margin: 0 auto;         /* 整体居中 */
}
.row {
    display: flex;          /* 弹性布局 */
    justify-content: space-between;  /* 左右两端对齐 */
    padding: 8px 0;;
}
.label {
    text-align: right;      /* 标签居右 */
    flex: 1;                /* 占一半空间 */
    margin-right: 20px;     /* 和数值保持间距 */
}
.value {
    text-align: left;       /* 数值居左 */
    flex: 1;                /* 占一半空间 */
}
</style>