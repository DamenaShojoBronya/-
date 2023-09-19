<!-- <style lang="scss"> -->
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	// @import "uview-ui/index.scss";
</style>
<script>
	export default {
		globalData:{
			id:"1",
			username:"aaa",
			password:"sss",
			level:1,
			job:"aaa",
			phone:"sss",
			department: 0,
			userWechatInfo:{}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
