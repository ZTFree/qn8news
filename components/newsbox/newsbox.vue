<template>
	<view @click="openDetail(item)" class="newsItem">
		<image class="newsImg" :src="item.picurl ? item.picurl : nopicUrl" mode="aspectFill"></image>
		<view class="newsMsg">
			<view class="title">{{ item.title }}</view>
			<view class="other">
				<template v-if="!item.hisDate">
					<text>{{ item.author }}</text>
					<text>{{ item.hits }}浏览</text>
				</template>
				<template v-else>
					<text>浏览时间</text>
					<text>{{ date2Time(item.hisDate) }}</text>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
import dayjs from 'dayjs';
import { defineProps } from 'vue';

const props = defineProps(['item']);
const item = props.item;
const nopicUrl = `../../static/images/nopic.jpg`;

const openDetail = item => {
	// 添加新闻浏览时间
	const newsItem = {
		...item,
		hisDate: Date.now()
	};

	uni.getStorage({
		key: 'his',
		success({ data }) {
			let his = JSON.parse(data);

			// 新闻历史记录去重
			his = his.filter(item => {
				return item.id !== newsItem.id && item.classid !== newsItem.id;
			});

			his.push(newsItem);
			uni.setStorage({
				key: 'his',
				data: JSON.stringify(his)
			});
		},
		fail() {
			const his = [newsItem];
			uni.setStorage({
				key: 'his',
				data: JSON.stringify(his)
			});
		}
	});

	uni.navigateTo({
		url: '/pages/detail/detail?' + `cid=${item.classid}` + '&' + `id=${item.id}`
	});
};

const date2Time = hisDate => {
	return dayjs(hisDate).format('YYYY-MM-DD HH:mm:ss');
};
</script>

<style lang="scss" scoped>
.newsItem {
	display: flex;
	flex-direction: row;
	margin-top: 50rpx;
	.newsImg {
		// flex: 1;
		margin-right: 15rpx;
		height: 150rpx;
		width: 230rpx;
	}
	.newsMsg {
		flex: 1;
		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.other {
			margin-top: 20rpx;
			text {
				margin-right: 30rpx;
				color: gray;
				font-size: 25rpx;
			}
		}
	}
}
</style>
