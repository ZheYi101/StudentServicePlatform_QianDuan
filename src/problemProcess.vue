<script setup>
import { ref } from 'vue';
import { imformation } from '../src/main.vue';
import { putData,getData,delData } from './function/axios';
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
    <h1>这是查看反馈进程</h1>
    {{list}}
    <button @click="reversepost">修改</button>
    <button @click="delpost">删除</button>
</template>