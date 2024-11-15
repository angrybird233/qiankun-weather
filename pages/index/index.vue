<template>
	<view class="content">
		<view class="header-view flex-between-center">
			<view class="flex-start-center">
				<!-- <view class="icon-location"></view> -->
				<uni-icons type="location-filled" size="28" color="#fff"></uni-icons>
				<view class="current-location">西安市 雁塔区</view>
			</view>
			<view class="flex-end-center">
				<uni-icons type="plusempty" size="28" color="#fff"></uni-icons>
				<uni-icons type="more-filled" class="icon-action" size="28" color="#fff"></uni-icons>
			</view>
		</view>
		<city-dots></city-dots>
		
		<view class="tempurature">14°</view>
		<view class="flex-start-center">
			<view class="current-weather">小雨</view>
			<view class="max-temp">最高15°</view>
			<view class="min-temp">最低8°</view>
		</view>
		<view class="air-quality flex-start-center">
			<uni-icons custom-prefix="iconfont" type="icon-leaf" size="20" color="#fff"></uni-icons>
			<view class="">空气良 53</view>
		</view>
	</view>
</template>
<script>
	import CityDots from '../../components/city-dots/index.vue';
	export default {
		data() {
			return {
			}
		},
		components:{ CityDots },
		
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		min-height: 100vh;
		color: #fff;
		background: linear-gradient(#75CCF6, #75CCF6 10% );
		padding: 20px 10px;
		.header-view {
			.icon-action{
				transform: rotate(90deg);
				margin-left: 10px;
			}
		}
		.tempurature{
			font-size: 140px;
			font-family: 'Times New Roman', serif;
		}
		.current-weather {
			padding-left: 18px;
		}
		.max-temp{
			margin-left: 10px;
			margin-right: 10px;
		}
		.air-quality{
			width: fit-content;
			padding: 6px 14px;
			background: rgba(0, 0, 0, 0.15);
			border-radius: 16px;
			margin-top: 10px;
			margin-left: 14px;
		}
	}

	
</style>
