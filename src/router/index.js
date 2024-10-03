import { createRouter, createWebHistory,createWebHashHistory,useRouter } from 'vue-router';
import Main from '../main.vue';
import IndexView from '../IndexView.vue';
import UserCenter from '../userCenter.vue';

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
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        path: '',
        component: IndexView,
        name: 'indexView' 
      },
      {
        path: 'userCenter',
        component: UserCenter,
        name: "userCenter",
      }
    ],
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