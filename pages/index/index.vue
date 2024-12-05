<template>
	<view class="content p-l-10 p-r-10 p-t-20 p-b-20 color-fff">
		<view class="header-view flex-between-center">
			<view class="flex-start-center">
				<uni-icons type="location-filled" size="28" color="#fff"></uni-icons>
				<view class="current-location">{{realTimeInfo.city}} {{ realTimeInfo.area }}</view>
			</view>
			<view class="flex-end-center">
				<uni-icons type="plusempty" size="28" color="#fff" @click="goAddCity"></uni-icons>
				<uni-icons type="more-filled" class="icon-action m-l-10" size="28" color="#fff"></uni-icons>
			</view>
		</view>
		<city-dots></city-dots>
		
		<view class="tempurature font-size-140 p-l-10">{{realTimeInfo.temp}}°</view>
		<view class="flex-start-center m-l-10">
			<view class="current-weather m-r-10">{{realTimeInfo.text}}</view>
			<view class="max-temp m-r-10">最高{{realTimeInfo.tempMax}}°</view>
			<view class="min-temp">最低{{ realTimeInfo.tempMin }}°</view>
		</view>
		<view class="air-quality width-120 p-t-6 p-b-6 p-l-14 p-r-14 br-16 m-l-10 m-t-10 m-b-70 bg-000-15 flex-start-center">
			<uni-icons custom-prefix="iconfont" type="icon-leaf" size="20" color="#fff"></uni-icons>
			<view class="m-l-4">空气{{ realTimeInfo.airQuality }} {{ realTimeInfo.airQualityText }}</view>
			<view class="aqi-color width-14 height-14 br-7 m-l-6 m-t-1" :style="{'background': realTimeInfo.AQI_color }"></view>
		</view>
		
		<view class="alarm m-t-30 m-l-6 m-r-6 p-14 bg-000-15 br-16" v-if="alertText">{{ alertText }}</view>
		<view class="three-days m-l-6 m-r-6 m-t-10 br-16 bg-000-15">
			<view class="day-item flex p-16" v-for="(item, index) in threeDayList" :key="index">
				<view class="weather-text flex-1 flex-start-center">
					<view class="">{{ filterDate(item.fxDate, index)  }}</view>
					<view class="p-l-10 width-80">{{ isNight ? item.textDay : item.textNight }}</view>
					<uni-icons 
						custom-prefix="qweather-icons" 
						:type=" isNight ? 'qi-'+item.iconNight : 'qi-'+item.iconDay"
						color="#fff"
						size="22" class="m-t-2" >
					</uni-icons>
				</view>
				<view class="temprature flex-1 flex-end-center">
					<view class="min-temp p-r-10">{{ item.tempMin }}°</view>
					<view class="temprature-bar"></view>
					<view class="max-temp p-l-10">{{ item.tempMax }}°</view>
				</view>
			</view>
			<view class="day-item flex-center p-14 color-fff">
				<button class="width-500 bg-fff-15 br-12 color-fff font-size-14">查看近15日天气预报</button>
			</view>
		</view>
		
		<view class=" m-l-6 m-r-6 line-chart bg-fff br-16 m-t-10">
			<view style="width:100%;height:200px;"><l-echart ref="chartRef"></l-echart></view>
		</view>
		<!-- 降水预报 -->
		<view class="rain-forecast  p-16 m-t-10 m-l-6 m-r-6 bg-fff-15 br-16">
			<view class="title font-size-12  color-787878">降水预报</view>
			<view class="flex-between-center">
				<view class="text">
					<view class="color-555">{{ rainInfo.summary }}</view>
					<view class="color-333 font-size-12 p-t-50" v-if="!rainInfo.isRain">放心出门吧</view>
					<view class="color-333 font-size-12 p-t-50" v-else>出门记得带伞</view>
				</view>
				<view class="satellite-image width-140 height-100 br-16 bg-fff-60"></view>
			</view>
		</view>
		
		<view class="m-t-10 p-l-6 p-r-6">
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">紫外线</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{ lifeIndicesInfo.uv.text }}</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">湿度</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{lifeIndicesInfo.humidity}}%</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">体感</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{lifeIndicesInfo.feelsLike}}°</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">{{ lifeIndicesInfo.windDir }}</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{ lifeIndicesInfo.windScale }}级</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">日落</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{ lifeIndicesInfo.sunset }}</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">气压</view>
						<view class="item-value color-191919 font-size-20 p-t-16">{{lifeIndicesInfo.pressure }}</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			
			<view class="life-assistant m-t-10 br-16 p-t-20 p-b-20 bg-fff ">
				<view class="flex m-b-30">
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-yurongfu" size="40" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ lifeIndicesInfo.drsg.text }}</view>
					</view>
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons v-if="lifeIndicesInfo.spi.level>=3" custom-prefix="iconfont" type="icon-fangshai" size="34" color="#000"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-no-fangshai" size="34" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ lifeIndicesInfo.spi.text }}</view>
					</view>
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-shineiyundongzhongxin" size="40" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ lifeIndicesInfo.sport.text }}</view>
					</view>
				</view>
				<view class="flex">
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-car-washing" size="32" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ lifeIndicesInfo.cw.text }}</view>
					</view>
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons v-if="rainInfo.isRain" custom-prefix="iconfont" type="icon-umbrella" size="36" color="#000"></uni-icons>
						<uni-icons v-else custom-prefix="iconfont" class="reverse" type="icon-no-rain" size="36" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ rainInfo.isRain? '记得带伞' :'不用带伞' }}</view>
					</view>
					<view class="assistant-item flex-1 flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-jiaonang" size="36" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">{{ lifeIndicesInfo.flu.text }}感冒</view>
					</view>
				</view>
			</view>
			
			<view class="footer flex-center p-t-10 p-b-20 font-size-12">
				<view class="color-000">气象数据来自</view>
				<view class="color-blue m-l-4" @click="goDetail">和风天气</view>
			</view>
			
		</view>
		
	</view>
</template>
<script setup>
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js'
	import CityDots from '@/components/city-dots/index.vue';
	import * as echarts from 'echarts'
	import { onMounted, ref, reactive, nextTick, computed, } from 'vue';
	import {
		searchCity,
		getRealTimeWeather,
		getThreeDaysWeather,
		getSevenDaysWeather,
		getWeatherAlert,
		getLifeIndices,
		getAirQuality,
		getRainBroadcast,
		getSunriseAndSunset
	} from '@/apis/home.js'
	
	const list = ref([1,2,3])
	const chartRef = ref(null)
	const alertText = ref(null)
	let longitude,latitude;
	const realTimeInfo = reactive({
		city: "",
		area: "",
		temp: 0,
		icon: "",
		text: "",
		tempMin: 0,
		tempMax: 0,
		airQuality: 0,
		airQualityText: "",
		fxLink:""
	})
	let threeDayList = ref([]);
	
	
	// 获取当前位置坐标
	const getCurrentLocation = () => {
		uni.getLocation({
			type: 'jcg-02',
			success: (res) => {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				if(res.longitude && res.latitude) {
					longitude =  res.longitude;
					latitude =  res.latitude;
					// longitude =  108.9032;
					// latitude =  34.2407;
					getCityByLngLat();
					getNowWeather();
					getAirQualityInfo();
					getThreeDaysWeatherInfo();
					getWeatherAlertInfo();
					getRainBroadcastInfo();
					getLifeIndicesData();
					getSunriseAndSunsetInfo()
				}
			}
		});
	};
	// 通过经纬度获取城市信息
	const getCityByLngLat = async () => {
		try{
			const params = { 
				mapKey: true, 
				location: `${longitude},${latitude}`
			}
			const { data } = await searchCity(params);
			if(data && data.regeocode && data.regeocode.addressComponent) {
				const {city, district} = data.regeocode.addressComponent;
				realTimeInfo.city = city;
				realTimeInfo.area = district;
			}
		}catch(err){
			console.log(err)
		}
	}
	
	// 获取当前天气信息
	const getNowWeather = async () => {
		try{
			const params = {location: `${longitude},${latitude}`}
			const res = await getRealTimeWeather(params);
			if(res && res.data && res.data.now) {
				const {temp, text, icon, windDir,windScale,pressure,feelsLike,humidity } = res.data.now;
				realTimeInfo.temp = temp;
				realTimeInfo.text = text;
				realTimeInfo.icon = icon;
				realTimeInfo.fxLink = res.data.fxLink;
				lifeIndicesInfo.windDir = windDir
				lifeIndicesInfo.windScale = windScale
				lifeIndicesInfo.pressure = pressure
				lifeIndicesInfo.feelsLike = feelsLike
				lifeIndicesInfo.humidity = humidity
			}
		}catch(e){
			console.log('error', e);
			//TODO handle the exception
		}
	}
	
	const goAddCity = () => {
		uni.navigateTo({
			url: '/pages/add-city/add-city'
		})
	}
	const goDetail = () => {
		if(realTimeInfo.fxLink){
			location.href = realTimeInfo.fxLink
		}
	}
	
	const isNight = computed(() => new Date().getHours() >= 20 );
	const filterDate = (date, index) => {
		const weekDays = ["日", "一", "二", "三", "四", "五", "六"];  
		const day = new Date(date).getDay();  
		if(index === 0) return '今天';
		if(index === 1) return '明天';
		if(index === 2) return '周'+ weekDays[day]
	}
	// 获取近三天天气
	const getThreeDaysWeatherInfo = async ()=> {
		try{
			const params = {location: `${longitude},${latitude}`}
			const { data } = await getThreeDaysWeather(params);
			if(data) {
				threeDayList.value = data.daily;
				if(data.daily.length){
					const { tempMax, tempMin } = data.daily[0];
					realTimeInfo.tempMin = tempMin;
					realTimeInfo.tempMax = tempMax;
				}
			}
		}catch(err){
			console.error(err);
		}
	}  
	
	// 获取空气质量数据
	const getAirQualityInfo = async () => {
		try{
			const params = { longitude, latitude }
			const { data } = await getAirQuality(params);
			if(data && data.indexes) {
				const {aqiDisplay,category, color } = data.indexes[0];
				realTimeInfo.airQuality = aqiDisplay;
				realTimeInfo.airQualityText = category;
				realTimeInfo.AQI_color = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`
			}
		}catch(err){
			console.error(err);
		}
	}
	
	// 获取天气预警信息
	const getWeatherAlertInfo = async () => {
		try {
			const params = {location: `${longitude},${latitude}`}
			const { data } = await getWeatherAlert(params);
			if(data && data.warning){
				const { text } = data.warning;
				alertText.value = text
			}
		} catch (error) {
			console.error(error)
		}
	}
	
	let rainInfo = reactive({ summary: "", isRain: false })
	// 获取未来降水数据
	const getRainBroadcastInfo = async () => {
		try {
			const params = {location: `${longitude},${latitude}`}
			const {data} = await getRainBroadcast(params);
			if(data) {
				const {summary, minutely } = data;
				const index = minutely && minutely.findIndex(item => Number(item.precip)>0)
				rainInfo.summary = summary;
				rainInfo.isRain= index > -1 ? true : false
			}
		} catch (error) {
			console.error(error)
		}
	}
	
	const indicesRules = [
		{ type: 1, value: 0, en: 'sport' , level_cn: { 1:'宜户外运动', 2:'宜室内运动', 3:'宜室内运动'} },
		{ type: 2, value: 0, en: 'cw' , level_cn:	{ 1:'适宜洗车', 2:'适宜洗车', 3:'不宜洗车', 4: '不宜洗车'} }	,																										
		{ type: 3, value: 0, en: 'drsg' , level_cn: { 1:'适宜羽绒服', 2:'适宜厚外套', 3:'适宜厚外套', 4:'适宜薄外套', 5: '适宜衬衫', 6:'适宜T恤', 7:'适宜T恤'} },			
		{ type: 5, value: 0, en: 'uv' , level_cn:  { 1:'弱',2:'弱',3:'中等',4:'强',5:'很强'} },
		{ type: 9, value: 0, en: 'flu' , level_cn: { 1:'不易', 2:'较易', 3:'易', 4:'极易' } },																								
		{ type: 16, value: 0, en: 'spi' , level_cn: { 1:'无需防晒', 2:'无需防晒', 3:'注意防晒',  4:'注意防晒',5:'注意防晒'	} }			
	]
	const lifeIndicesInfo = reactive({
		feelsLike: 0, //体感温度
		windDir: "",// 风向
		windScale: 1, //风力等级
		pressure: 0, //气压
		humidity: 0, //湿度
		sunset: '5:00', //日落
		uv: {text:'', level: 1}, // 紫外线指数
		drsg: {text:'', level: 1}, // 穿衣指数
		spi: {text:'', level: 1} , // 防晒指数
		sport: {text:'', level: 1}, // 运动指数
		cw: {text:'', level: 1}, //洗车指数
		flu: {text:'', level: 1}, // 感冒指数
	})
	// 获取生活指数
	const getLifeIndicesData = async () => {
		try {
			const params = {location: `${longitude},${latitude}`, type: '1,2,3,5,9,16,'}
			const {data} = await getLifeIndices(params);
			if(data && data.daily) {
				data.daily.forEach(item => {
					indicesRules.forEach(val => {
						if(Number(item.type) === val.type) {
							val.value = Number(item.level)
						}
					})
				})
				indicesRules.forEach(item => {
					for(const key in lifeIndicesInfo){
						if(key === item.en){
							lifeIndicesInfo[item.en].text = item.level_cn[item.value];
							lifeIndicesInfo[item.en].level = item.value
						}
					}
				})
			}
		} catch (error) {
			console.error(error)
		}
	}
	
	// 获取日出日落时间
	const getSunriseAndSunsetInfo = async ()=> {
		try {
			const now = new Date().toLocaleDateString();
			let date_arr = now.split('/');
			date_arr = date_arr.map(item => {
				if(Number(item) < 10) {
					return '0'+ item
				}else{
					return item
				}
			})
			const date = date_arr.join('')
			const params = {location: `${longitude},${latitude}`, date }
			const {data} = await getSunriseAndSunset(params);
			if(data){
				const { sunset } = data;
				const hours = new Date(sunset).getHours();
				const minutes = new Date(sunset).getMinutes()
				lifeIndicesInfo.sunset = hours +':'+ minutes
			}
		} catch (error) {
			//TODO handle the exception
		}
	}
	//这里请求服务器拿到数据
	const res = {
		//x轴数据
		xData: ['6/11', '6/12', '6/13', '6/14', '6/15', '6/16', '6/17'],
		//y轴数据
		yData: [50, 120, 150, 220, 180, 300, 130]
	}
	const option = {
		xAxis: {
			type: 'category',
			// x轴数据文字颜色
			axisLabel: {
				color: '#a7a7a7'
			},
			// x轴那天坐标轴线的颜色
			axisLine: {
				lineStyle: {
					color: '#f1f1f1'
				}
			},
			//x轴上面刻度线隐藏
			axisTick: {
				show: false,
			},
			//这里是x轴数据
			data: res.xData
		},
		//设置网格
		grid: {
			top: 40,
			bottom: 30
		},
		//y轴设置
		yAxis: {
			type: 'value',
			//y轴标签文字颜色
			axisLabel: {
				color: '#a7a7a7'
			},
			// y轴分割线设置为虚线
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed'
				}
			}
		},
		//设置提示为点击时
		tooltip: {
			trigger: 'axis',
			triggerOn: 'click',
			formatter: '{b} \n 数据: {c}'
		},
		//设置曲线的颜色
		color: ['#4e9d77'],
		series: [{
			//这里是数据
			data: res.yData,
			type: 'line',
			//设置为平滑，默认为折线
			smooth: true,
		}],
		//设置数据缩放，手指缩放
		// dataZoom:{
		// 		type:'inside',//inside移动端就是手指缩放，slider
		// 		id:'123',
		// }
	}
	const initCharts = async () => {
		if(!chartRef.value) return
		const myChart = await chartRef.value.init(echarts)
		myChart.setOption(option)
	}
	
	onMounted(() => {
		getCurrentLocation();
		initCharts();
	})
				
			
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: linear-gradient(#75CCF6, #75CCF6 10% );
		.header-view {
			.icon-action{
				transform: rotate(90deg);
			}
		}
		.tempurature{
			font-family: 'Times New Roman', serif;
		}
		.day-item{
			border-bottom-width: 1px;
			border-bottom-style: solid;
			border-bottom-color: rgba(255,255,255,0.3);
			&:last-child {
				border-bottom: none;
			}
		}
		.line-chart{
			overflow-x: auto;
		}
		.reverse{
			transform: rotate(180deg);
		}
	}

	
</style>
