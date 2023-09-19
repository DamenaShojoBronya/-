<template>
	<view>
		<uni-section title="所有公告" type="line" padding>
			<view v-for="item in notice_list" class="notice">
				<uni-card title="系统公告" :extra="item.time" @click="enterNotice(item)">
					<text>{{item.title}}</text>
				</uni-card>
			</view>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice_list: [
					{
						title: '震惊！温州皮革厂老板居然做出这种事',
						content: '据悉，温州皮革厂老板黄鹤先生带上小姨子跑路了，温州皮革厂倒闭了！',
						time: '2015-5-15 12:12:12'
					},
					{
						title: '震惊！温州皮革厂老板居然做出这种事',
						content: '据悉，温州皮革厂老板黄鹤先生带上小姨子跑路了，温州皮革厂倒闭了！',
						time: '2015-5-15 12:12:12'
					},
					{
						title: '震惊！温州皮革厂老板居然做出这种事',
						content: '据悉，温州皮革厂老板黄鹤先生带上小姨子跑路了，温州皮革厂倒闭了！',
						time: '2015-5-15 12:12:12'
					}
				]
			}
		},
		methods: {
			enterNotice(notice) {
				console.log("跳转到公告页面")
				uni.navigateTo({
					url: "./notice_detail?notice=" + JSON.stringify(notice)
				});
			}
		}
	}
</script>

<style>
	.notice {
		display: block;
		background-color: "#FFEFD5";
	}
</style>