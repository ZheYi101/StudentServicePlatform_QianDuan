<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getData2 } from './function/axios';
import { imformation } from './main.vue';
const res = ref(true)
const postList = ref([])
async function get() {
    try {
      const res = await getData2('/api/student/response',{
        user_id: imformation.value.user_id
      });
      console.log(res);
    if(res.code === 200) {
      console.log('获取成功');
      postList.value = res.data.response
    } 
    else {
        console.log(res.msg);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error('后端爆啦');
  }
}
get()
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
                    {{ (post.post_type) }}
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
                        @click="(post)"><ChatRound /></el-icon>查看回复
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
                <p>回复时间： {{ (post.response_time) }}</p>
            </div>
            <p>状态：<span :style="{ color: (post.status).color }">
                 {{ (post.status).text }}</span></p>
            <p style="text-align: end;">反馈时间：{{ (post.post_time) }}</p>
            <br>
            <div class="buttonForm" v-if="post.user_id === imformation.user_id">
                <el-button type="text" icon="Edit" @click="(post)" v-if="(post)">修改</el-button>
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