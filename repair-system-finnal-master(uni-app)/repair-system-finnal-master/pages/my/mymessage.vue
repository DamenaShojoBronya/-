<template>
	<view>
		<uni-list>
			<!-- 头像 -->
			<!-- <uni-list-item link>
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" :src="user.headImg" mode="widthFix"></image>
					</view>
				</template>
			</uni-list-item> -->
			
			<!-- 基本信息 -->
			<uni-list-item title="uid" :rightText="user.uid" />
			
			<uni-list-item title="用户权限" :rightText="userType[user.usertype]" />
			
			<uni-list-item title="用户名" :rightText="user.username" />
			
			<uni-list-item title="性别" :rightText="sexType[user.sex]" />
			
			<uni-list-item title="职称" :rightText="user.job" />
			
			
			<uni-list-item title="联系方式" :rightText="user.contact" />
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexType: ['女', '男'],
				userType: ['普通用户', '维修人员', '管理员'],
				user: {
					uid: getApp().globalData.id,  //用户ID
					username: getApp().globalData.username,  //用户名
					job: getApp().globalData.job, //职称
					usertype: getApp().globalData.level-1,  //权限
					contact: getApp().globalData.phone,  //联系方式
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",  //头像
				}
			}
		},
		methods: {
		}
	}
</script>

<style>
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 60rpx;
	}
	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>