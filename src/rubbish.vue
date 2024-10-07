<template>
  <div v-for="post in postList" :key="post.post_id" class="post">
      <h1 style="text-align: center;">标题：{{ post.title }}</h1>
      <p>内容：{{ post.content }}</p>
      <p>回复时间：{{ formatDate(post.update_time) }}</p>
      <div class="按钮按钮按钮">
      <el-button type="danger" @click="deal(post.post_id,2)">给朕爬</el-button>
      <el-button type="success"  @click="deal(post.post_id,1)">朕准了</el-button>
      <p style="text-align: end;">反馈时间：{{ formatDate(post.post_time) }}</p>
      </div>
      <br>
  </div>
</template>

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

// 添加一个方法来格式化日期
const formatDate = (dateString) => {
const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
return new Date(dateString).toLocaleString('zh-CN', options).replace(/(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}):\d{2}/, '$1 $2');
}
</script>

<style scoped>

.post {
    padding: 10px;
    padding-right: 20px;
    margin-bottom: 25px;
    margin-right: 15px;
    padding-bottom: 10px; /* 增加底部内边距 */
    border-bottom: 1px solid #e0e0e0; /* 添加下边框 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    background: #ffffff;
}

</style>