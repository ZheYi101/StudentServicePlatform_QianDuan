import axios from 'axios'

export async function getData(url) {
  try {
    const response = await axios.get(url);
    // 处理响应
    if (response.data.code === 200) {
      console.log("getData成功");
      return response.data; // 返回响应数据
    } else {
      console.log(response.data.msg);
      return response.data; // 返回响应数据
    }
  } catch (error) {
    // 处理错误
    console.error('后端爆啦:', error);
    throw error; // 抛出错误以便可以在调用方捕获
  }
}

export async function postData(url, data) {
  try {
    const response = await axios.post(url, data);
    // 处理响应
    if (response.data.code === 200) {
      console.log("postData成功");
      return response.data; // 返回响应数据
    } else {
      console.log(response.data.msg);
      return response.data; // 返回响应数据
    }
  } catch (error) {
    // 处理错误
    console.error('后端爆啦:', error);
    throw error; // 抛出错误以便可以在调用方捕获
  }
}

export async function putData(url, data) {
  try {
    const response = await axios.post(url, data);
    // 处理响应
    if (response.data.code === 200) {
      console.log("putData成功");
      return response.data; // 返回响应数据
    } else {
      console.log(response.data.msg);
      return response.data; // 返回响应数据
    }
  } catch (error) {
    // 处理错误
    console.error('后端爆啦:', error);
    throw error; // 抛出错误以便可以在调用方捕获
  }
}
 
export async function delData(url,data) {
  try {
    console.log(data)
    const response = await axios.delete(url,{data:data});
    // 处理响应
    if (response.data.code === 200) {
      console.log("delData成功");
      return response.data; // 返回响应数据
    } else {
      console.log(response.data.msg);
      return response.data; // 返回响应数据
    }
  } catch (error) {
    // 处理错误
    console.error('后端爆啦:', error);
    throw error; // 抛出错误以便可以在调用方捕获
  }
}

export async function getData2(url,params) {
  try {
    const response = await axios.get(url,{
      params:params
    });
    // 处理响应
    if (response.data.code === 200) {
      console.log("getFile成功");
      return response.data; // 返回响应数据
    } else {
      console.log(response.data.msg);
      return response.data; // 返回响应数据
    }
  } catch (error) {
    // 处理错误
    console.error('后端爆啦:', error);
    throw error; // 抛出错误以便可以在调用方捕获
  }
}