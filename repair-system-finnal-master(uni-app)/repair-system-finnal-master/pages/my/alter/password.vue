<template>
	<view >
		<view v-if="!show">
			
			
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			<uni-card isFull="true">
				<view>
				   <label style="float:left;margin-left: 10px; color: gray;">手机号 </label><view class="input" style="color: gray;">{{phone}} </view>
				</view>
			</uni-card>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			
			<uni-card isFull="true">
				<view> 
				   <label style="float:left;margin-left: 10px;font-weight: 1000;">原密码 </label><input class="input" v-model="mypwd" placeholder="填写原密码" type="safe-password"/>
				</view>
			</uni-card>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			<uni-card isFull="true">
				<view>
				   <label style="float:left;margin-left: 10px; font-weight: 1000;">新密码 </label><input class="input" v-model="newpwd" placeholder="填写新密码" type="safe-password"/>
				</view>
			</uni-card>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			<uni-card isFull="true">
				<view>
				   <label style="float:left;margin-left: 10px; font-weight: 1000;">确认密码 </label><input class="input" v-model="repwd" placeholder="再次填写密码" type="safe-password"/>
				</view>
			</uni-card>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine2"></view>
			</view>
			
			<view  class="head" style="color: gray;font-size: 30rpx;">密码能作为登录和找回的凭证</view>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine3"></view>
			</view>
			
			<button class="but" @click="submit">完成</button>
			</view>
		
		
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				mypwd:"",
				newpwd:"",
				repwd:"",
				phone:"",
				show:false,
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"设置密码"
			});
			this.mypwd=getApp().globalData.password;
			this.phone=getApp().globalData.phone;
		},
		methods: {
			jump(){
				this.show=true;
			},
			submit() {
			   if(this.newpwd==null){
				   uni.showToast({
				   	icon: 'error',
				   	title: "不能为空",
				   	duration:1000,
				   });
				   return;
			   }
			   if(this.newpwd!=this.repwd){
				   uni.showToast({
					icon: 'error',
					title: "两次密码不一样",
					duration:1000,
				   });
				   return;
			   }    
			   this.$util.request("/user/mod_pwd",{
					uid:getApp().globalData.id,
					upassword:this.newpwd
				},(res)=>{
					if (res.data.code==200) {
						uni.showToast({
							icon: 'success',
							title: "等待审核",
							duration:1000,
						});
						getApp().globalData.password=this.newpwd;
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
	 height: 80rpx;
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
	  width: 60%;
	  margin-left: 100px;
	  margin-right: 50px;
	  border-bottom: 2px solid green;
	}
	.mb-10 {
			margin-bottom: 10px;
		}
</style>
