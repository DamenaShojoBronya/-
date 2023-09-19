<template>
	<view >
		<view v-if="!show">
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine1"></view>
			</view>
			
			<view  class="head">已绑定手机号：{{myphone}}</view>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine2"></view>
			</view>
			<view class="tail">手机号有助于联系您</view>
			<view class="container">
				 <!-- 分割线 -->
			  <view class="divLine3"></view>
			</view>
			<button class="but" @click="jump">更换手机号</button>
			</view>
		<view  v-if="show">
			<label style="float:left;margin-left: 10px; ">+86 </label><input class="input" v-model="newphone" placeholder="你本人的手机号" type="number"/>
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
				myphone:"",
				newphone:"",
				show:false,
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:"手机号"
			});
			this.myphone=getApp().globalData.phone;
		},
		methods: {
			jump(){
				this.show=true;
			},
			submit() {
				       this.$util.request("/user/mod_phone",{
						    uid:getApp().globalData.id,
							uphone:this.newphone
						},(res)=>{
							if (res.data.code==200) {
								uni.showToast({
									icon: 'success',
									title: "等待审核",
									duration:1000,
								});
								getApp().globalData.phone=this.newphone;
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
							else if(res.data.code==401){
								uni.showToast({
									icon: 'error',
									title: "格式错误",
									duration:1000,
								});
							}
							else{
								uni.showToast({
									icon: 'error',
									title: "未知错误",
									duration:1000,
								});
							}
						},false)
					}
		},
		mounted() {
			
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.divLine1{
	 background: #ffffff;
	 width: 100%;
	 height: 100rpx;
	}
	.divLine2{
	 background: #ffffff;
	 width: 100%;
	 height: 20rpx;
	}
	.divLine3{
	 background: #ffffff;
	 width: 100%;
	 height: 1000rpx;
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
