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
  {
    path:"/userCenter",
    name:"/userCenter",
    component: () => import('../userCenter.vue'),
    meta: {
      title: "个人中心",
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
});
export default router;