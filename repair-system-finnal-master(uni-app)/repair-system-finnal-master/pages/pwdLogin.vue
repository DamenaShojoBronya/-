<template>
	<view>
		<!--不要公共模块-->
		<!--isFullScreen 可以实其全屏显示-->
		<view style="text-align: center">
			<image src="../static/public/login/logo.png" mode="aspectFit" style="width: 260rpx; height: 140rpx"></image>
		</view>
		<view class="account-form-box">
			<uni-forms :modelValue="model" ref="uForm" :errorType="form.errorType">
				<uni-forms-item class="form-item" prop="username">
					<text style="font-weight:700;">用户名</text>
					<view style="height: 20rpx;"></view>
					<input v-model="model.username" placeholder="请填写用户名" type="text" />
				</uni-forms-item>
				<uni-forms-item class="form-item" prop="password">
					<text style="font-weight:700;">密码</text>
					<view style="height: 20rpx;"></view>
					<input v-model="model.password" placeholder="请填写密码" type="password" />
				</uni-forms-item>
			</uni-forms>

			<view style="height: 40rpx;"></view>

			<button class="button" type="primary" @click="submit()">登录</button>
			<view style="height: 40rpx;"></view>
			<!-- <view class="reg" @click="register">注册</view> -->
		</view>

		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				model: {
					/* 账号 */
					username: "",
					/* 密码 */
					password: "",
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入手机号',
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = /^1[0-9]{10}$/
								if (!iphoneReg.test(value)) {
									callback('手机号码格式不正确，请重新填写')
								}
								return true
							}
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length > 20 || value.length < 8) {
									callback('密码长度在8-20位！')
								} else {
									callback();
								}
							}
						}]
					}
				},
			};
		},

		methods: {
			submit(uForm) {

				// this.$refs.uForm.validate((valid) => {
				// 	if (valid) {
						this.$util.request("/user/login", {
							uphone: this.model.username,
							upassword: this.model.password,
						}, (result) => {
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
								console.log(getApp().globalData.level);
								setTimeout(function() {
									uni.redirectTo({
										url: 'main/main'
									})
								}, 1000);
							} else if (result.data.code == 401) {
								uni.showToast({
									icon: "error",
									title: "密码错误"
								})
								return;
							} else if (result.data.code == 402) {
								console.log("???");
								uni.showToast({
									icon: "error",
									title: "账户不存在"
								})
							}
						}, false)
				// 	}
				// });


			},
			register() {
				uni.navigateTo({
					url: "register"
				})
			},
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
	};
</script>

<style lang="scss" scoped>
	.account-form-box {
		padding: 0 32rpx;
	}

	.button {
		width: 90%;
		height: 80rpx;
		background-color: #55aa7f;
	}

	.reg {
		display: flex;
		flex-direction: column;
		align-items: center; //垂直居中
		justify-content: center; //水平居中
	}
</style>
