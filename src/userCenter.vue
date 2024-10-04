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
    <div class="information" >
<!-- 目前还没写具体的功能 如果要改的话你也可以把这些html的全都删了重写 但是imformation的值就是这六个
我打算把修改功能做成 每一个信息右边都有一个 "修改" 按钮 按了就会把当前这一个信息从显示值变为输入框 -->
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

</style>