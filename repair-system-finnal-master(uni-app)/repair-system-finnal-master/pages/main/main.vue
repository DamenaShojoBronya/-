<template>
	<view class="ground" >
		<!-- 滚动公告 -->
		<uni-card class="notice-card" padding="0rpx">
				<uni-notice-bar class="notice-bar" show-icon="true" scrollable="true" :text="headnotice"  backgroundColor="white"/>
		</uni-card>
		<!-- 滑块视图 -->
		<uni-card class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in slidePicture">
					<image :src="item" mode="heightFix"></image>
				</swiper-item>
			</swiper>
		</uni-card>

		
		<!-- 功能图标列表 -->
		<view>
			
			
			<!-- 普通用户功能列表 -->
			<uni-card v-if='level == 1' class="fun-card" title="服务" >
				<uni-grid  class="function" :column="4" :highlight="true" :showBorder="false" :square="false">
						<uni-grid-item  v-for="(item,index) in tabbarListUser">
							<view class="uni-grid-item">
								<image class="image" :src="item.url" @click="jumpToUser(index)"></image>
								<text>{{item.text}}</text>
							</view>
						</uni-grid-item>
				</uni-grid>
			</uni-card>
			
			<!-- 维修工功能列表 -->
			<uni-card v-if='level == 2' class="fun-card" title="服务">
				<uni-grid  class="function" :column="3" :highlight="true" :showBorder="false" :square="false">
						<uni-grid-item  v-for="(item,index) in tabbarListRepair">
							<view class="uni-grid-item">
								<image class="image" :src="item.url" @click="jumpToRepair(index)"></image>
								<text>{{item.text}}</text>
							</view>
						</uni-grid-item>
				</uni-grid>
			</uni-card>
			
			<!-- 部门负责人功能列表 -->
			<uni-card v-if='level == 3' class="fun-card" title="服务">
				<uni-grid  class="function" :column="4" :highlight="true" :showBorder="false" :square="false">
						<uni-grid-item  v-for="(item,index) in tabbarListMannager">
							<view class="uni-grid-item">
								<image class="image" :src="item.url" @click="jumpToMannager(index)"></image>
								<text>{{item.text}}</text>
							</view>
						</uni-grid-item>
				</uni-grid>
			</uni-card>
			
			<!-- 总办人员功能列表 -->
			<uni-card v-if='level == 4' class="fun-card" title="服务">
				<uni-grid  class="function" :column="4" :highlight="true" :showBorder="false" :square="false">
						<uni-grid-item  v-for="(item,index) in tabbarListAdmin">
							<view class="uni-grid-item">
								<image class="image" :src="item.url" @click="jumpToAdmin(index)"></image>
								<text>{{item.text}}</text>
							</view>
						</uni-grid-item>
				</uni-grid>
			</uni-card>
		</view>

		<!-- 公告栏 -->
		<view>
			<uni-card title="公告栏"  >
				<view v-for="item in notice" >
					<uni-card isFull="true" :title="item.title" :extra="item.time" @click="enterNotice(item)" >
						<text>{{item.text}}</text>
					</uni-card>
				</view>
			</uni-card>
		</view>


	</view>
</template>

<script>
	export default {
		props: {
			currentPagePath: String,
		},
		data() {
			return {
				level:1,
				textData: {},
				value: [],
				background: ["#FF4040", "#BF3EFF", "#98F5FF"],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				headnotice: '系统全新升级 Version 1.0, 支持待办处理',
				tabbarListUser: [
					// {
					// 	url: "../../static/main/报修.png",
					// 	text: "我要报修"
					// },
					{
						url: "../../static/main/订单.png",
						text: "我的报修"
					},
					{
						url: "../../static/main/通知.png",
						text: "查看公告"
					},
					{
						url: "../../static/main/投诉建议.png",
						text: "联系我们"
					}
				],
				tabbarListMannager: [
					// {
					// 	url: "../../static/main/维修.png",
					// 	text: "我要报修"
					// },
					{
						url: "../../static/main/详情.png",
						text: "我的报修"
					},
					{
						url: "../../static/main/部门负责人.png",
						text: "管理维修工"
					},
					{
						url: "../../static/main/审批审核.png",
						text: "分配报修"
					}
				],
				tabbarListAdmin: [
					// {
					// 	url: "../../static/main/维修.png",
					// 	text: "我要报修"
					// },
					{
						url: "../../static/main/详情.png",
						text: "我的报修"
					},
					{
						url: "../../static/main/部门负责人.png",
						text: "管理人员"
					},
					{
						url: "../../static/main/审批审核.png",
						text: "分配报修"
					}
					
				],
				tabbarListRepair: [
					{
						url: "../../static/main/维修.png",
						text: "我的任务"
					},
					{
						url: "../../static/main/详情.png",
						text: "我的报修"
					},
					{
						url: "../../static/main/通知.png",
						text: "查看公告"
					},
					{
						url: "../../static/main/投诉建议.png",
						text: "联系我们"
					}
				],
				slidePicture: ["https://usc.sysu.edu.cn/taskcenter-v4/static/img/bn%20(4).c7eb786.png",
					"https://usc.sysu.edu.cn/taskcenter-v4/static/img/bn%20(2).36925cd.png",
					"https://usc.sysu.edu.cn/taskcenter-v4/static/img/bn%20(3).6e4feb1.png"
				],
				notice: [{
						title: '系统公告',
						time: '2022-10-6',
						text: '公告内容1'
					},
					{
						title: '系统公告',
						time: '2022-10-7',
						text: '公告内容2'
					}
				]
			}
		},
		onLoad(){
			this.level=getApp().globalData.level;
			console.log(this.level)
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			jumpToUser(index) {
				switch (index) {
					// case 0:
					// 	console.log("跳转到报修页面")
					// 	uni.navigateTo({
					// 		url: './user/publish'
					// 	});
					// 	break
					case 0:
						console.log("跳转到我的报修单页面")
						uni.navigateTo({
							url: '/pages/order/adminOrder'
						});
						break
					case 1:
						console.log("跳转到公告页面")
						uni.navigateTo({
							url: './user/notice'
						});
						break
					case 2:
						console.log("跳转到其他页面")
						uni.navigateTo({
							url: "./user/contact"
						});
						break
				}
			},
			jumpToRepair(index){
				switch(index){
					case 0:
						console.log("跳转到我的任务页面")
						uni.navigateTo({
							url: '/pages/order/orderList'
						});
						break
					case 1:
						console.log("跳转到我的报修单页面")
						uni.navigateTo({
							url: '/pages/order/adminOrder'
						});
						break
					case 2:
						console.log("跳转到公告页面")
						uni.navigateTo({
							url: './user/notice'
						});
						break
				}
			},
			jumpToMannager(index) {
				switch (index) {
					// case 0:
					// 	console.log("跳转到报修页面")
					// 	uni.navigateTo({
					// 		url: './user/publish'
					// 	});
					// 	break
					case 0:
						console.log("跳转到我的保修单页面")
						uni.navigateTo({
							url: "/pages/order/adminOrder"
						});
						break
					case 1:
						
						uni.navigateTo({
							url: './repairer/Repairer_List'
						});
						console.log("跳转到维修工列表页面")
						break
					case 2:
						console.log("跳转订单分配")
						uni.navigateTo({
							url: "/pages/order/orderList"
						});
						break
				}
			},
			jumpToAdmin(index) {
				switch (index) {
					// case 0:
					// 	console.log("跳转到报修页面")
					// 	uni.navigateTo({
					// 		url: './user/publish'
					// 	});
					// 	break
					case 0:
						console.log("跳转到我的保修单页面")
						uni.navigateTo({
							url: '/pages/order/adminOrder'
						});
						break
					case 1:
						console.log("跳转到人员管理页面")
						uni.navigateTo({
							url: './repairer/Repairer_List'
						});
						break
					case 2:
						console.log("跳转订单分配")
						uni.navigateTo({
							url: "/pages/order/orderList"
						});
						break
				}
			},
			jumpToNotice(e) {
				console.log("跳转到公告页面")
				uni.navigateTo({
					url: "./user/notice"
				});
			},
			enterNotice(notice) {
				console.log("跳转到公告详情")
				uni.navigateTo({
					url: "./user/notice_detail?notice=" + JSON.stringify(notice)
				});
			}
		}
	}
</script>
<style>
	page {
	    background-color: #eeeeee;
	}
</style>
<style>
	.uni-margin-wrap {
		width: 100%;
		height: 250rpx;
	}

	.swiper {
		height: 450rpx;
		width: 100%;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
    .function{
		display: flex;
		flex-direction: row;
		justify-content: center; //水平居中
	}
	.uni-grid-item {
		display: flex;
		flex-direction: column;
		background-color: white;
		align-items: center; //垂直居中		
		justify-content: center; //水平居中
	}
	.image{
		width: 100rpx;
		height: 100rpx;
	}

	.uni-badge-left-margin {
		margin-left: 10px;
	}
	.notice-card{
		height: 20rpx;
	}
	.notic-bar{
		font-weight:bold;
		font-size: 100rpx;
	}
</style>
