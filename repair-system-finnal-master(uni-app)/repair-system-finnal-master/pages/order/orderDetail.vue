<template>
	<view>
		
		<uni-section  class="mb-10" title="订单状态"  type="line">
					<uni-steps :options="status" active-icon="checkbox" :active="active" />
		</uni-section>
		<uni-list>			
			<uni-list-item title="维修问题"  :rightText="question"></uni-list-item>
			<uni-list-item title="维修地点" :rightText="location"></uni-list-item>
			<uni-list-item title="报修时间" :rightText="time"></uni-list-item>
			<uni-list-item title="完工时间" :rightText="end"></uni-list-item>
			<uni-list-item title="维修人"   :rightText="person" :clickable="repair_clickable"  @click="repaire()"></uni-list-item>
		</uni-list>
		<uni-section  class="mb-10" title="维修地点"  type="line">
					<uni-steps :options="status" active-icon="checkbox" :active="active" />
		</uni-section>
		<view class="mymap"><map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
						</map></view>
		
		<uni-section  class="mb-10" title="报修图片"  type="line">
					<uni-steps :options="status" active-icon="checkbox" :active="active" />
		</uni-section>
		<view v-for="(item,index) in img_arr" >
			<image :src="`${item}`" mode="widthFix"  ></image>
		</view>
		
		
		
		<view>
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view class="close">
					<view v-for="(item,index) in persons" @click="choose(index)">
						<uni-list>
							<uni-list-item :title=get_repairName_byIndex(index)
							 ></uni-list-item>
						</uni-list>
					</view>
					
					<button @click="closeDrawer('showLeft')" type="primary"><text >取消选择</text></button>
				</view>
			</uni-drawer>
		</view>

	</view>
</template>

<script>
	export default{
		data (){
			return{
				my_lev:0, //用户等级
				from_finish:false, //是否是已完成订单详情页
				lock:0,
				rid:"",
				task:[],
				codeImg:"",
				img_arr:[],
				repair_clickable:getApp().globalData.level >=3? true : false,
				// 地图数据
				id:1,
				latitude: 22.161,
				longitude: 113.34362,
				covers: [{
								width:10,
								height:10,
								latitude:  22.1614,
								longitude: 113.3436,
								iconPath: '../../static/public/locate.png',
							}],
				//地图数据结束
				active:1,
				question:"水管坏了",
				location:"荔园食堂背后",	
				time:"2022-11-04  13:12:45",
				end:"",
				person:"",
				persons:["张三","李四","王五"],
				pics:[
					 "F:\\1\\sysuRepairSystem\\repairsystem_file\\img\\c6f035c5-2abd-46e3-ba8e-dfabe7f555b3.jpg",
					"F:\\1\\sysuRepairSystem\\repairsystem_file\\img\\dbc9efcb-ecae-4478-8bb9-27b7ed7fcb00.jpg"
				],
				status:[
					{title:"已分配"},
					{title:"已受理"},
					{title:"派工"},
					{title:"完工"}
				],
				res:["https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA13LJeA.img?h=1080&w=1920&m=6&q=60&o=f&l=f"]
			}
		},

		methods:{
			showpic(item,index){
				console.log("in showpic"),
				console.log(item),
				console.log(index),
				console.log(this.pics)
				uni.previewImage({
					current:index,
					urls:this.pics
				})
			},
			showres(item,index){
				uni.previewImage({
					current:index,
					urls:this.res
				})
			},
			showDrawer(e) {
				this.$refs[e].open()
			},
			closeDrawer(e) {
				this.$refs[e].close()
			},
			change(e,s){
				console.log(e);
			},
			choose(index){
				const eventChannel = this.getOpenerEventChannel();
				if(this.my_lev==4){
					eventChannel.emit('confirm_repair', {repair_arr_index:index });  //向父页面传参， 该订单在维修人员数组中的index
					this.person=this.persons[index].departmentname
				}
				if(this.my_lev==3){
					eventChannel.emit('confirm_repair', {repair_arr_index:index });  //向父页面传参， 该订单在维修人员数组中的index
					this.person=this.persons[index].uname
				}
				this.$refs['showLeft'].close();
				
			},
			
			pickperson(index){
				this.person=this.persons[index];
				this.$refs['showLeft'].close();
			},
			repaire(){
				console.log("触发了点击维修人事件");
				this.$refs["showLeft"].open()
			},
			getIMG(){
				
				this.task.push(this.$util.request("/repair/check_img",{ rid : this.rid},
								(res)=>{
									this.pics=res;
								}
									))
				return Promise.all(this.task)
			},
			//该函数通过 persons 数组中的索引 得到 维修部门名称或维修人员姓名
			//用于左侧抽屉的 维修部名称/人员姓名 展示
			get_repairName_byIndex(index){
				if(this.my_lev==4){
					return this.persons[index].departmentname
				}
				if(this.my_lev==3){
					return this.persons[index].uname
				}
			}
		
			

		},
	
		onLoad:  function(option) {
			 const eventChannel = this.getOpenerEventChannel();
			  eventChannel.emit('acceptDataFromOpenedPage', {data: 'data from test page'});
			  // eventChannel.emit('someEvent', {data: 'data from test page for someEvent'});
			  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			  eventChannel.on('acceptDataFromOpenerPage', (data) => {
			    console.log("从父页面传入的信息",data,typeof(data))
				this.persons=data.data 
				// this.person=this.persons[data.did-1].departmentname
				this.person=data.person
				this.question=data.question
				this.location=data.location
				this.time=data.time
				// this.repair_clickable=data.repair_clickable
				this.latitude=data.latitude
				this.longitude=data.longitude
				this.covers[0].latitude=data.latitude
				this.covers[0].longitude=data.longitude
				console.log("-------///------",this.covers,this.latitude,this.longitude)
				this.rid=data.rid
				this.pics=data.first_path
				this.my_lev=data.level
				this.end=data.finish_time
				this.from_finish=data.from_finish
				// console.log(this.persons)
			  })
			  if(this.my_lev<3 || this.from_finish){
				  this.repair_clickable=false
			  }
	
		},
		
		onShow: function()  {
			console.log("第一次返回的URL",this.pics)
			for(var item in this.pics){
			
				// uni.request({
				// 	url:"https://172.16.11.244:8081/file/getimg?url=" + encodeURI(this.pics[item]),
				// 	method:'GET',
				// 	data: {},
				// 	responseType: "arraybuffer",
				// 	success: res => {
				// 		console.log("第二次请求图片返回的res.data----\n",res.data,"------------------")
				// 		const myBufferArray=new Uint8Array(res.data)
				// 		this.img_arr.push('data:image/jiff;base64,'+uni.arrayBufferToBase64(myBufferArray))
						
						
				// 	},
				// })
				this.$util.request("/file/getimg?url=" + encodeURI(this.pics[item]),{},(res)=>{
					console.log("第二次请求图片返回的res.data----\n",res.data,"------------------")
					const myBufferArray=new Uint8Array(res.data)
					this.img_arr.push('data:image/jiff;base64,'+uni.arrayBufferToBase64(myBufferArray))
				},true,"arraybuffer",)
			}
		}
	}
</script>

<style lang="scss">
	
	.mb-10 {
			margin-bottom: 10px;
		}
	.mymap{
		margin: 10px;
		box-shadow:6px 6px 20px 6px rgba(0, 0, 0, 0.19);
	}
</style>