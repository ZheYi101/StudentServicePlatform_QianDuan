<script setup lang="ts">
import { imformation } from '../src/main.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { delData2, getData2,putData } from './function/axios';
const res = ref(true)
const postList = ref([])
const respon = ref("null")  //处理内容
const isChange = ref(false);

// 添加日期格式化函数
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

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

function rewritePre() {
  isChange.value = !isChange.value;
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
  <div class="yourCheck">
    <div v-for="post in postList" :key="post.post_id" class="postC">
        <h1>标题：{{ post.title }}</h1>
        <p>内容：{{ post.content }}</p>
        <p>反馈时间：{{ formatDateTime(post.post_time) }}</p>
        <p>回复时间：{{ post.response_time }}</p>
        <p>回复评分：{{ post.response_rating }}</p>
        <div class="我不知道">
        </div>
        <el-button type="primary" @click="rewritePre(post.post_id)">修改</el-button>
        <el-input v-model="input" style="width: 240px;margin-left: 10px;" placeholder="请输入修改内容"  v-if="isChange"/> 
         <!-- input改为修改内容的变量 加一个函数点击确定修改向后端发post -->
        <el-button type="success" style="margin-left: 10px;" v-if="isChange">确定修改</el-button>
        <br><br>
        <el-button type="danger" @click="re(post.post_id)">撤销</el-button>
    </div>
  </div>
</template>

<style scoped>
.postC {
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #ffffff;
}

.yourCheck {
  margin-right: 50px;
}
</style>