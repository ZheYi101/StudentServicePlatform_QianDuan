<script setup lang="ts">
import { imformation } from '../src/main.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { delData2, getData2,putData } from './function/axios';
const res = ref(true)
const postList = ref([])
const respon = ref("null")  //处理内容
async function get() {
    try {
      const res = await getData2('/api/admin/handlepost/getall',{
        admin_id: imformation.value.user_id
      });
      console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data
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

async function re(post_id) {
    try {
      const res = await delData2('/api/admin/handlepost',{
        admin_id: imformation.value.user_id,
        post_id: post_id,
      });
      await get()
    if(res.code === 200) {
      ElMessage.success('撤销成功');
    } 
    else {
      ElMessage.error('撤销失败:'+res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}

async function rewrite(post_id) {
  if(respon.value === null) {
    ElMessage.error('请输入处理内容')
  }
  else {
    try {
      const res = await putData('/api/admin/handlepost',{
        admin_id: imformation.value.user_id,
        post_id: post_id,
        response: respon.value
      });
      await get()
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
}
</script>
<template>
    你的接单
    <div v-for="post in postList" :key="post.post_id" class="post">
        <h1>标题：{{ post.title }}</h1>
        <p>内容：{{ post.content }}</p>
        <p>反馈时间：{{ post.post_time }}</p>
        <p>回复时间：{{ post.response_time }}</p>
        <p>回复评分：{{ post.response_rating }}</p>
        <div class="我不知道">
        </div>
        <el-button type="primary" @click="rewrite(post.post_id)">修改</el-button>
        <!-- 修改想办法搞个输入框 这个 rewrite函数是直接接着接口的 -->
        <el-button type="danger" @click="re(post.post_id)">撤销</el-button>
    </div>
</template>