<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'  //router
import { postData } from './function/axios';

//登录用的变量
const EmailLog = ref('')
const PasswordLog = ref('')
//注册用的变量
const EmailReg = ref('')
const PasswordReg = ref('')
const PasswordReg_ = ref('')
const username = ref('') //学号
const sex = ref("男") //性别
const phone_num = ref('114514') //手机号

//以下为页面布局相关变量
const preRef = ref('')
const imgList = ref([
  new URL('/fufffh.jpg', import.meta.url).href,
  new URL('/pink_fufffh.jpg', import.meta.url).href
])
let flag = ref(true)
const mySwitch = () => {
    if(flag.value) {
        preRef.value.style.background = '#c9e0ed'
        preRef.value.style.transform = 'translateX(100%)'
    }else {
        preRef.value.style.background = '#edd4dc'
        preRef.value.style.transform = 'translateX(0%)'
    }
    flag.value = !flag.value
    clear()
}

function clear() {
    EmailLog.value = ''
    PasswordLog.value = ''
    EmailReg.value = ''
    PasswordReg.value = ''
    PasswordReg_.value = ''
    username.value = ''
    sex.value = ''
    phone_num.value = ''
}
function login() {
    if(EmailLog.value === '' || PasswordLog.value === '') {
        alert('请输入您的账号和密码') 
        //这里大概就是提示下要输入 alert比较丑 但是我也不知道用啥 建议调一下
    }
    else {
        console.log('登录成功')
        postData('/api/user/login', {
            username: EmailLog.value,
            password: PasswordLog.value
        })
    }
}

function register() { //注册函数
    if(EmailReg.value === '' || PasswordReg.value === '' || PasswordReg_.value === '') {
        alert('请输入您的账号和密码')   //这些 alert都用elmUI 优化下 但是我不会
    }
    else if(PasswordReg.value !== PasswordReg_.value) {
        alert('两次输入的密码不一致')
    }
    else {
        console.log('注册成功')
        postData('/api/user/register', {
            email: EmailReg.value, //邮箱
            password: PasswordReg.value, //密码
            username: username.value, //学号
            sex: "男", //性别
            phone_num: phone_num.value, //手机号
            user_type: 1,
            name: "折乙"
        })
    }
}
</script>

<template>
<div class="bigBody">
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
                <input v-model="PasswordReg" type="password" placeholder="请输入您的密码" show-password/>
                <input v-model="PasswordReg_" type="password" placeholder="请再次确认您的密码" show-password/>
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
                <input v-model="EmailLog" placeholder="请输入您的邮箱" clearable/>
                <input v-model="PasswordLog" type="password" placeholder="请输入您的密码" show-password/>
            </div>
            <div class="buttonForm">
                <el-button type="success">登录</el-button>
                <p>没有账号？去<span><button class="loginRegisterButton" @click="mySwitch">注册</button></span></p>
            </div>  
        </div>
    </div>
</div>
</template>

<style>

body {
    display: flex;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right,pink,skyblue);
    overflow-x: hidden;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.bigBody {
    height: 100vh;
    width: 73vw;
    display: flex;
    justify-content: center;
} 

.loginRegisterMain {
    width: 1050px;
    height: 600px;
    display: flex;
    justify-content: center;
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
    background-color: #edd4dc;
    box-shadow: 4px 4px 3px rgba(0,0,0,.1);
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
    flex: 1;
    height: 100%;
}

.loginRegisterButton {
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
    height: 300px;
    line-height: 500px;
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