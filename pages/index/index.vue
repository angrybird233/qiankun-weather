<template>
	<view class="content p-l-10 p-r-10 p-t-20 p-b-20 color-fff">
		<view class="header-view flex-between-center">
			<view class="flex-start-center">
				<uni-icons type="location-filled" size="28" color="#fff"></uni-icons>
				<view class="current-location">西安市 雁塔区</view>
			</view>
			<view class="flex-end-center">
				<uni-icons type="plusempty" size="28" color="#fff"></uni-icons>
				<uni-icons type="more-filled" class="icon-action m-l-10" size="28" color="#fff"></uni-icons>
			</view>
		</view>
		<city-dots></city-dots>
		
		<view class="tempurature font-size-140 p-l-10">-14°</view>
		<view class="flex-start-center m-l-10">
			<view class="current-weather">小雨</view>
			<view class="max-temp m-r-10">最高15°</view>
			<view class="min-temp">最低8°</view>
		</view>
		<view class="air-quality width-110 p-t-6 p-b-6 p-l-14 p-r-14 br-16 m-l-10 m-t-10 bg-000-15 flex-start-center">
			<uni-icons custom-prefix="iconfont" type="icon-leaf" size="20" color="#fff"></uni-icons>
			<view class="m-l-4">空气良 53</view>
		</view>
		
		<view class="alarm m-t-30 m-l-6 m-r-6  p-14 bg-000-15 br-16">海淀区气象台29日07时25分发布大风蓝色预警,预计，当前至29日16时，海淀区将有3、4级偏北风，阵风6、7级，请注意防范。</view>
		<view class="three-days m-l-6 m-r-6 m-t-10 m-b-10 br-16 bg-000-15">
			<view class="day-item flex p-16" v-for="(item,index) in list" :key="index">
				<view class="weather-text flex-1 flex-between-center">
					<view class="">今天</view>
					<view class="p-l-10">晴</view>
					<uni-icons custom-prefix="iconfont" type="icon-tianqi-qing" size="22" class="m-t-2" ></uni-icons>
				</view>
				<view class="temprature flex-1 flex-end-center">
					<view class="min-temp p-r-10">9°</view>
					<view class="temprature-bar"></view>
					<view class="max-temp p-l-10">15°</view>
				</view>
			</view>
		</view>
		
		<view class=" m-l-6 m-r-6 line-chart bg-fff br-16">
			<view style="width:100%;height:200px;"><l-echart ref="chartRef"></l-echart></view>
		</view>
		<!-- 降水预报 -->
		<view class="rain-forecast  p-16 m-t-10 m-l-6 m-r-6 bg-fff-15 br-16">
			<view class="title font-size-12  color-787878">降水预报</view>
			<view class="flex-between-center">
				<view class="text">
					<view class="color-000">2小时内无降雨</view>
					<view class="color-9C9C9C font-size-12 p-t-50">放心出门吧</view>
				</view>
				<view class="satellite-image width-140 height-100 br-16 bg-fff-60"></view>
			</view>
		</view>
		
		<view class="m-t-10 p-l-6 p-r-6">
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">紫外线</view>
						<view class="item-value color-191919 font-size-20 p-t-16">弱</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">湿度</view>
						<view class="item-value color-191919 font-size-20 p-t-16">60%</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">体感</view>
						<view class="item-value color-191919 font-size-20 p-t-16">15°</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">东北风</view>
						<view class="item-value color-191919 font-size-20 p-t-16">2级</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			<view class="flex">
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10 m-r-10">
					<view class="">
						<view class="item-label color-676767 font-14">日落</view>
						<view class="item-value color-191919 font-size-20 p-t-16">5:46</view>
					</view>
					<view class="item-progress"></view>
				</view>
				<view class="flex-1 flex-between-center bg-fff br-16 p-20 m-b-10">
					<view class="">
						<view class="item-label color-676767 font-14">气压</view>
						<view class="item-value color-191919 font-size-20 p-t-16">975</view>
					</view>
					<view class="item-progress"></view>
				</view>
			</view>
			
			<view class="life-assistant m-t-10 br-16 p-20 bg-fff ">
				<view class="flex-between-center m-b-30">
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-yurongfu" size="40" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">适宜厚外套</view>
					</view>
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-no-fangshai" size="34" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">无需防晒</view>
					</view>
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-shineiyundongzhongxin" size="40" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">宜室内运动</view>
					</view>
				</view>
				<view class="flex-between-center">
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-car-washing" size="32" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">适宜洗车</view>
					</view>
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-no-rain" size="36" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">不用带伞</view>
					</view>
					<view class="assistant-item flex-center flex-column">
						<uni-icons custom-prefix="iconfont" type="icon-jiaonang" size="36" color="#000"></uni-icons>
						<view class="color-000 p-t-6 font-size-14">较易感冒</view>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>
<script setup>
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js'
	import CityDots from '../../components/city-dots/index.vue';
	import * as echarts from 'echarts'
	import { onMounted, ref, nextTick } from 'vue';
	
	
	const list = ref([1,2,3])
	const chartRef = ref(null)
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
		initCharts()
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
	}

	
</style>
