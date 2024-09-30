<script setup lang="ts">
import AppAside from './appAside.vue';
</script>

<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <img src="/serve.png" class="serveImg">
          <img src="/text.png" class="textImg">
        </el-header>
        <el-container>
            <AppAside />
          <el-container>
            <el-main>Main</el-main>
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

.serveImg {
  height: 90%;
  margin-top: 0.25%;
  margin-left: 3.2%;
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

.el-container {
    height: 100%;
    width: 100%;
  }

.el-header {
    width: 100%;
    background: #B3C0D1;
    border-bottom: 1px solid #d4d5d4d3;
    height: 7%;
}
.el-aside {
    height: 100%;
    width: auto;
    background-color: #eee;
}
.el-main {
    height: auto;
    background-color: #E9EEF3;
    width: auto;
}


</style>