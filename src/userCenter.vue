<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'  //router
import { imformation } from '../src/main.vue';
import { ElButton } from 'element-plus';
const router = useRouter()
const res = ref(true)
function re() {
  if(res.value) {
    res.value = false
  }
  else {
    res.value = true
  }
}

function sub() {
  re()
}
</script>
<template>
  <div class="user-center">
    <h1 style="font-size: 40px; display: flex ;justify-content: center">WELCOME TO CHECK YOUR INFORMATION</h1>
    <div class="img" >
      <h1>头像</h1>
    </div>
    <div class="information" >
      <h1>学号：{{ imformation.username }}</h1>
      <h1>姓名：{{ imformation.name }}</h1>
      <h1>性别： {{ imformation.sex }} </h1>
      <h1>电话号码：{{ imformation.phone_num }}</h1>
      <h1>邮箱：{{ imformation.email }}</h1>
    </div>
    <el-button type="primary" @click="re()" v-if="res">修改信息</el-button>
    <el-button type="warning" @click="sub()"v-if="res===false">取消</el-button>
    <el-button type="success" @click="sub()" v-if="res===false">提交</el-button>
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
</style>