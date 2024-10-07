<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { imformation } from '../src/main.vue';
import { putData,getData,delData } from './function/axios';
import { ElMessage } from 'element-plus';

const postList = ref([]); //反馈列表
//修改函数相关变量
const isReview = ref(false) //是否正在修改
const new_content = ref(null)
const new_title = ref(null)
const new_post_type = ref(null)
const new_is_annoymous = ref(null)
const new_is_urgent = ref(null)

const openEditDialog = (post) => {
    post.isEditing = true;
    post.editTitle = post.title;
    post.editContent = post.content;
};

const updatePost = async (post) => {
    post.title = post.editTitle;
    post.content = post.editContent;
    post.isEditing = false;
    await reversepost(post.post_id, post.is_anonymous, post.is_urgent, post.post_type, post.title, post.content);
};

const issReview = (post) => {
    return post.isEditing;
};

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
            console.log(response.data.data)
            postList.value = response.data.data.map(p => ({
                ...p,
                showReply: false // 初始化时隐藏回复框
            }));
        } else {
            console.error('请求失败:', response.data.msg);
        }
    })
    .catch(error => {
        ElMessage.error('后端爆啦');
    });
}

const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以+1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0'); // 如果需要秒数

    return `${year}年${month}月${day}日${hours}:${minutes}`; // 如果需要小时和分钟
};
getFeedback();
// const list=ref([])  //反馈列表
// async function getpost() {
//     try {
//       const res = await getData('/api/student/post');
//     //   console.log(res);
//     if(res.code === 200) {
//       console.log('获取成功');
//       list.value = res.data.post_list
//     } 
//     else {
//         console.log(res.msg);
//     }
//   } catch (err) {
//     console.log(err);
//     ElMessage.error('后端爆啦');
//   }
// }
// getpost()


//修改函数如下:
async function re() {
    isReview.value = !isReview.value
}
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

const formatResponseTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0'); // 如果需要秒数

    return `${year}年${month}月${day}日 ${hours}:${minutes}`; // 如果需要小时和分钟
};

//删除帖子函数如下
async function delpost(user_id,post_id) { 
    try {
    const res = await delData('/api/student/post',{
        user_id: user_id, 
        post_id: post_id,  //帖子的id
    });
    await getFeedback()
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
            <div class="user">
                ID:{{ post.user_id }}
            </div>
            <h2 style="text-align: center;font-size: 30px;">
                {{ post.title }}
                <span style="font-size: 16px;margin-left: 1px;color:" :style="{ color: typeToColor(post.post_type) }">
                    {{ typeToText(post.post_type) }}
                </span>    
            </h2>
            <p>{{ post.content }}</p>
            <p style="margin-top: 20px;">
                <span class="iconText">               
                    <span class="iconText" style="background: #dceafe;width: auto;padding: 3px 20px 3px 12px;">
                        <el-icon style="font-size: 28px;color: #1772f6;"><CaretTop /></el-icon>赞同
                    </span>
                    <el-icon 
                        style="font-size: 28px;color: #758195; margin-left: 80px;"
                        @click="toggleReplyBox(post)"><ChatRound /></el-icon>查看回复
                    <el-icon 
                        style="font-size: 28px;color: #758195; margin-left: 25px;"
                        @click=""><Star /></el-icon>收藏
                    <el-icon 
                        style="font-size: 28px;color: #758195; margin-left: 25px;"
                        @click=""><Promotion /></el-icon>分享
                    </span>
            </p><br>
            <div v-if="post.showReply">
                <p>管理员回复： {{ post.response }}</p>
                <p>回复评分：{{ post.response_rating }}</p>
                <p>回复时间： {{ formatResponseTime(post.response_time) }}</p>
            </div>
            <p>状态：<span :style="{ color: statusToTextAndColor(post.status).color }">
                 {{ statusToTextAndColor(post.status).text }}</span></p>
            <p style="text-align: end;">反馈时间：{{ formatDateTime(post.post_time) }}</p>
            <br>
            <div class="buttonForm" v-if="post.user_id === imformation.user_id">
                <el-button type="text" icon="Edit" @click="openEditDialog(post)" v-if="!issReview(post)">修改</el-button>
                <el-button type="text" icon="Delete" @click="delpost(post.user_id,post.post_id)">删除</el-button>
                <el-dialog :visible.sync="post.isEditing" title="修改帖子">
                    <el-form>
                        <el-form-item label="标题">
                            <el-input v-model="post.editTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="内容">
                            <el-input type="textarea" v-model="post.editContent"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button icon="CloseBold" @click="post.isEditing = false">取消</el-button>
                        <el-button type="primary" icon="Edit" @click="updatePost(post)">提交</el-button>
                    </span>
                </el-dialog>
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