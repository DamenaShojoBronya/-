<template>
	<!-- <u-cell-group>
		<u-cell-item title="修改手机号码" @click="phone" >
		</u-cell-item>
		<u-cell-item title="修改用户名" @click="username" >
		</u-cell-item>
		<u-cell-item title="修改密码" @click="password" >
		</u-cell-item>
		<u-cell-item title="修改职称" @click="job" >
		</u-cell-item>
	</u-cell-group> -->
	<uni-list>
		<uni-list-item  showArrow="true" title="手机号码" :rightText="phone"
			@click="tophone" link />
		<uni-list-item  showArrow="true"  title="用户名" :rightText="username"
			@click="tousername" link />
		<view class="container">
		     <!-- 分割线 -->
		  <view class="divLine"></view>
		</view>
		<uni-list-item v-if="level!=1" showArrow="true"  title="密码" 
			@click="topassword" link />
		<view class="container">
			 <!-- 分割线 -->
		  <view class="divLine"></view>
		</view>
		<uni-list-item  showArrow="true"  title="更多安全设置" 
			 link />
	</uni-list>
</template>

<script>
	export default{
		data(){
			return{
				username:"",
				phone:"",
				level:""
			};
		},
		onLoad() {
			this.username=getApp().globalData.username;
			this.phone=getApp().globalData.phone;
			this.level=getApp().globalData.level;
		},
		methods:{
			topassword(){
				uni.navigateTo({
					url:"password"
				})
			},
			tophone(){
				uni.navigateTo({
					url:"phone"
				})
			},
			tojob(){
				uni.navigateTo({
					url:"job"
				})
			},
			tousername(){
				uni.navigateTo({
					url:"username"
				})
			},
		}
	}
</script>

<style>
	.divLine{
	 background: #E0E3DA;
	 width: 100%;
	 height: 20rpx;
	}
</style>