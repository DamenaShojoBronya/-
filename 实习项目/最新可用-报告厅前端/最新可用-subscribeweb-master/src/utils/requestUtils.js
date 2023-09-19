// 原生请求封装
export const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (result) => {
                // console.log(result)
                resolve(result);
            },
            fail: (err) => {
                console.log("请求失败", err)
                reject(err);
            },
        });

    })
}

// 获取加密信息和加密向量请求封装
export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: 'true',
            lang: 'zh_CN',
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
        });

    })
}


// 将时间戳转换成需要的文本
function getTimeText(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + '';
    var h = date.getHours() + '';
    var m = date.getMinutes() + '';
    // var s = date.getSeconds();
    if (h.length == 1) {
        h = '0' + h + ':';
    }
    if (h.length == 2) {
        h = h + ':';
    }
    if (m.length == 1) {
        m = '0' + m;
    }
    let TimeTextDate = Y + M + D;
    let TimeTextTime = h + m;
    return {
        TimeTextDate,
        TimeTextTime
    }
}