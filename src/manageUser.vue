<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2,putData } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])

async function get() {
  try {
    const res = await getData2('/api/admin/superadmin/queryadmin', {
      admin_id: imformation.value.user_id
    });
    if (res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.user_list;
      console.log(postList.value);
    } else {
      console.log(res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
get()

async function rev(user_id,user_type) {
  try {
    const res = await putData('/api/admin/superadmin', {
      admin_id: imformation.value.user_id,
      user_id: user_id,
      user_type: user_type
    });
    await get();
    if (res.code === 200) {
      ElMessage.success('操作成功');
    } else {
      console.log(res.msg);
      ElMessage.error('操作失败:' + res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
</script>
<template>
<div>
    <h1 style="font-size: 3vw; text-align: center;">人员权限管理</h1>
    <div class="total">
    <div v-for="post in postList" :key="post.user_id" class="post">
        <h1>{{ post.name }}——{{ post.username }}</h1>
        <p>性别：{{ post.sex }}</p>
        <p>电话：{{ post.phone_num }}</p>
        <p>邮箱：{{ post.email }}</p>
        <p>管理员：<span v-if="post.user_type===1">是</span><span v-else-if="post.user_type===2">超管</span><span v-else>否</span></p>
        <p>操作：
            <el-button type="danger" v-if="post.user_type===1" @click="rev(post.user_id,0)">降职</el-button>
            <el-button type="warning" v-else-if="post.user_type===2">无法操作</el-button>
            <el-button type="success" v-else @click="rev(post.user_id,1)">升官</el-button>
        </p>
    </div></div>
</div>
</template>

<style scoped>

.post {
  width: 50vw;
  background: #ffffff;
  display:flex;
  flex-direction: column;
  margin-left: 20vw;
}

.post h1 {
  text-align: center;
  font-size: 25px;
}
</style>