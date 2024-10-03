<script setup>
import { ref } from 'vue';
const isCollapse = ref(true)

</script>

<template>
    <el-aside>
        <el-menu router unique-opened :collapse="!isCollapse">  
            <img src="/fangnai.png" class="serveImg">
            <el-sub-menu index="1">
                <template #title> 
                    <el-icon> <QuestionFilled /> </el-icon> <span class="iconText">问题反馈</span>
                </template>
                <el-menu-item index="postProblem">
                    <el-icon> <UploadFilled /> </el-icon> <span class="iconText">提出反馈</span>
                </el-menu-item>
                <el-menu-item index="problemProcess">
                    <el-icon> <ChatDotSquare /> </el-icon> <span class="iconText">反馈进程</span>
                </el-menu-item>
                <el-menu-item index="putProblem">
                    <el-icon> <EditPen /> </el-icon> <span class="iconText">信息修改</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="userCenter">
                    <el-icon> <UserFilled /> </el-icon> <span class="iconText">个人中心</span>
            </el-menu-item>

            <el-sub-menu index="2">

                <template #title> 
                    <el-icon> <Avatar /> </el-icon> <span class="iconText">平台管理</span>
                </template>
                <el-menu-item index="chatProblem">
                    <el-icon> <Search /> </el-icon> <span class="iconText">查看反馈</span>
                </el-menu-item>
                <el-menu-item index="putInformation">
                    <el-icon> <EditPen/> </el-icon> <span class="iconText">信息修改</span>
                </el-menu-item>
                <el-menu-item index="manageUser">
                    <el-icon> <Setting /> </el-icon> <span class="iconText">用户管理</span>
                </el-menu-item>
            
            </el-sub-menu>

            <img src="/mozi.png" style="width: 100%; height: auto;">
        </el-menu>
    </el-aside>
</template>

<style scoped>

.iconText {
    letter-spacing: 0.5vw;
}

.el-menu-item {
    background: rgb(238, 238, 238);
}

.el-menu {
    background: rgb(238, 238, 238);
    width: 200px;
    border-right: none;
    &.el-menu--collapse {
        width: 60px;
        &h1 {
            display: none;
        }
    }
}

.serveImg {
  width: 100%;
  height: 100%;
}

</style>