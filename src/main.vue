<script setup lang="ts">
import AppAside from './appAside.vue';
</script>

<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <a href="main" class="logo">
                <img src="/Soso_logo.png" alt="">
            </a>
          <img src="/text.png" class="textImg">
          <img src="/Q_congyu.jpg" style="height: 100%; margin-left:65%;">
        </el-header>
        <el-container>
            <AppAside />
          <el-container>
            <el-main>
              <el-icon @click=""><Grid /></el-icon>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </template>

<style>

* {
    padding: 0px;
    margin: 0px;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, rgb(236, 152, 166), rgb(169, 240, 237));
  overflow: hidden;
}

#app {
  margin: 0;
  padding: 0;
}

.textImg {
  height: 90%;
  margin-top: 0.25%;
  margin-left: 3%;
}

.common-layout {
    width: 100vw;
    height: 100vh;
}

.logo {
    text-decoration: none;
    color: black;
    height: 60px;
    img {
        width: auto;
        height: 95%;
    }
    margin-left: 2.5%;
}

.el-container {
    height: 100%;
    width: 100%;
  }

.el-header {
    width: 100%;
    border-bottom: 1px solid #d4d5d4d3;
    height: 7%;
    background: linear-gradient(to right,#9489b1,#917eb7);
}
.el-aside {
    height: 100%;
    width: auto;
    background: linear-gradient(to right,#edc9cb,pink);
}
.el-main {
    height: auto;
    width: auto;
    background-image: url(/790.jpg);background-repeat: no-repeat;width: 100;background-size: cover;
}


</style>