const getBaseUrl = () => {
	const baseUrl = {
		dev: 'https://172.16.11.244:8081',
	};
	return baseUrl.dev;
}

export default {
	/**
	 * 接口基础路径
	 */
	baseUrl: getBaseUrl(),
	/**
	 * 数据请求
	 */
	request(url, data = {}, callback = () => {}, isGet = true, responseType = "text") {
		console.log(data);
		uni.request({
			url: this.baseUrl + url,
			method: isGet ? "GET":"POST",
			// header: {
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// 	token: store.getters.token
			// },
			data,
			responseType: responseType,
			complete: (res) => {
				console.log(res);
				callback(res);
			}
		});
	},
	/**
	 * 文件上传
	 */
	upload(url, path, callback = () => {}, fileName = 'file') {
		uni.uploadFile({
			url: this.baseUrl + url,
			filePath: path,
			name: fileName,
			complete: (res) => {
				if (res.statusCode == 200) {
					callback(JSON.parse(res.data));
				} else {
					callback({
						state: 'fail',
						msg: '上传失败'
					});
				}
			}
		});
	}
}