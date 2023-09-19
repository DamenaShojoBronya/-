<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
						<uni-segmented-control :current="current" :values="items" :style-type="styleType"
							:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view  class="news_item"   v-if="current===0"  v-for="(item,index) in newsList" :key="item.id">
			<!-- <view v-if="current===0" > -->
				<uni-card :title="item.content"  :extra="item.address"  padding="10px 0" :thumbnail="avatar" isShadow="true"  shadow="6px 6px 20px 6px rgba(0, 0, 0, 0.19)">
					<view hover-stop-propagation="true">
						<image style="width: 100%;"   @click="goDetail(index)" src="https://ts1.cn.mm.bing.net/th/id/R-C.e27122a2727b66b6530e275baec10b41?rik=qfefKAa91csx6g&riu=http%3a%2f%2fbridge.chinese.cn%2fonline%2fcamp%2fstorage%2fform%2fimage%2ff4bd8f5d-9313-45c6-8d25-9839ca1df7a3.png&ehk=DiIwt3f8MqvSIIgqqYQYSFe8pARO4WzxYU3Mqip4kwc%3d&risl=&pid=ImgRaw&r=0"></image>
					</view>
								
								<text class="uni-body uni-mt-5">维修详情</text>
								
								<uni-row>
									<uni-col :span="16" pull="1">
										<uni-list>
											<uni-list-item title="维修人:" :rightText=getDidName(index) :clickable="repairer_clickable" @click="pickPerson(index)" ></uni-list-item>
										</uni-list>
									</uni-col>
									
								</uni-row>
							</uni-card>
				
			
		</view>
		
		
		<view     v-if="current===1"  v-for="(item,index) in finished_list" :key="item.id">
			<uni-card :title="item.content"  @click="finished_goDetail(index)" isShadow="true" shadow="6px 6px 20px 6px rgba(0, 0, 0, 0.19)"  thumbnail="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wtd6?ver=364f"  >
				<text >{{item.address}}</text>
			</uni-card>
		</view>
		

	</view>
</template>

<script>
	
	export default {
		components: {},
		data() {
			return {
				all_repairer:[],
				all_department:[],
				my_lev: 0 , // 用户权限等级 默认为普通用户 0
				repaire:"",
				repairer_clickable: getApp().globalData.level>3? true : false, //维修人能不能点击
				repaire_Name:"", //外面的维修人/维修部门姓名
				get_repair_url:"", // 请求维修部门或者维修人员的 url
				get_unComplete_order_url:"", //不同角色获取未完成订单的url
				get_distributed_oeder_url:"", //不同角色获取已分配订单的url
				repaire_index:-1,
				button_index:-1, //提交按钮索引
				first_picPath:[],
				newsList:[{
					content:"水管坏了",
					address:"荔园食堂背后",
					id:2
				}],
				submit_btn_txt: getApp().globalData.level >2? "分配订单" : "完成订单",
				finished_list:[],
				
				Person:["张三","李四","王五"],
				index:0, //代表选中【全部订单，已受理，派工，完工】 中的索引值，根据索引值进行渲染
				items:  getApp().globalData.level >2?  ['未分配订单', '已分配订单'] : ['未完成订单','已完成订单'],
				options2: [{
										text: '取消',
										style: {
											backgroundColor: '#007aff'
										}
									},
									{
										text: '确认',
										style: {
											backgroundColor: '#F56C6C'
										}
									}
						],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'button',
				newsList:[{
					content:"维修问题",
					address:"维修地点"
				},
				{
					content:"维修问题",
					address:"维修地点"
				}
				],
				
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
			
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			getDidName(index){
				if(this.newsList[index].repairer!=0){
					if(this.all_repairer.length==0){
						this.$util.request("/user/find_all_repairer",{},
						
						(res)=>{
							this.all_repairer=res.data.data
						}
						
						)
					}
					for(var i in this.all_repairer){
						if(this.all_repairer[i].uid==this.newsList[index].repairer){
							return this.all_repairer[i].uname
						}
					}
				}
				if(this.newsList[index].did!=0){
					
					if(this.all_department.length==0){
						this.$util.request("/user/find_department",{},
							(res) =>{
								this.all_department=res.data.data
							}
						
						)
					}
					
					for(var i in this.all_department){
						if(this.all_department[i].did=this.newsList[index].did){
							return this.all_department[i].departmentname
						}
					}
				}
				return "未分配"
			},
			//未完成订单父页面向子页面传入 维修人
			person_from_FathertoSon(index){
				if(this.newsList[index].repairer!=0){
					return this.newsList[index].repairer
				}
				if(this.newsList[index].did!=0){
					return this.newsList[index].did
				}
				return "未分配"
				
			},
			
			//已完成订单 向子页面传入 维修人
			person_from_FtoS(index){
				return this.newsList[index].repairer
				
			},
			
			goDetail(index){
				console.log("点击了组件")
				this.repaire_index=index
				uni.navigateTo({
					url:"orderDetail",
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					   
					    
					  },
					success: (res) => {
						console.log(".............",this.Person[1],this.newsList[index].did-1)
						
						res.eventChannel.emit('acceptDataFromOpenerPage', { 
							level:this.my_lev,
							data: this.Person,
							did:this.newsList[index].did ,
							// person: this.my_lev==2? getApp().globalData.username : (this.my_lev==1? this.newsList[index].repairer : this.person_from_FathertoSon(index)),
							person: this.getDidName(index),
							question:this.newsList[index].content,
							location:this.newsList[index].address,
							time:this.newsList[index].appointment_time,
							repair_clickable: false,
							latitude:this.newsList[index].latitude,
							longitude:this.newsList[index].longitude,
							rid:this.newsList[index].rid,
							from_finish:false,
							first_path: this.newsList[index].imgs,
							})
					}
				})
			},
			
			finished_goDetail(index){
				uni.navigateTo({
					url:"orderDetail",
					
					success: (res) => {
						res.eventChannel.emit('acceptDataFromOpenerPage', { 
							level:this.my_lev,
							data: this.Person,
							did:this.finished_list[index].did ,
							question:this.finished_list[index].content,
							location:this.finished_list[index].address,
							time:this.finished_list[index].appointment_time,
							repair_clickable:false,
							latitude:this.finished_list[index].latitude,
							longitude:this.finished_list[index].longitude,
							rid:this.finished_list[index].rid,
							// person:this.my_lev==1? this.newsList[index].repairer : this.person_from_FtoS(index),
							person: this.getDidName(index),
							first_path: this.finished_list[index].imgs,
							finish_time:this.finished_list[index].time,
							from_finish:true,
							})
					}
				})
			},
			
		
			//加载订单信息
			getInfo(){
				
				console.log("in getinfo ......");
				
				
				//未完成订单
				this.$util.request("/repair/check_repair1",
				{uid:getApp().globalData.id},
					(res)=>{
						console.log("get data success")
						console.log(res.data)
						console.log("print this.data.data end")
						this.newsList=res.data.data
					}
				)
				//已完成订单
				this.$util.request("/repair/check_finish1",{uid:getApp().globalData.id},
					(res) => {
						console.log(res.data.data)
						this.finished_list=res.data.data
						console.log(this.finished_list,typeof(this.finished_list))
					}
				)
				
				
			},
			
		
			
			
			
		
			
		
		},
		onLoad(){
			// this.$refs['showLeft'].close()
			console.log("in onload....")
			this.my_lev= getApp().globalData.level
		
			this.getInfo();
			// this.getRepair();
			
		}
	}
</script>

<style lang="scss">
	@import "@/static/iconfont.css";
	.uni-common-mt {
			margin-top: 30px;
		}
		
	.uni-padding-wrap {
		padding: 0px 30px;
	}
</style>