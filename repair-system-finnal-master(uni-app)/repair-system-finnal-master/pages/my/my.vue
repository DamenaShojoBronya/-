<template>
	<view>
		<!-- 头像 -->
		<!-- <view class="hello">下午好，{{username}}</view> -->
	<cover-view class="profile"  >
       <image class="avater" :src="info.avatarUrl"></image>
	   <view class="userinfo">
		   <text style="font-weight:700;font-size: 50rpx;">{{username}}</text>
		   <view style="height: 20rpx;"></view>
		   <text style="font-weight:300;font-size: 30rpx;">UID：{{uid}}</text>
	   </view>
	   
	</cover-view>  
       <view style="height: 80rpx;"></view>
		<!-- 列表 -->
		<view>
			<uni-list>
				<uni-list-item :show-extra-icon="true" showArrow="true" :extra-icon="extraIcon[0]" title="用户信息"
					@click="jumpToMyMessage" link />
				<uni-list-item :show-extra-icon="true" showArrow="true" :extra-icon="extraIcon[1]" title="常见问题"
					@click="jumpToQuestion" link />
				<uni-list-item :show-extra-icon="true" showArrow="true" :extra-icon="extraIcon[2]" title="版本信息"
					@click="jumpToVersion" link />
				<uni-list-item :show-extra-icon="true" showArrow="true" :extra-icon="extraIcon[3]" title="设置"
					@click="jumpToSetting" link />
			</uni-list>
		</view>
		<tabBar :pagePath="'/pages/my/my'"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			const generateLev = _ => {
				const indentity = ["user", "repair", "admin"];
				return indentity[getApp().globalData.level - 1];
			};

			return {
                info:{},
				ulevel: generateLev(),
				uid: "",
				username: "",
				extraIcon: [{
						color: '#3A5FCD',
						size: '22',
						type: 'auth'
					},
					{
						color: '#CD0000',
						size: '22',
						type: 'help-filled'
					},
					{
						color: '#EEEE00',
						size: '22',
						type: 'bars'
					},
					{
						color: '#B0B0B0',
						size: '22',
						type: 'gear-filled'
					}
				]
			}
		},
		methods: {
			jumpToMyMessage(e) {
				console.log("跳转到我的信息页")
				uni.navigateTo({
					url: "./mymessage"
				});
			},
			jumpToQuestion(e) {
				console.log("跳转到常见问题页")
				uni.navigateTo({
					url: "./question"
				});
			},
			jumpToVersion(e) {
				console.log("跳转到版本信息页")
				uni.navigateTo({
					url: "./version"
				});
			},
			jumpToSetting(e) {
				console.log("跳转到设置页")
				uni.navigateTo({
					url: "./setting"
				});
			}
		},
		onShow() {
			this.uid = getApp().globalData.id;
			if(getApp().globalData.userWechatInfo.avatarUrl!=null){
				this.info=getApp().globalData.userWechatInfo;
				
			}
			else{
				this.info.avatarUrl="../../static/my/defaultProfile.png";
			}
			this.username = getApp().globalData.username;
			console.log(this.uid);
		}
	}
</script>

<style>
	.profile{
		margin-left: 5%;
		margin-top: 5%;
		display: flex;
		flex-direction:row;
	}
	.avater{
		border-radius: 5%;
		width: 120rpx;
		height: 120rpx;
	}
	.userinfo{
		margin-left: 5%;
		display: flex;
		flex-direction: column;
	}

</style>
