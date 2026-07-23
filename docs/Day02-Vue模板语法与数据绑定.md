# Vue3 企业开发30天教程

# Day02：Vue模板语法与数据绑定


> 学习路线：
>
> Cocos Creator数据绑定
>
> ↓
>
> Vue模板系统
>
> ↓
>
> 企业后台列表页面


---

# 今日学习目标


完成今天学习后，你应该掌握：

- 插值表达式 {{ }}
- v-bind属性绑定
- v-on事件绑定
- v-if条件渲染
- v-for列表渲染
- class动态绑定
- 制作一个简单列表页面


今天结束：

你应该可以写：

```
角色列表

玩家列表

商品列表

用户列表
```

这样的基础页面。


---

# 一、Vue模板系统


Vue模板：

就是：

```
HTML

+

Vue指令

+

数据
```


例如：

```vue
<template>

<h1>
{{title}}
</h1>

</template>
```


Vue会把：

```ts
title
```


替换成真实数据。


---

# 二、插值表达式 {{ }}


## 2.1 基本使用


script：

```vue
<script setup lang="ts">

const name="战士"

</script>
```


template：

```vue
<template>

<h2>
角色名称：

{{name}}

</h2>

</template>
```


显示：

```
角色名称：战士
```


---

## 2.2 对象数据


实际项目中：

数据通常不是单个变量。


例如：


```ts
const role={

    name:"战士",

    level:10,

    job:"近战"

}
```


模板：

```vue
<h2>
角色：

{{role.name}}

</h2>


<p>
等级：

{{role.level}}

</p>


<p>
职业：

{{role.job}}

</p>
```


显示：

```
角色：战士

等级：10

职业：近战
```


---

# 三、v-bind 属性绑定


## 3.1 为什么需要v-bind？


普通HTML：

```html
<img src="xxx.png">
```


但是如果路径来自数据：


```ts
const avatar="hero.png"
```


不能：

```html
<img src="{{avatar}}">
```


Vue需要：

```vue
<img :src="avatar">
```


---

# 3.2 v-bind简写


完整：

```vue
v-bind:src
```


简写：

```vue
:src
```


例如：


```vue
<img :src="avatar">
```


等价：

```vue
<img v-bind:src="avatar">
```



---

# 四、动态class绑定


企业项目大量使用。


例如：

角色状态：

```ts
const online=true
```


模板：

```vue
<div
:class="{
online:online
}"
>

在线

</div>
```


如果：

```ts
online=true
```


生成：

```html
<div class="online">
```


---

游戏例子：


```ts
const hp=30
```


显示血量：


```vue
<div
:class="{
danger:hp<50
}"
>

HP:

{{hp}}

</div>
```


效果：

血量低于50：

显示危险样式。


---

# 五、v-on事件绑定


Vue监听事件：

使用：

```
v-on
```


简写：

```
@
```


---

例如：


按钮：

```vue
<button
@click="attack"
>

攻击

</button>
```


script：


```ts
function attack(){

    console.log("发动攻击")

}
```


点击：

执行：

```
attack()
```


---

# 六、事件传递参数


例如：

角色攻击。


template：

```vue
<button
@click="attack(role.name)"
>

攻击

</button>
```


script：

```ts
function attack(name:string){

    console.log(
        name+"攻击"
    )

}
```


输出：

```
战士攻击
```


---

# 七、v-if条件渲染


作用：

根据条件显示内容。


例如：

```ts
const online=true
```


模板：

```vue
<div v-if="online">

在线玩家

</div>
```


如果：

```
online=true
```

显示。


如果：

```
online=false
```

隐藏。


---

# 八、v-if / v-else


例如：

```vue
<div v-if="hp>0">

存活

</div>


<div v-else>

死亡

</div>
```


类似：

Cocos：

```ts
if(hp>0){

}

else{

}
```


---

# 九、v-show


区别：


v-if：

真正创建/销毁DOM


v-show：

只是隐藏显示


例如：

```vue
<div v-show="visible">

背包

</div>
```


企业项目：

弹窗经常使用。


---

# 十、v-for列表渲染


这是后台开发最重要的。


例如：

角色数组：


```ts
const roles=[

{
name:"战士",
level:10
},

{
name:"法师",
level:8
}

]
```


模板：

```vue
<div
v-for="role in roles"
>


{{role.name}}


</div>
```


显示：

```
战士

法师
```


---

# 十一、key的重要性


推荐写法：


```vue
<div
v-for="role in roles"
:key="role.name"
>

{{role.name}}

</div>
```


为什么？


Vue更新列表时：

通过key判断：

```
哪个元素变化

哪个元素新增

哪个元素删除
```


类似：

Cocos：

Node唯一ID。


---

# 十二、综合案例：角色列表


创建：

```
RoleList.vue
```


代码：

```vue
<template>


<div>


<h2>
角色列表
</h2>


<div
v-for="role in roles"
:key="role.name"
>


<h3>

{{role.name}}

</h3>


<p>

等级：

{{role.level}}

</p>


<p>

职业：

{{role.job}}

</p>


<button
@click="selectRole(role)"
>

选择

</button>


</div>


</div>


</template>



<script setup lang="ts">


const roles=[

{
name:"战士",
level:10,
job:"近战"
},

{
name:"法师",
level:8,
job:"远程"
},

{
name:"射手",
level:9,
job:"物理"
}

]



function selectRole(role:any){

console.log(
"选择角色:",
role.name
)

}


</script>
```


---

# 十三、接入App.vue


修改：

```vue
<template>

<RoleList/>

</template>


<script setup lang="ts">


import RoleList from "./components/RoleList.vue"


</script>
```


效果：


```
角色列表


战士

等级10

职业近战


法师

等级8

职业远程


射手

等级9

职业物理

```


---

# 十四、今天练习


## 练习1：背包系统


创建：

```
Bag.vue
```


数据：

```ts
const items=[

{
name:"木剑",
level:1
},

{
name:"铁剑",
level:5
}

]
```


要求：


显示：

```
背包


木剑

等级1


铁剑

等级5

```



---

## 练习2：装备状态


增加字段：


```ts
equipped:true
```


如果装备：

显示：

```
已装备
```


否则：

显示：

```
未装备
```


要求：

使用：

```
v-if
```



---

## 练习3：攻击按钮


增加：


```
攻击
```


点击：

控制台输出：


```
战士发动攻击
```



---

# 十五、芋道源码关联


今天内容对应芋道大量代码。


重点观察：


```
src/views/system/user
```


你会看到：

类似：


```vue
<el-table

:data="list"

>
```


本质：

就是：

```
v-for循环数据

↓

生成列表
```



例如：


```vue
{{user.nickname}}
```


就是：

今天学习的：

```
插值表达式
```



---

# 十六、今日验收


你应该可以回答：


## 1

Vue显示变量使用什么？


答案：

```
{{}}
```


---

## 2

绑定属性使用什么？


答案：

```
:
```


例如：

```vue
<img :src="url">
```


---

## 3

点击事件使用什么？


答案：

```
@
```


例如：

```vue
@click
```


---

## 4

循环列表使用什么？


答案：

```
v-for
```


---

# 十七、今日总结


今天掌握：

```
数据

↓

template

↓

页面
```


Vue模板核心：

```
{{}}

:

@

v-if

v-for
```


这些是：

以后阅读芋道页面源码的基础。


---

# Day03预告


主题：

# Vue响应式系统


学习：

- ref
- reactive
- computed
- watch
- watchEffect


实战：

制作：

```
玩家属性面板

HP自动变化

等级提升

战斗力计算
```