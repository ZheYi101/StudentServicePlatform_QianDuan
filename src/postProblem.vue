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
      <h1>请提交您的问题反馈</h1>
        <div class="inputForm">         
          <el-input v-model="title" style="max-width: 18vw;"><template #prepend>反馈标题</template></el-input><br>
          <el-input v-model="content" maxlength="30" style="width: 300px" placeholder="反馈内容" show-word-limit type="textarea"/>
            <div class="urgentButtonForm">
              <el-radio-group v-model="is_urgent">
                <el-radio value="1" size="large">紧急</el-radio>
                <el-radio value="0" size="large">非紧急</el-radio>
              </el-radio-group>
              <el-radio-group v-model="is_annoymous" style="margin-left: 100px;">
                <el-radio value="1" size="large">匿名</el-radio>
                <el-radio value="0" size="large">实名</el-radio>
              </el-radio-group><br>
              <div>
                <el-select v-model="post_type" placeholder="请选择反馈类型" style="width: 100px;">
                  <el-option label="水电类" value='1'></el-option>
                  <el-option label="泥土类" value='2'></el-option>
                  <el-option label="通讯类" value='3'></el-option>
                  <el-option label="园林绿化类" value='4'></el-option>
                </el-select>
                <el-button type="primary" @click="putpost()" style="margin-top: 5px; margin-left: 19px; margin-bottom: 5px;">发布</el-button>
            </div>
            </div>  
        </div>
        <h2>我们将认真对待您的反馈，请耐心等待我们的回复！</h2>
    </div>
</template>

<style scoped>

.postProblem {
    margin-top: 10%;
    margin-left: 10%;
    height: 70vh;
    width: 80%;
    background-color: #ffffff;
    overflow-y: auto; 
}

.postProblem h1 {
  margin-top: 3vh;
  text-align: center;
  font-size: 2vw;
}

.postProblem h2 {
  margin-top: 1vh;
  text-align: center;
  font-size: 2vw;
}

.inputForm {
    margin-top: 15vh;
    line-height: 5vh;
    margin-left: 200px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

input {
    width: 60%;
    height: 40px;
    max-width: 60%;
    margin-bottom: 20px;
    text-indent: 4px;
    border: 1px solid #b0cfe9;
    border-radius: 4px;
} 

</style>