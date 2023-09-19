<template>
	<image :src="codeImg" mode="widthFix" ></image>
</template>

<script>
export default {
	data() {
		return {
			codeImg:""
		};
	},
	onLoad(){
		uni.request({
			url: "https://192.168.43.200:8081/file/getimg?url=F%3A%5C%5C1%5C%5CsysuRepairSystem%5C%5Crepairsystem_file%5C%5Cimg%5C%5Cc6f035c5-2abd-46e3-ba8e-dfabe7f555b3.jfif",
			method: 'GET',
			data: {},
			responseType: "arraybuffer",
			success: res => {
				let datas = res.data;
				console.log(datas);
				this.codeImg = `data:image/jpeg;base64,${uni.arrayBufferToBase64(datas)}`
			},
			fail: () => {},
			complete: () => {}
		});
	},
	methods:{
	},
};
</script>

<style lang="scss" scoped></style>
