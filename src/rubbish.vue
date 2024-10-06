<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2 } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])

async function get() {
    try {
      const res = await getData2('/api/admin/superadmin',{
        admin_id: imformation.value.user_id
      });
      console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.post_list
    } 
    else {
        console.log(res.msg);
    } 
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
get()
</script>
<template>
    <v-for v-for="post in postList" :key="post.post_id" class="post">
        <h1>标题：{{ post.title }}</h1>
        <p>内容：{{ post.content }}</p>
        <p>反馈时间：{{ post.post_time }}</p>
        <p>回复时间：{{ post.response_time }}</p>
        <p>回复评分：{{ post.response_rating }}</p>
        <div class="我不知道">
          <!-- 搞个单选 勾了就是垃圾信息 没勾就正常信息 -->
        </div>
        <el-button type="danger">撤销</el-button>
    </v-for>
</template>