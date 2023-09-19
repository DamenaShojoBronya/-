<template>
	<view>
		<uni-section :title="rank[repairer.isLeader] + '个人信息'" type="line">
			<uni-list>
				<!-- 头像 -->
				<!-- <uni-list-item link>
					<template v-slot:header>
						<view class="slot-box">
							<image class="slot-image" :src="repairer.headImg" mode="widthFix"></image>
						</view>
					</template>
				</uni-list-item> -->
				
				<!-- 基本信息 -->
				<uni-list-item title="uid" :rightText="repairer.uid" />
				
				<uni-list-item title="姓名" :rightText="repairer.uname" />
				
				<uni-list-item title="性别" :rightText="sexType[repairer.sex]" />
				
				<uni-list-item title="部门" :rightText="department[repairer.udepartment-1].departmentname" />
				
				<uni-list-item title="职称" :rightText="rank[repairer.isLeader]" />
				
				<uni-list-item title="联系方式" :rightText="repairer.uphone" />
			</uni-list>
			
			<!-- 修改信息按钮 -->
			<button class="button" @click="rewrite(repairer)">修改信息</button>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexType: ['女', '男'],
				rank: ['维修工', '部门负责人'],
				department: [],
				repairer: {},
				level: 0
			}
		},
		onLoad(options) {
			let data = JSON.parse(options.repairer);
			this.repairer = data
			this.getDepartment()
			this.level = getApp().globalData.level
		},
		methods: {
			rewrite(repairer) {
				console.log("跳转到用户信息修改页面")
				uni.navigateTo({
					url:"./Repairer_Modify?repairer=" + JSON.stringify(repairer)
				});
			},
			getDepartment() {
				this.$util.request("/user/find_department", {},
				 (res)=>{
					this.department=res.data.data;
					console.log(res.data.data)
				});
			}
		}
	}
</script>

<style>
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 30px;
		height: 60rpx;
	}
    .slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
	.button{
		width: 80%;
		margin-top: 30rpx;
		border-radius: 12px;
		border: "#FF0000"
	}
</style>