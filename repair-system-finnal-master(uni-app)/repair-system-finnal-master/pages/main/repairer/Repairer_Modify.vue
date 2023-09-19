<template>
	<view class="example">
		<uni-section title="修改信息" type="line">
			<uni-forms ref="form" :modelValue="repairer" :rules="rules">
				
				<uni-forms-item label="姓名" name="uname" required>
					<uni-easyinput :value="repairer.uname" v-model="repairer.uname" placeholder="请输入新姓名" />
				</uni-forms-item>
				
				<uni-forms-item label="职称" name="gender" required>
					<uni-data-checkbox v-model="repairer.isLeader" :localdata="sexs" />
				</uni-forms-item>
				
				<uni-forms-item label="部门" name="depart" required>
					<view>
						<picker @change="bindPickerChangeDepart($event,department)" :value="defaultDepartment" :range="department" :range-key="'departmentname'">
							<view class="uni-input">{{department[defaultDepartment].departmentname}}</view>
						</picker>
					</view>
				</uni-forms-item>
				
				<uni-forms-item label="联系方式" name="uphone" required>
					<uni-easyinput :value="repairer.uphone" v-model="repairer.uphone" placeholder="请输入新联系方式" />
				</uni-forms-item>
				
				<uni-forms-item label="密码" name="upassword" required>
					<uni-easyinput :value="repairer.upassword" v-model="repairer.upassword" placeholder="请输入新联系方式" />
				</uni-forms-item>
				
			</uni-forms>
			
			<button type="primary" plain="true" @click="confirm">确认</button>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexs: [{
					text: '部门负责人',
					value: 1
				},{
					text: '维修工',
					value: 0
				}],
				defaultDepartment: 0,
				repairer: {
					isLeader: 0,
					udepartment: 0,
					uname: "",
					uopenid: null,
					upassword: "",
					uphone: "",
					utype: 2,
					sex: 1
				},
				department: [],
				pickerData: '',
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
		onLoad(options) {
			let data = JSON.parse(options.repairer);
			console.log(data)
			this.repairer = data
			this.$util.request("/user/find_department", {},
			 (res)=>{
				this.department=res.data.data;
				console.log(res.data.data)
			});
		},
		methods: {
			
			bindPickerChangeDepart: function(e, storage) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				console.log(storage)
				this.defaultDepartment = e.detail.value
				this.pickerData = storage[this.defaultDepartment]
			},
			confirm() {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					if (this.repairer.isLeader == 1) {
						this.repairer.utype = 3;
					}
					if (this.repairer.isLeader == 0) {
						this.repairer.utype = 2;
					}
					
					
					this.$util.request("/user/modify", {
						uid: this.repairer.uid,
						isLeader: this.repairer.isLeader,
						udepartment: this.repairer.udepartment,
						uname: this.repairer.uname,
						upassword: this.repairer.upassword,
						uphone: this.repairer.uphone,
						utype: this.repairer.utype
					}, (res)=>{
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
		width: 80%;
	}
</style>