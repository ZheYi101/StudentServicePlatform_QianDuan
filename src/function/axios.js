import axios from 'axios'

export async function getData(url, data) {
return await axios.get(url,data)
    .then(response => {
        // 处理响应
        if (response.data.code === 200) {
            console.log("getData成功")
            // return response.data.data
        } else {
            // 发布失败，显示错误消息
            console.log("getData失败");
        }
    })
    .catch(error => {
        // 处理错误
        console.error('后端爆啦:', error);
    });
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
return await axios.put(url, data) 
        .then(response => {
            // 处理响应
            if (response.data.code === 200) {
                console.log("putData成功")
            } else {
                console.log(response.data.msg);
            }
        })
        .catch(error => {
            // 处理错误
            console.error('后端爆啦:', error);
        });
}
 
