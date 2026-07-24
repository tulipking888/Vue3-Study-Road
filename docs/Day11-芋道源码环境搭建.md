# Day11 芋道源码环境搭建


> Vue3企业开发学习路线 Day11
>
> 目标：
>
> 成功运行 yudao-ui-admin-vue3，并掌握企业Vue项目源码阅读方式。


---

# 一、今日学习目标


今天完成：

- 获取芋道前端源码
- 安装依赖
- 启动项目
- 了解项目配置
- 理解开发环境组成


最终达到：


```
能够打开芋道后台

能够定位源码文件

能够开始阅读业务代码

```


对应项目：

```
yudao-ui-admin-vue3

```


---

# 二、为什么从Day11开始学习芋道源码


前10天：

学习：

```
Vue3

TypeScript

Router

Pinia

Axios

Element Plus

```


这些是：

Vue开发基础。


但是企业项目：

不是一个.vue文件。


而是：


```
Vue

+

工程体系

+

业务规范

+

接口体系

```


所以现在进入：

真实项目。


---

# 三、芋道前端项目介绍


项目：

```
yudao-ui-admin-vue3

```


技术栈：


```
Vue3

TypeScript

Vite

Element Plus

Pinia

Vue Router

Axios

SCSS

```


与你学习路线完全匹配。


---

# 四、准备环境


## Node版本


建议：

```
Node >=18

```


查看：

```bash
node -v
```


例如：

```
v20.x.x

```


---

## npm


查看：

```bash
npm -v
```


---

## Git


查看：

```bash
git --version
```


---

# 五、获取源码


例如：


```bash
git clone https://gitee.com/yudaocode/yudao-ui-admin-vue3.git
```


进入目录：


```bash
cd yudao-ui-admin-vue3
```


---

# 六、安装依赖


执行：

```bash
npm install
```


或者：


```bash
npm i
```


等待完成。


---

# 七、启动项目


执行：

```bash
npm run dev
```


正常：


看到：


```
Local:

http://localhost:5173/

```


打开浏览器。


---

# 八、如果启动失败排查


## 问题1：node版本过低


错误：

```
Unsupported engine

```


解决：

升级Node。


---

## 问题2：依赖安装失败


删除：


```
node_modules

package-lock.json

```


重新：


```bash
npm install

```


---

## 问题3：端口占用


错误：

```
Port 5173 is already in use

```


修改：

```
vite.config.ts

```


或者关闭旧进程。


---

# 九、认识芋道目录


打开：

```
src

```


结构：


```
src


├ api

├ assets

├ components

├ directives

├ layouts

├ locales

├ plugins

├ router

├ store

├ utils

├ views

├ App.vue

└ main.ts

```


---

# 十、main.ts源码分析


打开：

```
src/main.ts

```


一般结构：


```ts
import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'


const app=createApp(App)


app.use(router)

app.use(createPinia())


app.mount('#app')
```


作用：


```
创建Vue应用

↓

注册插件

↓

挂载页面

```


---

# 十一、App.vue作用


打开：


```
src/App.vue

```


通常：


```vue
<template>

<RouterView />

</template>
```


含义：


路由页面显示区域。


流程：


```
浏览器地址

↓

Router

↓

页面组件

↓

RouterView显示

```


---

# 十二、配置文件认识


## vite.config.ts


作用：

Vite配置。


包含：


- 代理
- 插件
- 打包配置


例如：


```ts
server:{


proxy:{


'/api':{


target:'http://localhost:48080'


}


}

}

```


---

## tsconfig.json


TypeScript配置。


控制：

- 类型检查
- 路径


---

## package.json


项目说明。


查看：


```
scripts

dependencies

devDependencies

```


---

# 十三、第一次源码阅读方法


不要一打开源码就全部看。


企业项目建议：


按照流程：


```
启动入口

↓

路由

↓

登录

↓

权限

↓

业务页面

```


---

# 十四、芋道源码阅读路线


后续顺序：


## 第一步


main.ts


了解：

项目怎么启动。


---

## 第二步


router


了解：

页面怎么跳转。


---

## 第三步


login


了解：

用户怎么登录。


---

## 第四步


store


了解：

用户数据怎么保存。


---

## 第五步


permission


了解：

权限怎么控制。


---

# 十五、今天实战任务


## 任务1


成功启动：

```
yudao-ui-admin-vue3

```


---

## 任务2


找到：


```
src/main.ts

```


回答：

项目启动做了哪些事情？


---

## 任务3


找到：


```
src/router

```


查看：

有哪些路由。


---

## 任务4


找到：

```
src/views/Login.vue

```


先不要深入。


只观察：

页面结构。


---

# 十六、建立源码笔记


建议建立：


```
芋道源码阅读笔记.md

```


记录：


例如：


```
main.ts

项目入口


router

页面管理


store

状态管理


views

业务页面

```


---

# 十七、和Cocos Creator对比理解


## main.ts


类似：

Cocos启动流程。


```
游戏启动

↓

初始化Manager

↓

进入主场景

```


Vue：

```
main.ts

↓

注册插件

↓

进入App

```


---

## Router


类似：

场景管理。


```
Login场景

↓

Hall场景

```


Vue：

```
Login页面

↓

Home页面

```


---

## Store


类似：

全局Manager。


例如：

```
UserManager

GameManager

ConfigManager

```


Vue：

```
Pinia Store

```


---

# 十八、常见问题


## 问题1：为什么启动后页面空白？


检查：


```
控制台错误

Network请求

.env配置

```


---

## 问题2：为什么接口请求失败？


因为：

前端默认连接后端。


需要：

启动：

```
yudao-server

```


或者：

使用Mock。


---

## 问题3：一定要启动后端吗？


分阶段：


Day11-Day15：

可以先阅读源码。


部分功能：

需要Mock。


Day16以后：

建议启动完整后端。


---

# 十九、完成验收标准


完成今天：


## 必须做到


✅ 芋道前端启动成功


✅ 能找到main.ts


✅ 能找到router


✅ 能找到Login.vue


✅ 知道views/api/store关系


---

# 二十、今日总结


今天完成：


```
Vue学习项目

↓

真实企业项目

↓

芋道源码环境

```


核心思想：


```
先建立地图

再阅读代码

```


不要一开始陷入细节。


下一章：

Day12 登录流程源码分析


学习：

```
输入账号密码

↓

调用接口

↓

保存Token

↓

进入后台首页

```

这是真正企业后台的第一条业务链。
