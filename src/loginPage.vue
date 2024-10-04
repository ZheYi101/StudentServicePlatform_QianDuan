<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from './function/axios';
const router = useRouter()
import { ElMessage } from 'element-plus';

const PasswordLog = ref('')
const usernameLog = ref('')

const EmailReg = ref('')
const emailError = ref('')
watch(EmailReg, () => {
  if (!EmailReg.value || EmailReg.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
    emailError.value = '';
  } else {
    emailError.value = '请输入正确的邮箱格式';
  }
})

const PasswordReg = ref('')
const PasswordReg_ = ref('')
const usernameReg = ref('')
const name = ref('')

const preRef = ref('')
const imgList = ref([
  new URL('/fufffh.jpg', import.meta.url).href,
  new URL('/pink_fufffh.jpg', import.meta.url).href
])
let flag = ref(true)

const mySwitch = () => {
  if (flag.value) {
    preRef.value.style.background = '#d3d3d3'
    preRef.value.style.transform = 'translateX(100%)'
  } else {
    preRef.value.style.background = '#b4b2b2'
    preRef.value.style.transform = 'translateX(0%)'
  }
  flag.value = !flag.value
  clear()
}

function clear() {
  PasswordLog.value = ''
  EmailReg.value = ''
  PasswordReg.value = ''
  PasswordReg_.value = ''
  usernameReg.value = ''
  name.value = ''
  usernameLog.value = ''
  usernameReg.value = ''
}
async function login() {
    if(usernameLog.value === '' || PasswordLog.value === '') {
        ElMessage.error('请输入您的账号和密码！') 
        //这里大概就是提示下要输入 alert比较丑 但是我也不知道用啥 建议调一下
    }
    else {
        try {
      const res = await postData('/api/user/login', {
        username: usernameLog.value,
        password: PasswordLog.value
      });
      console.log(res);
    if(res.code === 200) {
        ElMessage.success('登录成功');
      router.push('/main');
    } 
    else {
      if(res.msg === '密码错误') {
        ElMessage.error('密码错误');
      }
      else if(res.msg === "该用户不存在") {
        ElMessage.error('用户不存在');
      }
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
}

async function register() { //注册函数
    if(EmailReg.value === '' || PasswordReg.value === '' || PasswordReg_.value === '' || usernameReg.value === '' || name.value === '') {
        ElMessage.error('请输入完整信息！')   //这些 alert都用elmUI 优化下 但是我不会
    }
    else if(PasswordReg.value !== PasswordReg_.value) {
        ElMessage.error('两次输入的密码不一致！')
    }
    else if(PasswordReg.value.length<8) {
        ElMessage.error('密码长度不能小于8位!')
    }
    else {
        try {
        const res = await postData('/api/user/register', {
            email: EmailReg.value, //邮箱
            password: PasswordReg.value, //密码
            username: usernameReg.value, //学号
            name: name.value, //姓名
        });
        console.log(res);
        if(res.code===200) {
            console.log(res.msg)
            ElMessage.success('注册成功: 请登入~')
            clear()
            mySwitch()
        }
        else {
            ElMessage.error('注册失败: '+res.msg)
        }
    } catch (err) {
        console.log(err);
        ElMessage.error('后端爆啦');
    }
}
}

</script>

<template>
<div class="bigBody">
  <div class="topText">
    <h1 style="font-size: 20px;justify-content: center;display: flex;color: whitesmoke;">主创：黄星晓 王昌翔 付鹏汇 张紫涵</h1>
  </div>
  <div class="loginRegisterMain">
    <div class="prePage" ref="preRef">
      <h1>Welcome To Join Us</h1>
      <div class="preImg">
        <img :src="flag == true ? imgList[0] : imgList[1]">
      </div>
    </div>
    <div class="registerForm"> 
      <div class="titleForm">
        <h1>注册</h1>
      </div>
      <div class="inputForm">
        <input v-model="EmailReg" placeholder="请输入您的邮箱" clearable/>
        <p v-if="emailError" style="color: red; margin-top:0px">{{ emailError }}</p>
        <input v-model="usernameReg" type="number" placeholder="请输入您的账号（学号）" clearable/>
        <input v-model="name" placeholder="请输入您的姓名" clearable/>
        <input v-model="PasswordReg" type="password" placeholder="请输入您想设置的密码" show-password/>
        <input v-model="PasswordReg_" type="password" placeholder="请确认您的密码" show-password/>
      </div>
      <div class="buttonForm">
        <el-button type="warning" @click="register()">注册</el-button>
        <p>已有账号？去<span><button class="loginRegisterButton" @click="mySwitch">登录</button></span></p>
      </div>
    </div>
    <div class="loginForm"> 
      <div class="titleForm">
        <h1>登录</h1>
      </div>
      <div class="inputForm">
        <input v-model="usernameLog" type="number" placeholder="请输入您的账号（学号）" clearable/>
        <input v-model="PasswordLog" type="password" placeholder="请输入您的密码" show-password/>
      </div>
      <div class="buttonForm">
        <el-button type="success" @click="login()">登录</el-button>
        <p>没有账号？去<span><button class="loginRegisterButton" @click="mySwitch">注册</button></span></p>
      </div>  
    </div>
  </div>
</div>
</template>

<style>
html,body {
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    background: linear-gradient(to right,gray,white);
    overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.bigBody {
    height: 100vh;
    width: 100vw;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
} 

.loginRegisterMain {
    width: 100%;
    max-width: 1050px;
    height: 600px;
    display: flex;
    position: relative;
    margin: auto;
    border-radius: 4vh;
    border: 1px solid rgba(255, 255, 255, .6);
    box-shadow: 4px 4px 3px rgba(0,0,0,.1);
}

.prePage {
    width: calc(1050px / 2);
    left: 0;
    top: 0;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    background-color: #b4b2b2;
    box-shadow: 4px 4px 3px rgba(0,0,0,.1);
    border-radius: 4vh;
    transition: 0.5s ease-in-out;
}

.prePage h1 {
    margin-top: 150px;
    text-align: center;
    color: white;
    font-size: 40px;
    letter-spacing: 5px;
    text-shadow: 4px 4px 3px rgba(0,0,0,.1);
}

.preImg {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 4px 4px 3px rgba(0,0,0,.1);
}

.preImg img {
    width: 100%;

}

.loginForm,.registerForm {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.loginRegisterButton {
    flex-grow: 1;
    border: none; 
    outline: none; 
    background-color: transparent;
    text-decoration: underline;
}

.loginRegisterButton:hover {
    text-decoration: none; 
    color: #333; 
    cursor: pointer; 
}

.titleForm {
    flex-grow: 1;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.titleForm h1 {
    text-align: center;
    font-size: 40px;
    color: white;
    letter-spacing: 5px;
}

.inputForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
}

input {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
    text-indent: 4px;
    border: 1px solid #b0cfe9;
    border-radius: 4px;
}

.buttonForm {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

.el-button {
    width: 100px;
    height: 30px;
    margin: 0 7px;
}

input:focus {
    color: #b0cfe9;
}

input:focus::placeholder {
    opacity: 0;
}

.el-button:hover {
    cursor: pointer;
    opacity: .8;
}

.buttonForm p {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}

</style>