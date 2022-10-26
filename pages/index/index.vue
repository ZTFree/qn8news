<template>
	<view class="index">
		<scroll-view scroll-x="true" show-scroll="false" class="navscroll">
			<view class="nav-item" :class="activeIndex === index ? 'active' : ''" v-for="(item, index) in navData" :key="item.id" @click="itemSelect(item, index)">
				{{ item.classname }}
			</view>
		</scroll-view>
		<template v-if="newsData.length !== 0">
			<view class="newsList"><newsbox v-for="item in newsData" :key="item.id" :item="item"></newsbox></view>
			<view class="bottomMsg">
				<template v-if="loadingState === 1">
					加载中
				</template>
				<template v-if="loadingState === 2">
					无更多内容
				</template>
			</view>
		</template>
		<template v-else>
			<view class="nodata">
				<image src="../../static/images/nodata.png" mode="aspectFit"></image>
				<text>内容为空</text>
			</view>
		</template>
	</view>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue';
import { getNavData, getNewsData } from '@/api/request/index.js';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';

let navData = reactive([]);
let newsData = reactive([]);

// 当前新闻类目nav索引
let activeIndex = ref(-1);

// 当前新闻类目id
let curCid = null;

// 获取新闻条数
const num = 8;
// 新闻数据分页页码
let curPage = 1;
// 触底状态
let loadingState = ref(0);

onLoad(() => {
	initNav().then(() => {
		updateNewsData();
	});
});

onReachBottom(() => {
	curPage++;
	updateNewsData();
});

// 激活新闻类目nav
const itemSelect = (navItem, index) => {
	if (activeIndex.value === index) {
		return;
	}
	activeIndex.value = index;
	curCid = navItem.id;
	curPage = 1;
	loadingState.value = 0;
	updateNewsData();
};

// 初始化新闻类目nav栏
function initNav() {
	return getNavData().then(({ data }) => {
		activeIndex.value = 0;
		curCid = data.length > 0 ? data[0].id : null;
		navData.push(...data);
	});
}

// 获取新闻数据
function updateNewsData() {
	nextTick(() => {
		loadingState.value = 1;
	});

	getNewsData(curCid, num, curPage).then(({ data }) => {
		if (curPage === 1) {
			newsData.splice(0);
		}
		if (data.length === 0) {
			loadingState.value = 2;
			curPage--;
			return;
		} else {
			newsData.push(...data);
		}
	});
	nextTick(() => {
		loadingState.value = 0;
	});
}
</script>

<style lang="scss" scoped>
.index {
	.navscroll {
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 1;
		background-color: #f7f8fa;

		white-space: nowrap;

		.nav-item {
			padding: 20rpx 30rpx;
			display: inline-block;

			font-size: 40rpx;
		}

		.active {
			color: #31c27c;
		}
	}

	.newsList {
		margin-top: 100rpx;
		padding: 0 30rpx;
		font-size: 32rpx;
		display: flex;
		flex-direction: column;
	}
	.nodata {
		position: relative;
		margin-top: 100rpx;
		image {
			width: 100%;
		}
		text {
			position: absolute;
			top: 80rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 50rpx;
			color: gray;
		}
	}

	.bottomMsg {
		width: 200rpx;
		height: 200rpx;
		margin: 20rpx auto;
		line-height: 200rpx;
		color: gray;
	}
}
</style>
