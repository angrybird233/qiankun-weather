
const key =  import.meta.env.VITE_WEATHER_KEY
const requestHeader = {
	'content-type': 'application/json',
	// 'Token': '',
	// 'Authorization': `Bearer ${Authorization}`
};

const hideloadingPaths = []; // 不显示loading的path
const showLoading = () => {
	uni.showLoading({
		title: '',
		mask: true,
	});
}

const showToast=(title) => {
	uni.showToast({ title,icon:'none', duration: 2000});
}

// 处理接口异常
const handleErrorResponse = (error) => {
	const { data, status } = error && error.response;
	if (error && data && status) {
		switch (status ) {
			case 500:
				showToast("[500]: 服务器错误~");
				break;
			case 401:
				showToast("[401]: 登录过期/鉴权失效");
				break;
			case 404:
				showToast("[404]: 资源不存在~");
				break;
			default:
				showToast(data.message);
				break;
		}
	} else {
		data.message && showToast(data.message);
	}
}


export const http = (url,{ method="GET", data={}, header, responseType, timeout=10000 }) => {
	return new Promise((resolve, reject) => {
		if(!hideloadingPaths.includes(url)) {
			showLoading()
		}
		if(method === 'GET') data.key = key;
		uni.request({
		    url,
		    data,
				method,
				timeout,
				responseType,
				header: {
				  ...requestHeader
				},
		    success: (res) => {
					uni.hideLoading()
					if(res && res.data.code === "200"){
						resolve(res)
					}else{
						reject(res);
					}
		    },
				fail: (error) => {
					uni.hideLoading();
					handleErrorResponse(error);
					reject(error)
				}
		});
	})
	
}