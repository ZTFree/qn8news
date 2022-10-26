<template>
	<view class="detail">
		<view class="title">
			<text>{{ newsDetail['title'] }}</text>
		</view>
		<view class="info">
			<text>作者：{{ newsDetail['author'] }}</text>
			<text>发布时间：{{ date2Time(newsDetail['posttime']) }}</text>
		</view>
		<view class="content"><rich-text :nodes="newsDetail['content']"></rich-text></view>
		<view class="description">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { getDetail } from '@/api/request/detail.js';
import { ref } from 'vue';
import dayjs from 'dayjs';

const newsDetail = ref({});

onLoad(newsMsg => {
	getDetail(newsMsg).then(({ data }) => {
		newsDetail.value = data;
	});
});

function date2Time(date) {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
</script>

<style lang="scss" scoped>
.detail {
	padding: 30rpx;
	.title {
		line-height: 80rpx;
		margin-bottom: 50rpx;
		font-size: 50rpx;
	}
	.info {
		margin-bottom: 50rpx;
		font-size: 26rpx;
		color: gray;
		text:first-child {
			margin-right: 100rpx;
		}
	}
	.content {
		img {
			width: 100%;
		}
	}
	.description {
		font-size: 26rpx;
		margin-top: 50rpx;
		color: red;
		background-color: #dee1e6;
	}
}
</style>
