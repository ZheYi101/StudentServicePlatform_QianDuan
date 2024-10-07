<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2,delData,putData } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])


//修改函数相关变量
const new_content = ref(null)
const new_title = ref(null)
const new_post_type = ref(null)
const new_is_annoymous = ref(null)
const new_is_urgent = ref(null)
const isReview = ref(false)

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


//修改函数如下:

async function reversepost(post_id,is_annoymous,is_urgent,post_type,title,content) { 
    //这里需要从帖子那里获取 
    //post_id is_annoymous is_urgent post_type title content
    try {
        isReview.value = !isReview.value
        if(new_is_annoymous!=null) {
        is_annoymous = new_is_annoymous.value
        }
        if(new_is_urgent!=null) {
            is_urgent = new_is_urgent.value
        }
        if(new_post_type!=null) {
            post_type = new_post_type.value
        }
        if(new_title!=null) {
            title = new_title.value
        }
        if(new_content!=null) {
            content = new_content.value
        }
    const res = await putData('/api/student/post',{
        user_id: imformation.value.user_id, //这个不用管 我已经搞好了
        post_id: post_id,  //需要从函数传入 不需要修改 这个是帖子的id
        is_anonymous: is_annoymous, //需要从函数传入 并且设置可以修改
        is_urgent: is_urgent, //需要从函数传入 并且设置可以修改
        post_type: post_type, //同上
        title: title, //同上
        content: content  //同上
    });
    console.log(res);
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

//删除帖子函数如下
async function delpost(user_id,post_id) { 
    try {
    const res = await delData('/api/student/post',{
        user_id: user_id, 
        post_id: post_id,  //帖子的id
    });
    await get()
  if(res.code === 200) {
    ElMessage.success('删除成功');
  } 
  else {
    ElMessage.error('删除失败:'+res.msg);
  }
} catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
</script>
<template>
    <div class="problemProcess">
        <div v-for="post in postList" :key="post.post_id" class="post">
            <h1>Id : {{ post.post_id }}</h1>
            <h1>您的反馈：{{ post.content }}</h1>
            <h1>管理员回复：{{ post.response }}</h1>
            <h1>时间：{{ formatDateTime(post.response_time) }}</h1>
            <div class="buttonForm" >
                <el-button type="text" icon="Edit" @click="post.rev='1'"v-if="post.rev!='1'" style="font-size: 20px;">修改</el-button>
                <div v-if="post.rev=='1'" style="margin-bottom: 10px;">
                    <el-input type="text" placeholder="请输入您想修改的内容" style="width: 30vw;"/><br><br>
                    <el-button type="success">确认</el-button>
                    <el-button type="info" @click="post.rev='0'">取消</el-button>
                </div>
                <el-button type="text" icon="Delete" @click="delpost(post.user_id,post.post_id)" style="font-size: 20px;">删除</el-button>
            </div>
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