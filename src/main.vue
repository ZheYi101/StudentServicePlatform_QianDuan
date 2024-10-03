<script setup lang="ts">
import AppAside from './appAside.vue';

//void toggleCollapse() {
  //isCollapse.value = !isCollapse.value;
//}

</script>

<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <img src="/text.png" class="textImg">
        </el-header>
        <el-container>
            <AppAside />
          <el-container>
            <el-main>
              <div class="fixed-icon">
                <el-icon @click="toggleCollapse" class="getCollapse">
                <Grid />
                </el-icon>
              </div>
                <el-scrollbar>
                  <RouterView />
                </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </template>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
}

.fixed-icon {
  position: fixed;
  font-size: 30px;
  z-index: 1000; 
  left: 210px;
  bottom: 700px;
}

#app {
  margin: 0;
}

.getCollapse {
  cursor: pointer; 
}

.textImg {
  height: 90%;
  margin-top: 0.25%;
  margin-left: 3%;
}

.common-layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden; 
}

.el-container {
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;
}

.el-header {
    width: 100%;
    height: 8%; 
    background: #ffffff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1030; 
}

.el-container .el-aside {
    width: 200px; 
    height: calc(100% - 8%); 
    background-color: #f4f6f9;
    margin-top: 4%; 
    position: fixed; 
    left: 0;
    z-index: 1020; 
}

.el-container .el-main {
    margin-left: 200px; 
    padding-top: 8%; 
    height: calc(100% - 8%); 
    overflow-y: auto; 
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    width: calc(100% - 200px); 
}
</style>