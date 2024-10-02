import axios from 'axios'

export async function getData(url, params) {
return await axios.get(url, {
        params
    })
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

export async function postData(url, params) {
return await axios.post(url, params)
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

export async function putData(url, params) {
    return await axios.put(url, params) 
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
 
