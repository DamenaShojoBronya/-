<template>
	<view>
		<uni-forms :model="model" ref="uForm" :errorType="form.errorType">
				<uni-forms-item class="form-item" label="职称" prop="job" :label-position="form.labelPosition">
					<input v-model="model.job" placeholder="请输入新的职称" type="text" />
				</uni-forms-item>
		</uni-forms>
		<button class="button" type="primary" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model:{job:""},
				form: {
					errorType: ['message'],
					labelPosition: 'left'
				},
				rules: {
					job: [{
						required: true,
						message: "不能为空",
						trigger: ['change', 'blur']
					}, ],
				},
			};
		},
		methods: {
			submit() {
				this.$refs.uForm.validate((valid) => {

					if (valid) {
						this.$util.request("/user/userinfo",{
							uid:getApp().globalData.id,
							ujob:this.model.job
						},(res)=>{
							if (res.data.code==200) {
								uni.showToast({
									icon: 'success',
									title: "等待审核",
									duration:1000,
								});
								setTimeout(function() {
							      uni.navigateBack()
								}, 1000);
							}
						})
					} 
					else {
						uni.showToast({
							icon: 'error',
							title: "请填写完整"
						})
					}
				});
			}
		},
		mounted() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	.button{
		width: 90%;
		background-color: #55aa7f;
	}
</style>
