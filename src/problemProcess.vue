<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { imformation } from '../src/main.vue';
import { putData,getData,delData } from './function/axios';

const postList = ref([]);

// 定义一个映射函数，用于将post_type的数字转换为对应的文字描述
const typeToText = (type) => {
    const types = {
        1: '水电类',
        2: '泥土类',
        3: '通讯类',
        4: '园林绿化类'
    };
    return types[type] || '未知类型'; // 如果没有匹配的类型，返回'未知类型'
};

// 定义一个函数，用于获取每种类型对应的颜色
const typeToColor = (type) => {
    const colors = {
        1: 'skyblue', // 水电类
        2: 'saddlebrown', // 泥土类
        3: 'gray', // 通讯类
        4: 'green' // 园林绿化类
    };
    return colors[type] || 'black'; // 如果没有匹配的类型，返回黑色
};

// 定义一个函数来切换回复框的显示状态
const toggleReplyBox = (post) => {
    post.showReply = !post.showReply;
};

//status为0和1分别显示不同颜色的状态
const statusToTextAndColor = (status) => {
    const statuses = {
        0: { text: '待完成', color: '#f1c40f' },
        1: { text: '已完成', color: 'limegreen' },
    };
    const defaultStatus = { text: '未知状态', color: 'black' };
    return statuses[status] || defaultStatus;
};

function getFeedback() {
    axios.get('/api/student/post', {
        params: {
        }
    })
    .then(response => {
        if (response.data.code === 200) {
            postList.value = response.data.data.post_list.map(p => ({
                ...p,
                showReply: false // 初始化时隐藏回复框
            }));
        } else {
            console.error('请求失败:', response.data.msg);
        }
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
}

const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds(); //精确到秒 暂时不调用
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};
getFeedback();
const list=ref([])  //反馈列表
async function getpost() {
    try {
      const res = await getData('/api/student/post');
    //   console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      list.value = res.data.post_list
      console.log(list.value)
    } 
    else {
        console.log(res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
getpost()


//用post_list.user_id和imformation.user_id比较 如果相等就是当前登录的用户 就可以修改
//修改函数如下:
async function reversepost(post_id,is_annoymous,is_urgent,post_type,title,content) { 
    //这里需要从帖子那里获取 
    //post_id is_annoymous is_urgent post_type title content
    try {
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
async function delpost(post_id) { 
    //这里需要从帖子那里获取 
    //post_id is_annoymous is_urgent post_type title content
    try {
        console.log('user_id:'+imformation.value.user_id)
    const res = await delData('/api/student/post',{
        user_id: imformation.value.user_id, //这个不用管 我已经搞好了
        post_id: 1,  //需要从函数传入 不需要修改 这个是帖子的id
    });
    console.log(res);
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
            <h2 style="text-align: center;font-size: 30px;">
                {{ post.title }}
                <span style="font-size: 16px;margin-left: 1px;color:" :style="{ color: typeToColor(post.post_type) }">
                    {{ typeToText(post.post_type) }}
                </span>    
                <span style="font-size: 16px;margin-left: 18px">Id: {{ post.user_id }}</span>
            </h2>
            <p>{{ post.content }}</p>
            <p style="margin-top: 20px;">
                <span class="iconText">               
                    <span class="iconText" style="background: #dceafe;width: auto;padding: 3px 20px 3px 12px;">
                        <el-icon style="font-size: 28px;color: #1772f6;"><CaretTop /></el-icon>赞同
                    </span>
                    <el-icon 
                        style="font-size: 28px;color: #758195; margin-left: 50px;"
                        @click="toggleReplyBox(post)"><ChatRound /></el-icon>查看回复
                    </span>
            </p><br>
            <div v-if="post.showReply">
                <p>管理员回复: {{ post.response }}</p>
                <p>回复评分: {{ post.response_rating }}</p>
                <p>回复时间: {{ post.response_time }}</p>
            </div><br>
            <p>状态：<span :style="{ color: statusToTextAndColor(post.status).color }">
                 {{ statusToTextAndColor(post.status).text }}</span></p>
            <p style="text-align: end;">反馈时间：{{ formatDateTime(post.post_time) }}</p>
            <br>
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
}
.post {
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
}

.iconText {
    display: flex;
    align-items: center; /* 垂直居中 */
}
.iconText el-icon {
    margin-right: 5px; /* 图标右侧间距 */
}
</style>