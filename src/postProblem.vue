<script setup>
import { ref } from 'vue';
import { imformation } from '../src/main.vue';
import { postData } from './function/axios';
import { ElMessage } from 'element-plus';
//以下为反馈的参数
const is_annoymous = ref() //这个写个二选一的checkbox 不匿名是0 匿名是1 注意数据类型是 integer
const is_urgent=ref()  //同上 数据类型也是integer
const post_type=ref()  //同上 但是四选一 数据类型也是integer
//input integer 的写法是  <input v-model="usernameLog" type="number"
const title=ref('') //string 反馈标题
const content=ref('') //string 反馈内容
async function putpost() {  //发帖函数 写个button @click绑定一下
    try {
    const res = await postData('/api/student/post',{
        user_id: imformation.value.user_id,
        is_anonymous: is_annoymous.value,
        is_urgent: is_urgent.value,
        post_type: post_type.value,
        title: title.value,
        content: content.value
    });
    console.log(res);
  if(res.code === 200) {
    ElMessage.success('发帖成功');
  } 
  else {
    ElMessage.error('发帖失败:'+res.msg);
  }
} catch (err) {
  console.log(err);
  ElMessage.error('后端爆啦');
}
}
</script>
<template>
    <div class="postProblem">
        我要对你开大了1 
    </div>
</template>

<style>

.postProblem {
    
}

</style>