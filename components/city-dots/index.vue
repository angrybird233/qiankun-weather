<template>
	<view class="dot-list">
		<view class="dot-item" :class="active === index?'active':''" v-for="(item,index) in length" :key="index"></view>
	</view>
</template>

<script>
	export default {
		name:"city-dots",
		props: {
			length: {
				type: Number,
				default: 3
			},
			active: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.dot-list {
	display: flex;
	align-items: center;
	width: fit-content;
	padding: 10px 5px;
	.dot-item {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #ddd;
		margin-right: 4px;
		&.active {
			background: #fff;
			width: 8px;
			height: 8px;
		}
	}
}
</style>