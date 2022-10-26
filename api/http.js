const baseOptions = {
	timeout: 10000,
}

class HttpRequest {
	constructor(baseOptions) {
		this.baseOptions = baseOptions
	}

	addInterceptors() {

		uni.addInterceptor('request', {
			invoke(args) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
			},
			success(args) {
				// pass
			},
			fail(err) {
				uni.showToast({
					title: "响应错误",
					icon: "error",
					mask: true
				})
			},
			complete(res) {
				uni.hideLoading()

			}
		})

	}

	removeInterceptor() {
		uni.removeInterceptor('request')
	}


	async request(options) {
		options = {
			...options,
			...baseOptions
		}
		this.addInterceptors()
		const res = await uni.request(options)
		if (res.data) {
			return res
		} else {
			return Promise.reject()
		}

	}
}

export const http = new HttpRequest(baseOptions)
