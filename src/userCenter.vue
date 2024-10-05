<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  //router
import { imformation } from '../src/main.vue';
import { ElButton } from 'element-plus';
import { putData } from './function/axios';
import { ElMessage } from 'element-plus';
const router = useRouter()
const res = ref(true)

const new_username = ref(null)
const new_name = ref(null)
const new_sex = ref(null)
const new_phone_num = ref(null)
const new_email = ref(null)
function re1() {
  if(change1.value) {
    change1.value = false
  }else {
    change1.value = true
    }
    change2.value = true
    change3.value = true
    change4.value = true
    change5.value = true
}

function re2() {
  if(change2.value) {
    change2.value = false
  }else {
    change2.value = true
    }
    change3.value = true
    change4.value = true    
    change5.value = true
}

function re3() {
  if(change3.value) {
    change3.value = false
  }else {
    change3.value = true
    }
    change1.value = true
    change2.value = true
    change4.value = true
    change5.value = true
}

function re4() {
  if(change4.value) {
    change4.value = false
  }else {
    change4.value = true
    }
    change1.value = true
    change2.value = true
    change3.value = true
    change5.value = true
}

function re5() {
  if(change5.value) {
    change5.value = false
  }else {
    change5.value = true
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
async function sub() {
  try {
    new_username.value = Number(new_username.value)
    new_phone_num.value = Number(new_phone_num.value)
    const res = await putData('/api/user/update',{
      user_id: imformation.value.user_id,
      username: change1.value ? imformation.value.username : new_username.value,
      name: change2.value ? imformation.value.name : new_name.value,
      sex: change3.value ? imformation.value.sex : new_sex.value,
      phone_num: change4.value ? imformation.value.phone_num : new_phone_num.value,
      email: change5.value ? imformation.value.email : new_email.value
    });
    console.log(res);
  if(res.code === 200) {
    ElMessage.success('修改成功');
  } 
  else {
    ElMessage.error('修改失败:'+res.msg);
  }
} catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
</script>
<template>
  <div class="user-center">
    <h1 style="font-size: 40px; display: flex ;justify-content: center">WELCOME TO CHECK YOUR INFORMATION</h1>
    <div class="img" >
      <h1>头像</h1>
    </div>
    <div class="information" >
      <div class="details">
        <h1>学号：</h1><h1 v-if="change1">{{ imformation.username }}</h1>
        <input type="text" v-else v-model="new_username" placeholder="请输入新的学号"/>
        <el-button type="primary" @click="re1()" v-if="change1">修改</el-button>
        <el-button type="warning" @click="re1()"v-if="change1===false">取消</el-button>
        <el-button type="success" @click="sub()" v-if="change1===false">提交</el-button>
      </div>
      <div class="details">
      <h1>姓名：</h1><h1 v-if="change2">{{ imformation.name }}</h1>
      <input type="text" v-else v-model="new_name" placeholder="请输入新的姓名"/>
      <el-button type="primary" @click="re2()" v-if="change2">修改</el-button>
      <el-button type="warning" @click="re2()"v-if="change2===false">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change2===false">提交</el-button>
      </div>
      <div class="details">
      <h1>性别：</h1><h1 v-if="change3"> {{ imformation.sex }} </h1>
      <input type="text" v-else v-model="new_sex" placeholder="请输入新的性别"/>
      <el-button type="primary" @click="re3()" v-if="change3">修改</el-button>
    <el-button type="warning" @click="re3()"v-if="change3===false">取消</el-button>
    <el-button type="success" @click="sub()" v-if="change3===false">提交</el-button>
      </div>
      <div class="details">
      <h1>电话：</h1><h1 v-if="change4">{{ imformation.phone_num }}</h1>
      <input type="text" v-else v-model="new_phone_num" placeholder="请输入新的电话"/>
      <el-button type="primary" @click="re4()" v-if="change4">修改</el-button>
      <el-button type="warning" @click="re4()"v-if="change4===false">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change4===false">提交</el-button>
      </div>
      <div class="details">
      <h1>邮箱：</h1><h1 v-if="change5">{{ imformation.email }}</h1>
      <input type="text" v-else v-model="new_email" placeholder="请输入新的邮箱"/>
      <el-button type="primary" @click="re5()" v-if="change5">修改</el-button>
      <el-button type="warning" @click="re5()"v-if="change5===false">取消</el-button>
      <el-button type="success" @click="sub()" v-if="change5===false">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.information {
  display: flex;
  margin-top: 1%;
  flex-direction: column;
  text-align: center;
}

.information h1 {
  font-size: 21px;
}

.img {
  display: flex;
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
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}
</style>