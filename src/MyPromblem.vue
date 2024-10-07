<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2 } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])
async function get() {
    try {
      const res = await getData2('/api/student/response',{
        user_id: imformation.value.user_id
      });
      console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.response
      console.log(postList.value)
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
    <div class="problemProcess">
        <div v-for="post in postList" :key="post.post_id" class="post">
            {{ post.post_id }}
            {{ post.content }}
            {{ post.response }}
            {{ post.response_time }}
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