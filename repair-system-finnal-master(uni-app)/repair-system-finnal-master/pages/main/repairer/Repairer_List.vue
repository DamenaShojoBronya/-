<template>
	<view>
		<!-- 部门负责人 -->
		<view v-if="level == 3">
			<uni-section :title="'维修工（ ' + departmentType[department-1].departmentname + ' ）'" type="line" padding>
				<view v-for="item in repairer_list">
					<uni-card :title="item.uname" :sub-title="'uid: ' + item.uid" :extra="'联系方式: ' + item.uphone" :thumbnail="require('static/main/所有用户.png')" @click="enterRepairerInfo(item)"></uni-card>
				</view>
			</uni-section>
		</view>
		
		<!-- 总办人员 -->
		<view v-if="level == 4">
			<uni-section title="所有维修工/部门负责人" type="line" padding>
				<view v-for="item in repairer_list">
					<uni-card :title="item.uname" :sub-title="'uid: ' + item.uid" :extra="departmentType[item.udepartment-1].departmentname + isleader[item.isLeader]" :thumbnail="require('static/main/所有用户.png')" @click="enterRepairerInfo(item)"></uni-card>
				</view>
			</uni-section>
		</view>
		
		<!-- <button @click="addRepairer">添加</button> -->
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical":direction="direction" @trigger="trigger" />
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/admin/部门.png',
						selectedIconPath: '/static/image-active.png',
						text: '部门',
						active: false
					},
					{
						iconPath: '/static/admin/维修工.png',
						selectedIconPath: '/static/home-active.png',
						text: '维修工',
						active: false
					}
				],
				order_picture: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
				uid: 0,
				department: 0,
				departmentType: [],
				level: 0,
				isleader: ["", "负责人"],
				repairer_list: [
					{
						isLeader: 0,
						udepartment: 1,
						uid: 2,
						uname: "张三",
						uopenid: null,
						upassword: "123",
						uphone: "123",
						utype: 2,
						sex: 1
					},
					{
						uid: 10002,  //用户ID
						uname: '乔布斯',  //用户名
						sex: 1,  //性别
						contact: '123456789',  //联系方式
						headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  //头像
					},
					{
						uid: 10003,  //用户ID
						uname: '罗永浩',  //用户名
						sex: 1,  //性别
						contact: '789456123',  //联系方式
						headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  //头像
					},
					{
						uid: 10004,  //用户ID
						uname: '董明珠',  //用户名
						sex: 0,  //性别
						contact: '741852963',  //联系方式
						headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  //头像
					},
					{
						uid: 10001,  //用户ID
						uname: '库克',  //用户名
						sex: 1,  //性别
						contact: '18923042418',  //联系方式
						headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"  //头像
					}
				],
			}	
		},
		onLoad() {
			this.department = getApp().globalData.department
			this.level = getApp().globalData.level
			this.uid = getApp().globalData.id
			this.getRepairerList()
			this.getDepartmentInfo()
		},
		methods: {
			trigger(e) {
				console.log(e)
				// this.content[e.index].active = !e.item.active
				// uni.showModal({
				// 	title: '提示',
				// 	content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定')
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消')
				// 		}
				// 	}
				// })
				if (e.index == 1) {
					uni.navigateTo({
						url:"./Repairer_Apply"
					});
				}
				if (e.index == 0) {
					uni.navigateTo({
						url:"./Department"
					});
				}
			},
			getRepairerList() {
				// uni.request({ 
				//     url: '', 
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		if (res.data.code == "200") {
				// 			this.repairer_list = res.data.data;
				// 		}
				// 	}
				// });
				this.$util.request("/user/find_repairer", {
					uid: this.uid
				}, (res)=>{
					this.repairer_list=res.data.data;
					console.log("repairer" + res.data.data)
				});
			},
			getDepartmentInfo() {
				this.$util.request("/user/find_department", {},
				 (res)=>{
					this.departmentType = res.data.data;
					console.log(res.data.data)
				});
			},
			addRepairer() {
				console.log("跳转到维修工添加页面")
				uni.navigateTo({
					url:"./Repairer_Apply"
				});
			},
			enterRepairerInfo(repairer) {
				console.log("跳转到维修工详情页")
				console.log(repairer)
				uni.navigateTo({
					url:"./Repairer_Info?repairer=" + JSON.stringify(repairer)
				});
			}
		}
	}
</script>

<style>
	.uni-padding-wrap {
		width: 710rpx;
		padding: 0px 0px;
	}
	.uni-common-mt {
		margin-top: 0px;
	}
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}
	.content-text {
		font-size: 14px;
		color: #666;
	}
</style>