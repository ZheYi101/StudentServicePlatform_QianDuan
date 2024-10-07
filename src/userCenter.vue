<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'  //router
import { imformation } from '../src/main.vue';
import { ElButton } from 'element-plus';
import { postData, putData } from './function/axios';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const router = useRouter()
const res = ref(true)

const new_username = ref(null)
const new_name = ref(null)
const new_sex = ref(null)
const new_phone_num = ref(null)
const new_email = ref(null)
const password = ref(null)
const new_password = ref(null)
const reing = ref(false)
function re1() {
  clear()
  if(change1.value) {
    change1.value = false
    reing.value = true
  }else {
    change1.value = true
    reing.value = false
    }
    change2.value = true
    change3.value = true
    change4.value = true
    change5.value = true
}

function re2() {
  clear()
  if(change2.value) {
    change2.value = false
    reing.value = true
  }else {
    change2.value = true
    reing.value = false
    }
    change1.value = true
    change3.value = true
    change4.value = true    
    change5.value = true
}

function re3() {
  clear()
  if(change3.value) {
    change3.value = false
    reing.value = true
  }else {
    change3.value = true
    reing.value = false
    }
    change1.value = true
    change2.value = true
    change4.value = true
    change5.value = true
}

function re4() {
    clear()
  if(change4.value) {
    change4.value = false
    reing.value = true
  }else {
    change4.value = true
    reing.value = false
    }
    change1.value = true
    change2.value = true
    change3.value = true
    change5.value = true
}

function re5() {
  clear()
  if(change5.value) {
    change5.value = false
    reing.value = true
  }else {
    change5.value = true
    reing.value = false
    }
    change1.value = true
    change2.value = true
    change3.value = true
    change4.value = true
}
const change1 = ref(true)
const change2 = ref(true)
const change3 = ref(true)
const change4 = ref(true)
const change5 = ref(true)
function clear() {
  new_username.value = null
  new_name.value = null
  new_sex.value = null
  new_phone_num.value = null
  new_email.value = null
  password.value = null
  new_password.value = null
  reing.value = false
}
async function sub() {
  if(password.value === null) {
    ElMessage.error('请验证密码')
  }
  else {
    if(imformation.value.phone_num=="未设置") {
      imformation.value.phone_num = 1
    }
  try {
    new_username.value = Number(new_username.value)
    new_phone_num.value = Number(new_phone_num.value)
    const res = await putData('/api/user/update',{
      username: change1.value ? imformation.value.username : new_username.value,
      name: change2.value ? imformation.value.name : new_name.value,
      sex: change3.value ? imformation.value.sex : new_sex.value,
      phone_num: change4.value ? imformation.value.phone_num : new_phone_num.value,
      email: imformation.value.email,
      origin_password: password.value,
      new_password: change5.value ? password.value : new_password.value,
    });
    await login()
    console.log(res);
  if(res.code === 200) {
    ElMessage.success('修改成功');
    clear()
    change1.value = true
    change2.value = true
    change3.value = true
    change4.value = true
    change5.value = true
  } 
  else {
    ElMessage.error('修改失败:'+res.msg);
  }
} catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
  }
}

async function login() {
    try {
      const res = await postData('/api/user/login', {
        username: imformation.value.username,
        password: change5.value ? password.value : new_password.value,
      });
      console.log(res);
    if(res.code === 200) {
      imformation.value = res.data //获取用户信息
      if(imformation.value.sex == 0) {
       imformation.value.sex = '未设置'
      }
      if(imformation.value.phone_num == 0) {
        imformation.value.phone_num = '未设置'
      }
      localStorage.setItem("imf", JSON.stringify(imformation.value));
      console.log('重新获取成功');
    }}catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}

//图片上传相关代码
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('只支持上传jpg/png文件哦~')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('只允许上传2MB以内的图片')
    return false
  }
  return true
}
</script>
<template>
  <div class="user-center">
    <h1 style="font-size: 40px; display: flex ;justify-content: center">WELCOME TO CHECK YOUR INFORMATION</h1>
    <div class="img" >
      <h1>头像</h1>
        <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
    </div>
    <div class="information" >
      <div class="details">
        <h1>学号：</h1><h1 v-if="change1">{{ imformation.username }}</h1>
        <input type="text" v-else v-model="new_username" placeholder="请输入新的学号"/>
        <el-button type="primary" @click="re1()" v-if="change1"class="changeButton">修改</el-button>
        <el-button type="warning" @click="re1()"v-if="change1===false"class="changeButton">取消</el-button>
        <el-button type="success" @click="sub()" v-if="change1===false"class="changeButton">提交</el-button>
      </div>
      <div class="details">
      <h1>姓名：</h1><h1 v-if="change2">{{ imformation.name }}</h1>
      <input type="text" v-else v-model="new_name" placeholder="请输入新的姓名"/>
      <el-button type="primary" @click="re2()" v-if="change2"class="changeButton">修改</el-button>
      <el-button type="warning" @click="re2()"v-if="change2===false"class="changeButton">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change2===false"class="changeButton">提交</el-button>
      </div>
      <div class="details">
      <h1>性别：</h1><h1 v-if="change3"> {{ imformation.sex }} </h1>
      <input type="text" v-else v-model="new_sex" placeholder="请输入新的性别"/>
      <el-button type="primary" @click="re3()" v-if="change3"class="changeButton">修改</el-button>
    <el-button type="warning" @click="re3()"v-if="change3===false"class="changeButton">取消</el-button>
    <el-button type="success" @click="sub()" v-if="change3===false"class="changeButton">提交</el-button>
      </div>
      <div class="details">
      <h1>电话：</h1><h1 v-if="change4">{{ imformation.phone_num }}</h1>
      <input type="text" v-else v-model="new_phone_num" placeholder="请输入新的电话"/>
      <el-button type="primary" @click="re4()" v-if="change4"class="changeButton">修改</el-button>
      <el-button type="warning" @click="re4()"v-if="change4===false"class="changeButton">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change4===false"class="changeButton">提交</el-button>
      </div>
      <div class="details">
      <h1>密码：</h1><h1 v-if="change5">*******</h1>
      <input type="text" v-else v-model="new_phone_num" placeholder="请输入新的密码"/>
      <el-button type="primary" @click="re5()" v-if="change5"class="changeButton">修改</el-button>
      <el-button type="warning" @click="re5()"v-if="change5===false"class="changeButton">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change5===false"class="changeButton">提交</el-button>
      </div>
      <h1 v-if="reing"><br><br><br></h1>
      <div class="details">
        <h1 v-if="reing">请入输原密码</h1>
      <input type="text" v-if="reing" v-model="password" placeholder="请输入原密码"/>
      </div>
    </div>
    <h2>请确认无误后修改！！！</h2>
  </div>
</template>

<style scoped>

input {
  height: 30px;
  margin-right: 3vw;
}

.information {
  display: flex;
  margin-top: 1%;
  flex-direction: column;
  text-align: center;
}

.information h1 {
  font-size: 21px;
  text-align: start;
  margin-right: 15px;
}

.img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}

h1 {
  font-size: 30px;
  font-weight: bold;
}

.details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1%;
  margin-left: 40%;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 8vw;
  height: 13.6vh;
  text-align: center;
}

.user-center {
    margin-left: 10%;
    height: 90vh;
    width: 80%;
    background-color: #ffffff;
    overflow-y: auto;
}

.user-center h2 {
    color: rgb(253, 6, 6);
    font-size: 25px;
    text-align: center;
    margin-top: 10vh;
}
</style>