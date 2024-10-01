<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
function ret() {
  router.push('/main')
}
</script>

<template>
    <div class="individual">
        <h0>个人中心</h0>
        <div class="centerMain">
          <h1>您的账号：{{ username }}</h1>
          <h1>您的姓名：{{ name }}</h1>
          <h1>您的性别：{{ sex }}</h1>
          <h1>您的电子邮箱：{{ email }}</h1>
          <h1>您的联系方式（手机号码）：{{ phone_num }}</h1>
        </div>
        <div class="returnButton">
            <button @click="ret()">返回</button>
        </div>
    </div>
</template>

<style >
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, rgb(236, 152, 166), rgb(169, 240, 237));
  overflow: hidden;
}
#app {
  display: flex;
}
.individual {
  display: flex;
  justify-items: center;
  flex-direction: column;
  height: 100%;
  width: 30vw;
}

.individual h0 {
  font-size: 60px;
  margin: 0;
  text-align: center;
}

.centerMain h1 {
  position: relative;
  padding: 1vh;
  left: 1vw;
  font-size: 20px;
  margin: 0;
}

.centerMain {
  display: flex;
  flex-direction: column;
  border-radius: 4vh;
  border: 1px solid rgba(255, 255, 255, .6);
  box-shadow: 4px 4px 3px rgba(0,0,0,.1);
}


</style>

