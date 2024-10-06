<script setup>
import { ref } from 'vue';
import { imformation } from '../src/main.vue';
import { postData } from './function/axios';
import { ElMessage } from 'element-plus';
//以下为反馈的参数
const is_annoymous = ref(0) //这个写个二选一的checkbox 不匿名是0 匿名是1 注意数据类型是 integer
const is_urgent=ref(0)  //同上 数据类型也是integer
const post_type=ref()  //同上 但是四选一 数据类型也是integer
//input integer 的写法是  <input v-model="usernameLog" type="number"
const title=ref('') //string 反馈标题
const content=ref('') //string 反馈内容
async function putpost() {  //发帖函数 写个button @click绑定一下
  if(title.value === '' || content.value === '') {
        ElMessage.error('请输入完整信息！') 
      }
      else if(post_type.value != 1 && post_type.value != 2 && post_type.value != 3 && post_type.value != 4) {
        ElMessage.error('请选择反馈类型！')
      }
      else { 
        post_type.value = Number(post_type.value)
        is_annoymous.value = Number(is_annoymous.value)
        is_urgent.value = Number(is_urgent.value)
      try {
        console.log('post_type的数据类型 '+typeof(post_type.value))
          console.log(is_annoymous.value)
          console.log(is_urgent.value)
          console.log(post_type.value)
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
        clear()
      } 
      else {
        ElMessage.error('发帖失败:'+res.msg);
        clear()
      }
    } catch (err) {
      console.log(err);
      ElMessage.error('后端爆啦');
    }
    }
}

function clear() {
  title.value = ''
  content.value = ''
  is_annoymous.value = 0
  is_urgent.value = 0
  post_type.value = null
}
</script>
<template>
    <div class="postProblem">
        <h1>提出反馈</h1>
        <div class="inputForm">
            <input v-model="title" type="text" placeholder="反馈标题"/>
            <input v-model="content" type="text" placeholder="反馈内容"/>
            <div class="buttonForm">
              <input type="checkbox" v-model="is_annoymous" value=1>
              <label for="is_annoymous">匿名</label>
              <input type="checkbox" v-model="is_urgent" value=1>
              <label for="is_urgent">紧急</label>
              <el-select v-model="post_type" placeholder="请选择反馈类型">
                <el-option label="水电类" value='1'></el-option>
                <el-option label="泥土类" value='2'></el-option>
                <el-option label="通讯类" value='3'></el-option>
                <el-option label="园林绿化类" value='4'></el-option>
              </el-select>
              <el-button type="primary" @click="putpost()">发布</el-button>
            </div>  
        </div>
    </div>
</template>

<style>

.postProblem {
    align-items: flex-start;
    height: auto;
    width: 66%;
    background-color: #ffffff;
    overflow-y: auto;
}

.inputForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
}

input {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
    text-indent: 4px;
    border: 1px solid #b0cfe9;
    border-radius: 4px;
} 
</style>