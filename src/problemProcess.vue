<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';

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