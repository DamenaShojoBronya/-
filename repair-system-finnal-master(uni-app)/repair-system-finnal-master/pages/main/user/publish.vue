<template>

	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="报修单" top="0">
				<uni-forms-item required name="time">
					<text style="font-weight:700;">1.报修时间:</text>
					<uni-datetime-picker type="datetime" v-model="repair.time" />
				</uni-forms-item>
				<uni-forms-item required name="location">
					<text style="font-weight:700;">2.报修位置:</text>
					<map class="map" :scale="scale" :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
				</uni-forms-item>
				<uni-forms-item required name="tempFilePaths">
					<text style="font-weight:700;">3.请上传图片(最多三张):</text>
					<uni-file-picker limit="3" :autoUpload="false" v-model="repair.image" fileMediatype="image"
						mode="grid" @select="select" @delete="deletephoto" ref="upload">
					</uni-file-picker>
				</uni-forms-item>
				<uni-forms-item name="content">
					<text style="font-weight:700;">4.请输入具体情况:</text>
					<input class="input" type="text" v-model="repair.content">
					</input>
				</uni-forms-item>
				<uni-forms-item name="pos">
					<text style="font-weight:700;">5.请输入详细地址:</text>
					<input class="input" type="text" v-model="repair.pos">
					</input>
				</uni-forms-item>
			</uni-group>
			<view>
				<button class="button"  @click="submit" >提交</button>
			</view>
			<view style="height: 80rpx;"></view>
		</uni-forms>
	</view>

</template>


<script>
	export default {
		data() {
			return {

				repair: {
					time: "",
					location: "",
					content: "",
					pos: "",
					tempFilePaths: [],
					order: "-1",
				},

				// 地图
				latitude: "",
				longitude: "",
				covers: [],
				scale: 16, //地图缩放比例
				msg: {
					fail: {
						title: '失败',
					},
					success: {
						title: '成功',
					},
					loading: {
						title: '正在加载',
					},
				},
			}
		},
		methods: {
			select(e) {
				this.repair.tempFilePaths.push(e.tempFilePaths[0]);
				console.log(e.tempFilePaths[0]);
			},
			// 移出图片函数
			async deletephoto() {
				this.form.attachment = ''
			},
			upload() {
				let success = true;
				const files = this.repair.tempFilePaths;
				console.log(files);
				try {
					let tasks = [];
					files.forEach(url => {
						tasks.push(
						// uni.uploadFile({
						// 	url: "https://192.168.43.200:8081/file/upload?rid=" + this.repair.order,
						// 	name: 'file',
						// 	filePath: url,
						// })
						this.$util.upload("/file/upload?rid=" + this.repair.order,url,(res)=>{console.log(res)});
						);
					})
					return Promise.all(tasks);
				} catch (err) {
					console.log(err);
					success = false;
					throw new Error(err);
				}
				return success;
			},
			submit() {
				uni.showLoading({
					title: "uploading"
				});
				let success = false;
				var that = this;
                this.$util.request("/repair/submit",{
					applicant: getApp().globalData.id,
					appointment_time: this.repair.time,
					longitude: this.longitude,
					latitude: this.latitude,
					content: this.repair.content,
					address: this.repair.pos
				},(res) => {
						//console.log(res);
						that.repair.order = res.data.data;
						success = that.upload();
						if (success) {
							uni.showToast({
								icon: "success",
								title: "success"
							})
							uni.navigateBack();
						} else {
							uni.showToast({
								icon: "error",
								title: "fail"
							})
						}
					},false);
			},
			onShow: function(option) {
				let that = this;
				uni.getLocation({
					type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
					success: function(res) {
						console.log(res);
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.covers = [{
							id: 1,
							latitude: that.latitude,
							longitude: that.longitude,
							iconPath: '../../../static/public/locate.png', //地图上的图标
							width: 35, //宽
							height: 35, //高
							// callout: { //自定义标记点上方的气泡窗口 点击有效  
							// 	content: "here", //文本
							// 	color: '#ffffff', //文字颜色
							// 	fontSize: 14, //文本大小
							// 	borderRadius: 2, //边框圆角
							// 	bgColor: '#00c16f', //背景颜色
							// 	display: 'ALWAYS', //常显
							// 	padding: 5 //气泡窗口的内间距
							// },
						}]
					},
					fail: function(err) {
						console.log(err);
					}
				});

			},
			onReady() {
				// 需要在onReady中设置规则
				this.repair.time = Date.now() - 2 * 24 * 3600 * 1000
			}
		},
	}
</script>
<style lang="scss" scoped>
	/*分割线样式*/
	.divLine {
		background: #E0E3DA;
		width: 100%;
		height: 5rpx;
	}

	.map {
		width: 400rpx;
		height: 400rpx;
		display: flex;
	}

	.input {
		border: 1upx solid #dadbde;
		padding: 12upx 18upx;
		border-radius: 8upx;
		font-size: 30upx;
		color: rgb(48, 49, 51);
	}
	.button{
		width: 90%;
		height: 80rpx;
		background-color:#0095FF; 
	}
</style>
