# Vue3 企业开发30天教程

# Day03：Vue响应式系统


> 学习路线：
>
> Cocos Creator 数据驱动
>
> ↓
>
> Vue3 响应式系统
>
> ↓
>
> 企业后台状态管理
>
> ↓
>
> 芋道源码阅读


---

# 今日学习目标


完成今天学习后，你应该掌握：

- 理解 Vue 为什么可以自动更新页面
- 掌握 ref 的使用
- 掌握 reactive 的使用
- 理解 ref 和 reactive 的区别
- 掌握 computed 计算属性
- 掌握 watch 数据监听
- 掌握 watchEffect 自动监听


今天完成一个实战：

```
角色属性面板

角色名称

等级

生命值

攻击力

战斗力

升级按钮
```

并实现：

```
修改数据

↓

自动刷新页面
```


---

# 一、什么是响应式？


## 1.1 Cocos Creator 中的数据更新


你之前在 Cocos 中可能这样写：


```ts
let hp = 100


hp--


hpLabel.string = hp.toString()
```


流程：


```
修改数据

↓

手动找到UI节点

↓

更新UI
```


也就是说：

开发者需要关心：

```
数据

和

UI
```

之间的同步。


---

# 1.2 Vue 的响应式


Vue：

```ts
hp.value--
```


页面自动变化。


流程：

```
修改数据

↓

Vue检测变化

↓

重新渲染页面
```


这就是：

> 响应式系统。


---

# 二、ref 基础


## 2.1 为什么需要 ref？


普通变量：


```ts
let level = 10


level++
```


Vue 不知道：

```
level变化了
```


所以需要：

```ts
ref()
```


---

# 2.2 ref 基本使用


示例：

文件：

```
src/components/Player.vue
```


代码：


```vue
<template>
  <div>
    <h2>
      等级：{{ level }}
    </h2>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'


const level = ref(10)

</script>
```


显示：

```
等级：10
```


---

# 三、ref 修改数据


注意：

在 script 中：

需要：

```ts
.value
```


例如：


```ts
level.value++
```


但是：

template 中：

不用写：

```vue
{{ level.value }}
```


而是：

```vue
{{ level }}
```


Vue 会自动处理。


---

# 四、事件结合 ref


示例：

升级按钮。


```vue
<template>

  <h2>
    等级：{{ level }}
  </h2>


  <button @click="levelUp">
    升级
  </button>

</template>


<script setup lang="ts">
import { ref } from 'vue'


const level = ref(10)


function levelUp(){

  level.value++

}

</script>
```


效果：

点击按钮：


```
10

↓

11

↓

12

```


页面自动刷新。


---

# 五、reactive 对象响应式


实际项目中：

数据通常是对象。


例如玩家：


```ts
const player = {

  name:"战士",

  level:10,

  hp:1000

}
```


这种情况推荐：

```ts
reactive()
```


---

示例：


```vue
<script setup lang="ts">
import { reactive } from 'vue'


const player = reactive({

  name:"战士",

  level:10,

  hp:1000

})

</script>
```


模板：


```vue
<template>

<h2>
角色：{{ player.name }}
</h2>


<p>
等级：{{ player.level }}
</p>


<p>
生命：{{ player.hp }}
</p>


</template>
```


---

# 六、ref 和 reactive 区别


| |ref|reactive|
|-|-|-|
|基本类型|推荐|不推荐|
|对象类型|可以|推荐|
|访问方式|xxx.value|直接访问|
|使用频率|非常高|高|


企业项目常见写法：


```ts
const loading = ref(false)


const form = reactive({

 username:"",

 password:""

})
```


---

# 七、computed 计算属性


## 7.1 为什么需要 computed？


例如：

战斗力：

```
攻击力 × 等级
```


数据：


```ts
attack = 100

level = 10
```


如果每次手动计算：

很麻烦。


所以使用：

```ts
computed()
```


---

示例：


```vue
<script setup lang="ts">

import {
  ref,
  computed
} from 'vue'


const attack = ref(100)

const level = ref(10)


const power = computed(()=>{

  return attack.value * level.value

})


</script>
```


模板：


```vue
<template>

<h2>
战斗力：

{{ power }}

</h2>

</template>
```


结果：

```
1000
```


---

# 八、watch 数据监听


## 8.1 watch作用


监听数据变化。


例如：

监听玩家血量。


```ts
watch(

 hp,

 (value)=>{

   console.log(value)

 }

)
```


---

完整示例：


```vue
<script setup lang="ts">

import {
  ref,
  watch
} from 'vue'


const hp = ref(1000)


watch(

  hp,

  (value)=>{

    console.log(
      "当前生命:",
      value
    )

  }

)

</script>
```


当：

```ts
hp.value--
```


自动触发。


---

# 九、watchEffect


watchEffect：

自动收集依赖。


示例：


```ts
watchEffect(()=>{

  console.log(
    hp.value
  )

})
```


只要：

hp变化：

自动执行。


---

# 十、综合案例：角色属性面板


创建：


```
src/components/PlayerPanel.vue
```


代码：


```vue
<template>

<div>

<h2>
角色：{{ player.name }}
</h2>


<p>
等级：

{{ player.level }}

</p>


<p>
生命：

{{ hp }}

</p>


<p>
战斗力：

{{ power }}

</p>


<button @click="levelUp">

升级

</button>


</div>

</template>



<script setup lang="ts">

import {
  reactive,
  ref,
  computed,
  watch
} from 'vue'


const player = reactive({

  name:"战士",

  level:10

})


const hp = ref(1000)


const power = computed(()=>{

  return player.level * 100

})


function levelUp(){

  player.level++

  hp.value += 100

}


watch(

  hp,

  (value)=>{

    console.log(
      "HP变化:",
      value
    )

  }

)

</script>
```


---

# 十一、接入 App.vue


```vue
<script setup lang="ts">

import PlayerPanel from './components/PlayerPanel.vue'

</script>


<template>

<PlayerPanel />

</template>
```


效果：

```
角色：战士

等级：10

生命：1000

战斗力：1000


点击升级


等级：11

生命：1100

战斗力：1100

```


---

# 十二、芋道源码关联


今天学习内容对应芋道大量代码。


## 1. 页面加载状态


例如：

```ts
const loading = ref(false)
```


用于：

```
按钮加载

表格加载

接口请求状态
```


---

## 2. 表单数据


例如：

```ts
const form = reactive({

 username:"",

 password:""

})
```


对应：

```
登录页面

新增用户

编辑表单
```


---

## 3. 列表数据


例如：

```ts
const list = ref([])
```


对应：

```
用户列表

菜单列表

角色列表
```


---

# 十三、今日练习


## 练习1：角色升级系统


创建：

```
RoleUpgrade.vue
```


要求：

数据：

```
角色名称

等级

经验

攻击力
```


点击升级：


```
等级+1

经验+100

攻击力自动增加
```


要求：

使用：

```
ref

computed
```


---

## 练习2：血量系统


实现：

```
当前HP：1000
```


按钮：

```
受到攻击
```


点击：

```
HP减少100
```


当：

```
HP < 300
```


显示：

```
危险
```


要求：

使用：

```
computed
```


---

## 练习3：监听变化


监听：

```
等级变化
```


输出：

```
等级提升
```


要求：

使用：

```
watch
```


---

# 十四、今日验收


完成后，你应该可以回答：


## 1

Vue自动更新页面靠什么？

答案：

```
响应式系统
```


---

## 2

普通变量为什么不能自动刷新？

答案：

```
Vue无法感知变化
```


---

## 3

ref修改值为什么需要.value？

答案：

```
ref返回的是响应式对象
```


---

## 4

计算数据使用什么？

答案：

```
computed
```


---

## 5

监听变化使用什么？

答案：

```
watch
```


---

# 今日总结


Vue响应式核心：

```
数据

↓

响应式系统

↓

页面
```


三个最重要API：

```
ref

reactive

computed
```


两个监听API：

```
watch

watchEffect
```


掌握这些以后：

你已经具备阅读企业 Vue 页面逻辑的基础。


---

# Day04预告


主题：

# Vue生命周期与组件通信


学习：

- onMounted
- onUnmounted
- props
- emit
- slot


实战：

制作：

```
通用弹窗组件

+

角色详情组件
```