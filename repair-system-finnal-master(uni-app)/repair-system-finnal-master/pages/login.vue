<template>
	<view>
		<!--不要公共模块-->
		<!--isFullScreen 可以实其全屏显示-->
		<view class="container">
			<image class="bg-img" src="../static/public/login/login.jpeg"></image>
			<view class="content"></view>
		</view>
		<view class="column">
			<button class="button" type="primary" @click="weixin">微信一键登录</button>
			<view style="height: 40rpx;"></view>
			<button class="button" type="primary" @click="regist">其他用户登录或注册</button>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {

			};
		},

		methods: {
			weixin() {
				wx.login({
					desc: '用于完善用户资料',
					success: (res) => {
						console.log("获取成功", res);
						this.$util.request("/user/loginByWX",{
							code:res.code
						},(result)=>{
							console.log(result.data.data);
							if (result.data.code == 200) {
								uni.showToast({
									title: "登录成功",
									icon: "success",
									duration: 1000
								});
								getApp().globalData.username = result.data.data.uname;
								getApp().globalData.password = result.data.data.upassword;
								getApp().globalData.job = result.data.data.ujob;
								getApp().globalData.phone = result.data.data.uphone;
								getApp().globalData.level = result.data.data.utype;
								getApp().globalData.id = result.data.data.uid;
                                getApp().globalData.department = result.data.data.udepartment;
								setTimeout(function() {
								    uni.redirectTo({
								    url:'main/main'
										})
								}, 1000);
							}
							else if (result.data.code == 500) {
								uni.showToast({
									icon: "error",
									title: "系统出错"
								})
								return;
							} else if (result.data.code == 400) {
								console.log("???");
								uni.showToast({
									icon: "error",
									title: "用户未绑定微信"
								})
							}
						});
					},
					fail: (err) => {
						uni.showToast({
							title: "获取失败",
							icon: "error"
						})
					}
				});
			},
			regist() {
				uni.navigateTo({
					url:"pwdLogin"
				})
			},
		},

		onReady() {},
	};
</script>

<style lang="scss" scoped>
	.bg-img {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.column {		
		position: relative;
		// padding: 5px;
		top: 1000rpx;
	}
	.button{
		width: 90%;
		background-color: #55aa7f;
	}
</style>
