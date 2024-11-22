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
		<view class="flex-start-center">
			<view class="current-weather p-l-18">小雨</view>
			<view class="max-temp m-l-10 m-r-10">最高15°</view>
			<view class="min-temp">最低8°</view>
		</view>
		<view class="air-quality width-110 p-t-6 p-b-6 p-l-14 p-r-14 br-16 m-t-10 m-l-14 m-r-14 bg-000-15 flex-start-center">
			<uni-icons custom-prefix="iconfont" type="icon-leaf" size="20" color="#fff"></uni-icons>
			<view class="m-l-4">空气良 53</view>
		</view>
		
		<view class="alarm m-l-14 m-r-14 m-t-30 p-14 bg-000-15 br-16">海淀区气象台29日07时25分发布大风蓝色预警,预计，当前至29日16时，海淀区将有3、4级偏北风，阵风6、7级，请注意防范。</view>
		<view class="line-chart p-t-20 p-b-20">
			<view style="width:100%;height:200px;"><l-echart ref="chartRef"></l-echart></view>
		</view>
	</view>
</template>
<script setup>
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js'
	import CityDots from '../../components/city-dots/index.vue';
	import * as echarts from 'echarts'
	import { onMounted, ref, nextTick } from 'vue';
	
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

<style>
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
		.line-chart{
			overflow-x: auto;
		}
	}

	
</style>
