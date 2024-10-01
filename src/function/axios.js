import axios from 'axios'

export async function getData(url, params) {
await axios.get(url, {
        params
    })
    .then(response => {
        // 处理响应
        if (response.data.code === 200) {
            console.log("getData成功")
            // return response.data.data
        } else {
            // 发布失败，显示错误消息
            alert("getData失败");
        }
    })
    .catch(error => {
        // 处理错误
        console.error('后端爆啦:', error);
        alert('后端爆啦: ' + error.message);
    });
}

export async function postData(url, params) {
await axios.post(url, params)
    .then(response => {
        // 处理响应
        if (response.data.code === 200) {
            console.log("发布成功")
        } else {
            alert(response.data.msg);
        }
    })
    .catch(error => {
        // 处理错误
        console.error('后端爆啦:', error);
        alert("后端爆啦: " + error.message);
    });
}

export async function putData(url, params) {
    return await axios.put(url, params)
}