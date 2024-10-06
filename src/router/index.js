import { createRouter, createWebHistory,createWebHashHistory,useRouter } from 'vue-router';
import Main from '../main.vue';
import IndexView from '../IndexView.vue';
import UserCenter from '../userCenter.vue';
import postProblem from '../postProblem.vue';
import problemProcess from '../problemProcess.vue';
import checkProblem from '../checkProblem.vue';
import manageUser from '../manageUser.vue';
import YourCheck from '../YourCheck.vue';
import Rubbish from '../rubbish.vue';

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
    meta: {
      title: "主页",
    },
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
      },
      {
        path: 'postProblem',
        component: postProblem,
        name: "postProblem",
      },
      {
        path: 'problemProcess',
        component: problemProcess,
        name: "problemProcess",
      },
      {
        path: 'checkProblem',
        component: checkProblem,
        name: "checkProblem",
      },
      {
        path: 'manageUser',
        component: manageUser,
        name: "manageUser",
      },
      {
        path: 'YourCheck',
        component: YourCheck,
        name: "YourCheck",
      },
      {
        path: 'rubbish',
        component: Rubbish,
        name: "rubbish",
      },
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
  document.body.style= '';
  next();
});
export default router;