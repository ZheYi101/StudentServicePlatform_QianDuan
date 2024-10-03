<template>
  <div class="user-center">
    <h1 style="font-size: 40px; display: flex ;justify-content: center">WELCOME TO CHECK YOUR INFORMATION</h1>
    <div class="information">
      <h1>学号：{{ username }}</h1>
      <h1>姓名：{{ name }}</h1>
      <h1>性别：您是 {{ sex }} 生</h1>
      <h1>电话号码：{{ phone_num }}</h1>
      <h1>邮箱：{{ email }}</h1>
    </div>
  </div>
</template>

<style scoped>

.user-center {
  background-color: rgba(255, 255, 255, 0.5); 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px; 
  z-index: 1;
  height: 100%;
  width: 90%;
}

.information {
  display: flex;
  margin-top: 1%;
  flex-direction: column;
  text-align: center;
}

.information h1 {
  font-size: 21px;
}

</style>