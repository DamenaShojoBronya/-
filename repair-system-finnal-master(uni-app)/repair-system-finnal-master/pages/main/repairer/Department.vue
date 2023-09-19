<template>
	<view>
		<uni-section title="部门管理" type="line">
			<uni-list v-for="item in department">
				<uni-list-item :title="item.departmentname"></uni-list-item>
			</uni-list>
			
			<!-- 修改信息按钮 -->
			<button class="button" @click="addDepartment">新增部门</button>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose"  mode="input" title="新增部门" 
					placeholder="请输入新部门名称!" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				department: [],
				newdepartment: ""
			}
		},
		onLoad() {
			this.getDepartmentInfo()
		},
		methods: {
			getDepartmentInfo() {
				this.$util.request("/user/find_department", {},
				 (res)=>{
					this.department = res.data.data;
					console.log(res.data.data)
				});
			}, 
			addDepartment() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(value) {
				this.$util.request("/user/registerD",
				{
					departmentname: value
				}, (res)=>{
					console.log('发送：', value, res)
				}, false);
			}
		}
	}
</script>

<style>
	.button{
		width: 80%;
		margin-top: 30rpx;
		border-radius: 12px;
		border: "#FF0000"
	}
</style>