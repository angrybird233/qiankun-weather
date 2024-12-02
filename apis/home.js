import { http } from '@/utils/request.js';

// 城市搜索
export const searchCity= data => {
	return http('https://geoapi.qweather.com/v2/city/lookup',{
		method: 'GET',
		data
	})
}

// 获取实时天气数据
export const getRealTimeWeather = data => {
	return http('https://devapi.qweather.com/v7/weather/now',{
		method: 'GET',
		data
	})
}

// 未来三天天气预报
export const getThreeDaysWeather = data => {
	return http('https://devapi.qweather.com/v7/weather/3d',{
		method: 'GET',
		data
	})
}

// 未来7天天气预报
export const getSevenDaysWeather = data => {
	return http('https://devapi.qweather.com/v7/weather/7d',{
		method: 'GET',
		data
	})
}

// 天气预警
export const getWeatherAlert = data => {
	return http('https://devapi.qweather.com/v7/warning/now',{
		method: 'GET',
		data
	})
}
// 生活指数
export const getLifeIndices = data => {
	return http('https://devapi.qweather.com/v7/indices/1d',{
		method: 'GET',
		data
	})
}
// 实时空气质量
export const getAirQuality = data => {
	return http(`https://devapi.qweather.com/airquality/v1/current/${data.latitude}/${data.longitude}`,{
		method: 'GET',
		data
	})
}

// 防晒指数
export const getSolarRadiation = data => {
	return http(`https://devapi.qweather.com/v7/solar-radiation/24h`,{
		method: 'GET',
		data
	})
}
