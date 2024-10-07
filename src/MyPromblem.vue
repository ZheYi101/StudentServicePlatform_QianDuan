<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2 } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])

// 定义日期格式化函数
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
}

async function get() {
    try {
      const res = await getData2('/api/student/response', {
        user_id: imformation.value.user_id
      });
      console.log(res);
      if (res.code === 200) {
        console.log('获取成功');
        postList.value = res.data.response
        console.log(postList.value)
      } else {
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
    <div class="problemProcess">
        <div v-for="post in postList" :key="post.post_id" class="post">
            <h1>Id : {{ post.post_id }}</h1>
            <h1>您的反馈：{{ post.content }}</h1>
            <h1>管理员回复：{{ post.response }}</h1>
            <h1>时间：{{ formatDateTime(post.response_time) }}</h1>
        </div>
    </div>
</template>

<style scoped>
.problemProcess {
    align-items: flex-start;
    height: auto;
    width: 66%;
    background-color: #ffffff;
    overflow-y: auto; 
    margin-left: 13vw;
}
.post {
    padding: 10px;
    padding-right: 20px;
    margin-bottom: 25px;
    margin-right: 15px;
    padding-bottom: 10px; /* 增加底部内边距 */
    border-bottom: 1px solid #e0e0e0; /* 添加下边框 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.iconText {
    display: flex;
    align-items: center; /* 垂直居中 */
}
.iconText el-icon {
    margin-right: 5px; /* 图标右侧间距 */
}
</style>