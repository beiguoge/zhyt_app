const baseUrl = 'http://192.168.0.185:8080/demo';

export const getRequest = (url) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: 'GET',
			success: (res) => {
				if(res.data.code !== 200) {
					return uni.showToast({
						title: res.data.message,
						icon: 'none',
						position: 'bottom'
					})
				}
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					title: '服务器异常!',
					icon: 'none',
					position: 'bottom'
				});
				reject(err)
			}
		})
	})
};
export const postRequest = (url, params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data: params,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				if(res.data.code !== 200) {
					return uni.showToast({
						title: res.data.message,
						icon: 'none',
						position: 'bottom'
					})
				}
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					title: '服务器异常!',
					icon: 'none',
					position: 'bottom'
				});
				reject(err)
			}
		})
	})
}