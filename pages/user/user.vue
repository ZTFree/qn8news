<template>
	<view class="user">
		<view class="header">
			<view class="his_icon"><image src="../../static/images/history.png" mode="aspectFit"></image></view>
			<view class="title">浏览历史</view>
			<view class="clearHis"><button @click="clearHis">清空历史</button></view>
		</view>
		<view class="hisList"><newsbox v-for="item in hisData" :key="item.id" :item="item"></newsbox></view>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { reactive } from 'vue';

let hisData = reactive([]);

onShow(() => {
	getHis();
});

// 读取历史缓存
function getHis() {
	uni.getStorage({
		key: 'his',
		success({ data }) {
			// 按时间排序
			const his = JSON.parse(data).reverse((cur, pre) => {
				return cur.hisDate - pre.hisDate;
			});
			hisData.splice(0);
			hisData.push(...his);
		},
		fail() {
			uni.setStorage({
				key: 'his',
				data: JSON.stringify([])
			});
		}
	});
}

// 清空历史缓存
function clearHis() {
	uni.showModal({
		title: '提醒',
		content: '确定清除历史?',
		success(res) {
			if (res.confirm) {
				uni.removeStorage({
					key: 'his'
				});
				hisData.splice(0);
			}
		}
	});
}
</script>

<style lang="scss">
.user {
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f8f8f8;
		padding: 30px 0;
		.his_icon {
			margin-bottom: 20rpx;
			image {
				width: 150rpx;
				height: 150rpx;
			}
		}
		.title {
			font-size: 40rpx;
			color: gray;
		}
		.clearHis {
			margin-top: 20rpx;
			button {
				width: 250rpx;
				font-size: 40rpx;
				color: white;
				background-color: #f83a2d;
			}
		}
	}
}
</style>
