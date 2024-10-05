<script setup>
import { imformation } from '../src/main.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getData2,postData } from './function/axios';

const postList = ref([]); //反馈列表
const res = ref(true)  //是否正在处理
const respon = ref(null)  //处理内容

function re() {
    res.value = !res.value
}
async function rev(post_id,status) {
    try {
        console.log(typeof(imformation.value.user_id))
        console.log(typeof(post_id))
        console.log(typeof(status))
        console.log(typeof(respon.value))
        const res = await postData('/api/admin/handlepost',{
            admin_id: imformation.value.user_id,
            post_id: post_id,
            status: status,
            response: respon.value
        });
    //   console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.post_list
    //   console.log(postList.value)
    } 
    else {
        console.log(res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
async function getpost() {
    try {
      const res = await getData2('/api/admin/handlepost',{
        admin_id: imformation.value.user_id
      });
    //   console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.post_list
    //   console.log(postList.value)
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
</script>
<template>
    <div class="mainProcess">
        <h1>查看反馈进程</h1>
        <div v-for="post in postList" :key="post.post_id" class="post">
            <h1>标题：{{ post.title }}</h1>
            <p>内容：{{ post.content }}</p>
            <p>状态：{{ post.status }}</p>
            <p>反馈时间：{{ post.post_time }}</p>
            <p>回复时间：{{ post.response_time }}</p>
            <p>回复评分：{{ post.response_rating }}</p>
            <p>是否已处理：{{ post.approval }}</p>
            <el-button @click="re()" v-if="res===false">处理</el-button>
            <el-button @click="re()" v-if="res===true">取消</el-button>
            <input type="text" v-if="res" v-model="respon" placeholder="请输入处理内容"/>
            <el-button type="primary" @click="rev(post.post_id,post.status)" v-if="res===true">提交</el-button>
        </div>
    </div>
</template>



<style>

.mainProcess {
    
}

.post {
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
}
</style>