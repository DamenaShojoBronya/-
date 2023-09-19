<template>
	<view class="example">
		<uni-section :title="'添加' + title[level-3]" type="line" padding>
			<uni-forms ref="form" :modelValue="repairer" :rules="rules">
				<uni-forms-item label="姓名" name="uname" required>
					<uni-easyinput type="text" v-model="repairer.uname" placeholder="请输入姓名" />
				</uni-forms-item>
				
				<uni-forms-item v-if="level == 4" label="部门" name="depart" required>
					<view>
						<picker @change="bindPickerChange($event,department)" :value="defaultDepartment" :range="department" :range-key="'departmentname'">
							<view class="uni-input">{{department[defaultDepartment].departmentname}}</view>
						</picker>
					</view>
				</uni-forms-item>
				
				<uni-forms-item v-if="level == 3" label="部门" name="depart" required>
					<view>
						{{department[udepartment-1].departmentname}}
					</view>
				</uni-forms-item>
				
				<uni-forms-item label="职称" name="gender" required>   
					<uni-data-checkbox v-model="repairer.isLeader" :localdata="rank" />
				</uni-forms-item>
				
				<uni-forms-item label="性别" name="gender" required>
					<uni-data-checkbox v-model="repairer.sex" :localdata="sexs" />
				</uni-forms-item>
				
				<uni-forms-item label="电话" name="uphone" required>
					<uni-easyinput type="text" v-model="repairer.uphone" placeholder="请输入联系方式" />
				</uni-forms-item>
				
				<uni-forms-item label="密码" name="upassword" required>
					<uni-easyinput type="text" v-model="repairer.upassword" placeholder="请输入密码" />
				</uni-forms-item>
				
				<!-- <uni-forms-item label="再次输入密码" required>
					<uni-easyinput v-model="repairer.upassword" placeholder="请再次输入密码" />
				</uni-forms-item> -->
				<!-- <u-form-item label="登陆密码" labelWidth="80" prop="password" borderBottom ref="item1">
				  <u-easyinput type="password" v-model="model1.password" border="none" placeholder="请输入密码"></u-easyinput>
				</u-form-item>
				<u-form-item label="确认密码" labelWidth="80" prop="Tpassword" borderBottom ref="item1">
				  <u-easyinput v-model="model1.Tpassword" border="none" placeholder="请确认密码"></u-easyinput>
				</u-form-item> -->

			</uni-forms>
			
			<button class="button" type="primary" plain="true" @click="confirm">确认</button>
			
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rank: [{
					text: '部门负责人',
					value: 1
				},{
					text: '维修工',
					value: 0
				}],
				sexs: [{
					text: '男',
					value: 1
				},{
					text: '女',
					value: 0
				}],
				defaultDepartment: 0,
				repairer: {
					isLeader: 0,
					udepartment: 0,
					uname: "",
					//uopenid: null,
					upassword: "",
					uphone: "",
					utype: 2,
					sex: 1
				},
				title: ["维修工", "部门负责人/维修工"],
				department: [],
				pickerData: '',
				udepartment: 0,
				level: 0,
				rules: {
					// 对 名字 字段进行必填验证
					uname: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							}]
					},
					// 对 电话 字段进行必填验证
					uphone: {
						rules: [{
							required: true,
							errorMessage: '请输入电话号码',
						}]
					},
					// 对 密码 字段进行必填验证
					upassword: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}]
					}
				}
			}
		},
		onLoad() {
			this.level = getApp().globalData.level
			this.udepartment = getApp().globalData.department
			this.$util.request("/user/find_department", {},
			 (res)=>{
				this.department=res.data.data;
				console.log(res.data.data)
			});
		},
		methods: {
			bindPickerChange: function(e, storage) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				console.log(storage)
				this.defaultDepartment = e.detail.value
				this.pickerData = storage[this.defaultDepartment]
			},
			confirm() {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					this.repairer.udepartment = this.defaultDepartment+1
					if ( this.level == 3 ) {
						this.repairer.isLeader = 0;
						this.repairer.utype = 2;
					} else {
						if (this.repairer.isLeader == 1) {
							this.repairer.utype = 3;
						}
					}
					
					
					// uni.request({
					// 	url: 'https://172.16.11.244:8081/user/register', 
					// 	method:'POST',
					// 	header: { 'content-type': 'application/x-www-form-urlencoded' },
					// 	data: {
					// 		  user: this.repairer
					// 	},
					// 	success: function(res) {
					// 		console.log(res.data)
					// 	}
					// });
					
					this.$util.request("/user/register", 
					{
						isLeader: this.repairer.isLeader,
						sex: this.repairer.sex,
						udepartment: this.repairer.udepartment,
						uname: this.repairer.uname,
						upassword: this.repairer.upassword,
						uphone: this.repairer.uphone,
						utype: this.repairer.utype
					}, (res)=>{
						console.log('发送：', this.repairer, res)
					}, false);
					
					this.$util.request("/user/register?user=" + this.repairer,
					{}, (res)=>{
						console.log('发送：', this.repairer, res)
					}, false);
					
					uni.navigateBack({
						delta: 1
					})
					uni.navigateBack({
					  success: () => {
					    let page = getCurrentPages().pop();
					    if (page) {
					       page.onLoad(page.options);//执行上个页面的方法
					    };
					  }
					})

				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style>
	.example {
		padding: 20px;
		background-color: #fff;
	}
	.button {
		width: 70%;
	}
</style>