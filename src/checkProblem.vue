<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getData2, postData } from './function/axios';
import { imformation } from '../src/main.vue';

const postList = ref([]); // 反馈列表
const res = ref(true);  // 是否正在处理
const status = ref(1); // 处理状态
const response_rating = ref(1)
// 格式化日期时间的方法
const formatPostTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0'); // 如果需要秒数

    return `${year}年${month}月${day}日${hours}:${minutes}`; // 如果需要小时和分钟
};

function re() {
    res.value = !res.value;
}

function clear() {
    status.value = 1;
    res.value = true;
}

async function rev(post_id, comment) {
    try {
        const res = await postData('/api/admin/handlepost', {
            admin_id: imformation.value.user_id,
            post_id: post_id,
            status: status.value,
            response: comment
        });
        clear();
        await getpost();
        if (res.code === 200) {
            ElMessage.success('处理成功');
        } else {
            console.log(res.msg);
            ElMessage.error('处理失败:' + res.msg);
        }
    } catch (err) {
        ElMessage.error('后端爆啦');
        console.log(err);
    }
}

async function getpost() {
    try {
        const res = await getData2('/api/admin/handlepost', {
            admin_id: imformation.value.user_id
        });
        if (res.code === 200) {
            console.log('获取成功');
            postList.value = res.data.post_list;
        } else {
            console.log(res.msg);
        }
    } catch (err) {
        console.log(err);
        ElMessage.error('后端爆啦');
    }
}

getpost();
</script>

<template>
    <div class="mainProcess">
        <h2>查看反馈进程</h2>
        <div v-for="post in postList" :key="post.post_id" class="post">
            <h1>标题：{{ post.title }}</h1>
            <p>内容：{{ post.content }}</p>
            <p>反馈时间：{{ formatPostTime(post.post_time) }}</p>
            <p><span>
            <el-input v-model="post.comments" placeholder="请输入回复"></el-input>
            </span></p><br>          
            <el-button type="primary" @click="rev(post.post_id,post.comments)" v-if="res===true">提交</el-button>
        </div>
    </div>
</template>

<style>
.mainProcess {
  align-items: flex-start;
  height: auto;
  width: 66%;
  background-color: #ffffff;
  overflow-y: auto; 
  margin-left: 13vw;
}
.mainProcess h2 {
  font-size: 3vw;
  text-align: center;
}
.post {
    padding: 10px;
    padding-right: 20px;
    margin-bottom: 25px;
    margin-right: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
p {
    line-height: 30px;
    font-size: 14px;
    color: black;
    font-weight: bold;
}
</style>