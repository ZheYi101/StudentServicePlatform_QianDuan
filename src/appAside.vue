<template>
    <el-aside>
        <el-menu router unique-opened :collapse="!isCollapse">  
            <el-sub-menu index="1">
                <template #title> 
                    <el-icon> <QuestionFilled /> </el-icon> <span class="iconText">问题反馈</span>
                </template>
                <el-menu-item index="/main/postProblem" to="/main/postProblem">
                    <el-icon> <UploadFilled /> </el-icon> <span class="iconText">提出反馈</span>
                </el-menu-item>
                <el-menu-item index="/main/MyPromblem" to="/main/MyPromblem">
                    <el-icon> <Star /> </el-icon> <span class="iconText">我的反馈</span>
                </el-menu-item>
                <el-menu-item index="/main/problemProcess" to="/main/problemProcess">
                    <el-icon> <ChatDotSquare /> </el-icon> <span class="iconText">所有反馈</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/main/userCenter" to="/main/userCenter">
                <el-icon> <UserFilled /> </el-icon> <span class="iconText">个人中心</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title> 
                    <el-icon> <Avatar /> </el-icon> <span class="iconText">平台管理</span>
                </template>
                <el-menu-item index="/main/checkProblem" to="/main/checkProblem">
                    <el-icon> <Search /> </el-icon> <span class="iconText">查看反馈</span>
                </el-menu-item>
                <el-menu-item index="/main/YourCheck" to="/main/YourCheck">
                    <el-icon> <List /> </el-icon> <span class="iconText">你的接单</span>
                </el-menu-item>
                <el-menu-item index="/main/rubbish" to="/main/rubbish">
                    <el-icon> <WarningFilled /> </el-icon> <span class="iconText">垃圾反馈</span>
                </el-menu-item>
                <el-menu-item index="/main/manageUser" to="/main/manageUser">
                    <el-icon> <View /> </el-icon> <span class="iconText">用户管理</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { ref } from 'vue';
const isCollapse = ref(true)
</script>

<style scoped>
.iconText {
    letter-spacing: 0.5vw;
}

.el-menu-item {
    background-color: #f4f6f9;
}

.el-menu-item:hover {
    text-decoration: none; 
    color: green; 
    cursor: pointer; 
}

.el-menu:hover {
    text-decoration: none; 
    color: green; 
    cursor: pointer; 
}

.el-menu {
    background-color: #f4f6f9;
    width: 200px;
    border-right: none;
    &.el-menu--collapse {
        width: 60px;
        h1 {
            display: none;
        }
    }
}

.serveImg {
  width: 100%;
  height: 100%;
}
</style>