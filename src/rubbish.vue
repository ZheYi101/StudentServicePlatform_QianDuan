<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2,postData } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])

async function get() {
    try {
      console.log(imformation.value.user_id)
      const res = await getData2('/api/admin/superadmin',{
        admin_id: imformation.value.user_id
      });
      console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.post_list
    } 
    else {
        ElMessage.error('获取失败:'+res.msg);
    } 
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
get()

async function deal(post_id,approval) {
    try {
      const res = await postData('/api/admin/superadmin',{
        admin_id: imformation.value.user_id,
        post_id: post_id,
        approval: approval
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
    <v-for v-for="post in postList" :key="post.post_id" class="post">
        <h1>标题：{{ post.title }}</h1>
        <p>内容：{{ post.content }}</p>
        <p>反馈时间：{{ post.post_time }}</p>
        <p>回复时间：{{ post.update_time }}</p>
        <div class="按钮按钮按钮">
        <el-button type="danger" @click="deal(post.post_id,2)">爬</el-button>
        <el-button type="success"  @click="deal(post.post_id,1)">准了</el-button>
        </div>
        <br>
    </v-for>
</template>