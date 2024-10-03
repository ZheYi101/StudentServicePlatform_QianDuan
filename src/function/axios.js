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
console.log(data)
return await axios.post(url, data)
    .then(response => {
        // 处理响应
        if (response.data.code === 200) {
            console.log("发布成功")
        } else {
            console.log(response.data);
        }
    })
    .catch(error => {
        // 处理错误
        console.error('后端爆啦:', error);
        return response.data;
    });
}

export async function putData(url, data) {
    return await axios.put(url, data) 
        .then(response => {
            // 处理响应
            if (response.data.code === 200) {
                console.log("发布成功")
                return response.data.data;
            } else {
                console.log(response.data.msg);
            }
        })
        .catch(error => {
            // 处理错误
            console.error('后端爆啦:', error);
        });
}
 
