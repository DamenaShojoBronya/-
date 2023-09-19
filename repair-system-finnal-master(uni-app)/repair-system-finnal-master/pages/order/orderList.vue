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
											<uni-list-item title="维修人:" :rightText=getDidName(index,0) :clickable="repairer_clickable" @click="pickPerson(index)" ></uni-list-item>
										</uni-list>
									</uni-col>
									<uni-col v-if="my_lev > 1" :span="8" push="0">
										<button class="button popup-success" type="primary" @click="submit(index)">{{submit_btn_txt}}</button>
									</uni-col>
								</uni-row>
							</uni-card>
				
			
		</view>
		
		
		<view     v-if="current===1"  v-for="(item,index) in finished_list" :key="item.id">
			<uni-card :title="item.content"  @click="finished_goDetail(index)" isShadow="true" shadow="6px 6px 20px 6px rgba(0, 0, 0, 0.19)"  thumbnail="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wtd6?ver=364f"  >
				<text >{{item.address}}</text>
			</uni-card>
		</view>
		
		
		<view>
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view class="close">
					<view v-for="(item,index) in Person" @click="choose(index)">
						<uni-list>
							<uni-list-item :title=get_repairName_byIndex(index)
							 ></uni-list-item>
						</uni-list>
					</view>
					
					<button @click="closeDrawer('showLeft')" type="primary"><text >取消选择</text></button>
				</view>
			</uni-drawer>
		</view>
		<view>
					<!-- 确认分配的弹窗，在该弹窗的确认按钮处理函数中像后端接口请求分配 -->
				<uni-popup ref="alterDialog" type="dialog">
					<uni-popup-dialog :type="msgType" confirmText="同意" cancelText="关闭"  title="警告" content="确认分配此订单？" @confirm="dialogConfirm()"
						@close="dialogClose()">
					</uni-popup-dialog>
				</uni-popup>
				<!-- 信息不完整分配订单时 的 提示弹窗 -->
				<uni-popup ref="confirmInfo" type="dialog">
					<uni-popup-dialog :type="msgType" confirmText="确认" cancelText="关闭"  title="警告" content="请确认分配信息填写完整" @confirm="dialogClose()"
						@close="dialogClose()">
					</uni-popup-dialog>
				</uni-popup>
				<!-- 维修工完成订单时的弹窗 -->
				<uni-popup ref="finishDialog" type="dialog">
					<uni-popup-dialog :type="msgType" confirmText="同意" cancelText="关闭"  title="警告" content="确认已完成此订单？" @confirm="dialogConfirm()"
						@close="dialogClose()">
					</uni-popup-dialog>
				</uni-popup>
		</view>
	</view>
</template>

<script>
	
	export default {
		components: {},
		data() {
			return {
				my_lev: 0 , // 用户权限等级 默认为普通用户 0
				repaire:"",
				repairer_clickable: getApp().globalData.level>2? true : false, //维修人能不能点击
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
			//未完成订单父页面向子页面传入 维修人
			person_from_FathertoSon(index){
				if(this.my_lev==4){
					return this.newsList[index].did-1>=0? this.Person[this.newsList[index].did-1].departmentname:""
				}
				if(this.my_lev <=3){
					return this.newsList[index].repairername
				}
				
			},
			
			//已完成订单 向子页面传入 维修人
			person_from_FtoS(index){
				if(this.my_lev==2){
					return getApp().globalData.id
				}
				if(this.my_lev==1){
					return this.finished_list[index].repairer
				}
				for (var item in this.Person){
					if(this.my_lev==3){
						if(this.Person[item].uid == this.finished_list[index].repairer){
							return this.Person[item].uname
						}
					}
					if(this.my_lev==4){
						if(this.Person[item].did == this.finished_list[index].did){
							return this.Person[item].departmentname
						}
					}
				}
			},
			
			goDetail(index){
				console.log("点击了组件")
				this.repaire_index=index
				uni.navigateTo({
					url:"orderDetail",
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    acceptDataFromOpenedPage: function(data) {
					      console.log("收到子页面传来的信息",data)
					    },
					    confirm_repair: (data) => {
					      console.log("子页面选择维修人：",data)
						  // this.newsList[index].did=2
						  if(this.my_lev==4){
							  this.newsList[index].did=this.Person[data.repair_arr_index].did
							  console.log(this.newsList[index].did)
						  }
						  if(this.my_lev==3){
							  this.newsList[index].repairer=this.Person[data.repair_arr_index].uid
							  this.newsList[this.repaire_index].repairername=this.Person[data.repair_arr_index].uname
							  console.log(this.newsList[index].repairer)
						  }
						  
					    }
					    
					  },
					success: (res) => {
						console.log(".............",this.Person[1],this.newsList[index].did-1)
						
						res.eventChannel.emit('acceptDataFromOpenerPage', { 
							level:this.my_lev,
							data: this.Person,
							did:this.newsList[index].did ,
							person: this.my_lev==2? getApp().globalData.username : (this.my_lev==1? this.newsList[index].repairer : this.person_from_FathertoSon(index)),
							question:this.newsList[index].content,
							location:this.newsList[index].address,
							time:this.newsList[index].appointment_time,
							repair_clickable: getApp().globalData.level>2? true : false,
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
							person:this.my_lev==1? this.newsList[index].repairer : this.person_from_FtoS(index),
							first_path: this.finished_list[index].imgs,
							finish_time:this.finished_list[index].time,
							from_finish:true,
							})
					}
				})
			},
			
			
			//该函数通过 Person 数组中的索引 得到 维修部门名称或维修人员姓名
			//用于左侧抽屉的 维修部名称/人员姓名 展示
			get_repairName_byIndex(index){
				if(this.my_lev==4){
					return this.Person[index].departmentname
				}
				if(this.my_lev==3){
					return this.Person[index].uname
				}
			},
			
			
			
						
			pickPerson(index){   //在订单详情页外面点击维修人 点击后 显示左侧抽屉
				console.log("dianjiale");
				this.$refs['showLeft'].open();
				console.log(index)
				this.repaire_index=index
			},
			
			closeDrawer(e){
				this.$refs[e].close();
			},
			//在左侧抽屉中选择员工或部门
			choose(index){
				console.log("选择了人员，序号为：",index);
				console.log(this.newsList[this.repaire_index])
				//this.newsList[this.repaire_index].repairer 中的repairer只是用来存储 部门/维修人 编号，不一定是维修人编号也可能是部门编号
				
				// this.newsList[this.repaire_index].repairer=this.Person[index].did;
				switch(this.my_lev){
					case 4:{
						this.newsList[this.repaire_index].did=this.Person[index].did;
						this.newsList[this.repaire_index].repairername=this.Person[index].departmentname;
						break
					}
					case 3:{
						this.newsList[this.repaire_index].repairer=this.Person[index].uid
						this.newsList[this.repaire_index].repairername=this.Person[index].uname
						break
					}
				}
				
				this.$refs['showLeft'].close();
				
			},
			
            //提交订单/分配订单 按钮事件函数
			submit(index){
				console.log("订单index: ",index);
				if(this.my_lev==4){
					if(this.newsList[index].did==0){
						this.$refs.confirmInfo.open()
						return
					}
				}
					
				if(this.my_lev==3){
					if(this.newsList[index].repairer ==0){
						this.$refs.confirmInfo.open()
						return
					}
				}
				
				if(this.my_lev==2){
					this.button_index=index
					this.$refs.finishDialog.open()
					return 
				}
				
				this.button_index=index;
				this.$refs.alterDialog.open()
			},
			
			//通过 订单在订单数组中的下标 获取部门名称或者人员姓名  
			//该函数返回值主要用在 未完成订单 维修人右边的 文本显示
			getDidName(index,repair_id){
				if(this.my_lev==4){
					const did=this.newsList[index].did
					if (did>0){
						return this.Person[did-1].departmentname;
					}
					return ""
				}
				if(this.my_lev==2){
					return getApp().globalData.username
				}
					
				if(this.my_lev==1){
					return this.newsList[index].repairer
				}
				else{
					
						return this.newsList[index].repairername
					// for(var item in this.Person){
					// 	if(this.Person[item].uid==did){
					// 		return this.Person[item].uname
					// 	}
					// }
				}
				
			},
			
			change(e,s){
				console.log(e);
			},
			
			dialogClose(){
				console.log("关闭弹窗")
			},
			
			//根据用户等级 返回 请求 未完成订单 需要的参数字典
			get_param_unOrder(){
				switch(this.my_lev){
					case 4:{
						return {}
					}
					case 3: {
						return { uid: getApp().globalData.id }
					}
					case 2:{
						return { uid: getApp().globalData.id }
					}
					case 1:{
						return { uid: getApp().globalData.id }
					}
				}
				
			},
			
			//根据用户等级 返回 请求 未完成订单 需要的参数字典
			get_param_distributed(){
				switch(this.my_lev){
					case 4:{
						return {}
					}
					case 3: {
						return { uid: getApp().globalData.id }
					}
					case 2:{
						return { uid: getApp().globalData.id }
					}
					case 1:{
						return { uid: getApp().globalData.id }
					}
				}
				
			},
			
			
			
			
			
			//加载订单信息
			getInfo(){
				
				console.log("in getinfo ......");
				
				console.log("请求未订单信息",this.get_unComplete_order_url,this.get_param_unOrder())
				//未完成订单
				this.$util.request(this.get_unComplete_order_url,
				this.get_param_unOrder(),
					(res)=>{
						console.log("get data success")
						console.log(res.data)
						console.log("print this.data.data end")
						this.newsList=res.data.data
					}
				)
				//已完成订单
				this.$util.request(this.get_distributed_oeder_url,this.get_param_distributed(),
					(res) => {
						console.log(res.data.data)
						this.finished_list=res.data.data
						console.log(this.finished_list,typeof(this.finished_list))
					}
				)
				
				
			},
			
			//该函数返回 请求维修工或维修部门 中的请求参数字典 
			// 获取维修部门的接口不需要参数，但是获取维修工的接口需要参数 因此返回不同的参数字典
			uid_for_get_repair(){
				if(this.my_lev==3)
					return {
						uid: getApp().globalData.id
					}
				else
					return {}
			},
			
			// 获取不同身份的 请求 url
			set_Urls(){
				switch(this.my_lev){
					case 1 :{
						this.tmp_url="**********"
						this.get_unComplete_order_url="/repair/check_repair1"
						this.get_distributed_oeder_url="/repair/check_finish1"
						break
					}
					case 2:{
						this.tmp_url="level 2 ddddfafa"
						this.get_unComplete_order_url="/repair/check_repair4"
						this.get_distributed_oeder_url="/repair/check_finish4"
						break
					}
					case 3:{
						this.tmp_url="/user/find_repairer"
						this.get_unComplete_order_url="/repair/check_repair3"
						this.get_distributed_oeder_url="/repair/check_finish3"
						break
					}
					case 4:{
						this.tmp_url="/user/find_department"
						this.get_unComplete_order_url="/repair/check_distribution"
						this.get_distributed_oeder_url="/repair/check_distributed"
						break
					}
				}
			},
			
			
			
			//获取部门维修工或者部门
			getRepair(){
				//根据不同身份等级选择不同接口
				
				// console.log("-----------------",this.tmp_url,"**********")
				// console.log("this is user level ..",this.my_lev)
				// console.log(this.uid_for_get_repair())
				
				this.$util.request(this.tmp_url,this.uid_for_get_repair(),
					(res) => {
						console.log("in getrepair function")
						console.log("获取维修部门信息返回结果",res)
						this.Person=res.data.data;
						console.log("维修部门信息",this.Person)
					}
				
				)
				
				
			
			},
			
			//确认分配订单之后的操作
			dialogConfirm(){
				console.log("************",this.newsList[this.button_index].rid)
				// 总办人员的一级分配
				if(this.my_lev==4){
					this.$util.request("/repair/distribute1?rid="+ this.newsList[this.button_index].rid + "&did=" + this.newsList[this.button_index].did,
					{
						
					},
						
					(res)=>{
						console.log(res)
						console.log('分配成功')
						this.getInfo()
					},
					false
					)
				}
				//部门负责人 二级分配
				if(this.my_lev==3){
					this.$util.request("/repair/distribute2?rid=" + this.newsList[this.button_index].rid + "&uid=" + this.newsList[this.button_index].repairer,
					{},
					(res)=>{
						console.log(res)
						console.log('分配成功')
						this.getInfo()
					},
					false
					)
				}
				//维修工提交订单
				if(this.my_lev==2){
					this.$util.request("/repair/finish?rid=" + this.newsList[this.button_index].rid,
					{},
					(res)=>{
						console.log(res)
						console.log('分配成功')
						this.getInfo()
					},
					false
					)
				}
				
			}
		},
		onLoad(){
			// this.$refs['showLeft'].close()
			console.log("in onload....")
			this.my_lev= getApp().globalData.level
		
			this.set_Urls()
			this.getInfo();
			this.getRepair();
			
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