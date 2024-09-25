import { createRouter, createWebHistory,createWebHashHistory,useRouter } from 'vue-router';
const routes = [
  {
    path: "/",
    name:"login",
    component: () => import('../loginPage.vue'),
    meta: {
      title: "登录",
    }
  },
  {
    path: "/main",
    name:"main",
    component: () => import('../main.vue'),
    meta: {
      title: "主页面",
    }
  },
  {
    path: "/admin",
    name:"admin",
    component: () => import('../admin.vue'),
    meta: {
      title: "管理员页面",
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;