<template>
	<view >
		<view v-if="!show">
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			<view style="text-align: center">
				<image src="../../../static/public/login/logo.png" mode="aspectFit" style="width: 260rpx; height: 140rpx"></image>
			</view>
			<view  class="head">用户名：{{myusername}}</view>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine2"></view>
			</view>
			<view class="tail">用户名是登录的最后凭证</view>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine3"></view>
			</view>
			<button class="but" @click="jump">修改用户名</button>
			</view>
		<view  v-if="show">
			<input class="input" v-model="newphone" placeholder="填写本人的真实姓名" type="text"/>
            <view class="container">
            	 <!-- 分割线 -->
              <view class="divLine3"></view>
            </view>
            <button class="but" @click="submit">完成</button>
            </view>		
		</view>
		
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				myusername:"",
				newusername:"",
				show:false,
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"手机号"
			});
			this.myusername=getApp().globalData.username;
		},
		methods: {
			jump(){
				this.show=true;
			},
			submit() {
				       this.$util.request("/user/modUserinfo",{
						    uid:getApp().globalData.id,
							uphone:this.newphone
						},(res)=>{
							if (res.data.code==200) {
								uni.showToast({
									icon: 'success',
									title: "等待审核",
									duration:1000,
								});
								getApp().globalData.username=this.username;
								setTimeout(function() {
								 let pages = getCurrentPages(); // 当前页面
								 let beforePage = pages[pages.length - 2]; // 上一页
								 uni.navigateBack({
									 success: function() {
										 beforePage.onLoad(); // 执行上一页的onLoad方法
									 }
								 });
								}, 1000);
							}							
						},false)
					}
		},
	}
</script>

<style lang="scss">
	.divLine1{
	 background: #ffffff;
	 width: 100%;
	 height: 200rpx;
	}
	.divLine2{
	 background: #ffffff;
	 width: 100%;
	 height: 20rpx;
	}
	.divLine3{
	 background: #ffffff;
	 width: 100%;
	 height: 600rpx;
	}
	.head{
		display:flex;
		justify-content: center;
		font-size: 50rpx;
	}
	.tail{
		display:flex;
		justify-content: center;
		font-size: 30rpx;
	}
	.but{
		width: 50%;
		background-color: #67cf99;
		color: white;
	}
	.input{
	  width: 80%;
	  margin-left: 50px;
	  margin-right: 50px;
	  border-bottom: 2px solid green;
	  margin-top: 80px;
	}
</style>
