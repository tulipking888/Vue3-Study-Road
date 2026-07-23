import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Role from "../views/Role.vue";
//配置Router
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/home",
            component:Home
        },
        // {
        //     path:"/role",
        //     component:Role
        // },
        {
            path:"/role/:id",
            component:Role
        }
    ]
})

export default router