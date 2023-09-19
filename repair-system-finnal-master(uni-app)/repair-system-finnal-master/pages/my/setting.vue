<template>
	<!-- <u-cell-group>
		<u-cell-item title="退出登录" @click="logout" >
		</u-cell-item>
		<u-cell-item title="修改用户信息" @click="alter" >
		</u-cell-item>
		<u-cell-item title="绑定微信" @click="bind" >
		</u-cell-item>
		<u-cell-item title="验证手机号" @click="check" >
		</u-cell-item>
	</u-cell-group> -->
    <uni-list>
    	<uni-list-item  showArrow="true" title="退出登录"
    		@click="logout" link />
    	<uni-list-item  showArrow="true"  title="账户与安全"
    		@click="alter" link />
    	<uni-list-item v-if='level != 1' showArrow="true"  title="绑定微信"
    		@click="bind" link />
		<uni-list-item  showArrow="true"  title="测试"
			@click="test" link />
    </uni-list>
</template>

<script>
export default {
	data() {
		return {
			level:1
		};
	},
	onLoad(){
		this.level=getApp().globalData.level;
	},
	methods:{
		logout(){
			getApp().globalData={
			id:"2",
			username:"aaa",
			password:"sss",
			level:'1',
			job:"aaa",
			phone:"sss"
		};
			uni.reLaunch({
				url:"../login"
			})
		},
		alter(){
			uni.navigateTo({
				url:"alter/index"
			})
		},
		bind(){
			wx.login({
				desc: '用于完善用户资料',
				success: (res) => {
					console.log("获取成功", res);
					console.log(res.code);
					this.$util.request("/user/registerByWX",{
						code:res.code,
						uid:getApp().globalData.id
					},(result)=>{
						if(result.data.code==200){
							uni.showToast({
								title:"绑定成功",
								icon:"success"
							})
						}
						else{
							uni.showToast({
								title:"失败",
								icon:"error"
							})
						}
					},false);
				},
				fail:(err)=>{
					uni.showToast({
						title:"获取失败",
						icon:"error"
					})
				}
			});
			
		},
		test(){
			uni.navigateTo({
				url:"/pages/my/alter/test"
			})
		}
	},
};
</script>

<style lang="scss" scoped></style>
