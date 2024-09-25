<script setup>
import {ref} from 'vue'
//登录用的变量
const EmailLog = ref('')
const PasswordLog = ref('')
//注册用的变量
const EmailReg = ref('')
const PasswordReg = ref('')
const PasswordReg_ = ref('')

function login() {
    if(EmailLog.value === '' || PasswordLog.value === '') {
        alert('请输入您的账号和密码') 
        //这里大概就是提示下要输入 alert比较丑 但是我也不知道用啥 建议调一下
    }
    else {
        console.log('登录成功')
        // log() 待写的log()函数 需要等后端有的接
    }
}

function register() {
    if(EmailReg.value === '' || PasswordReg.value === '' || PasswordReg_.value === '') {
        alert('请输入您的账号和密码')   //这些 alert都用elmUI 优化下 但是我不会
    }
    else if(PasswordReg.value !== PasswordReg_.value) {
        alert('两次输入的密码不一致')
    }
    else {
        console.log('注册成功')
        // reg() 待写的reg()函数 需要等后端有的接
    }
}
</script>

<template>
    
    <div class="loginRegister">
        <div class="prePage">
            <h1 style="text-align: center;">Welcome To Join Us</h1>
            <div class="imgFirst"><br><br>
                <img src="\B35E51A41E567E63A82AAD8C53964277.png" class="loginRegisterImg">
            </div>
        </div>
        <div class="loginPage">
            <el-text style="font-size: 3vw;">登录 Login</el-text>
            <el-input  v-model="EmailLog" style="width: 16vw" placeholder="请输入您的账号（邮箱）" clearable/><br>
            <el-input  v-model="PasswordLog" style="width: 16vw" type="password" placeholder="请输入您的密码" show-password clearable/>
            <div><br>
                <el-button type="success" round class="finishButton">登录</el-button>
                没有账号？去<button class="registerButton">注册</button>
            </div>
        </div>

        <div class="registerPage">
        <el-text style="font-size: 3vw;">注册 Register</el-text>
        <el-input v-model="EmailReg" style="width: 16vw" placeholder="请输入您的邮箱" clearable/><br>
        <el-input v-model="PasswordReg" style="width: 16vw" type="password" placeholder="请输入您的密码" show-password clearable/><br>
        <el-input v-model="PasswordReg_" style="width: 16vw" type="password" placeholder="请确认您的密码（确保两次输入密码一致）" show-password clearable/> 
        <div><br>
            <el-button type="warning" round class="finishButton">注册</el-button>
            已有账号？去<button class="loginButton">登录</button></div>
        </div> 

    </div>
</template>

<style>

body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right,pink,skyblue);
}

.registerButton {
  text-decoration: underline;
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline
}
.loginButton {
  text-decoration: underline;
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline
}

.prePage {
    position: absolute;
    z-index: 2;
}

.loginRegisterImg {
    width: 50%;
    height: auto;
}

.loginRegister {
    background: white;
    display: flex;
    justify-content: space-around;
    width: 45vw;
    height: 65vh;
    border-radius: 12%;
    border: 1% solid rgba(red, green, blue, alpha);
    box-shadow: 4% 4% 3% rgba(0,0,0,.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.loginPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
}

.registerPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
}

.finishButton {
    width: 12vh;
}

</style>