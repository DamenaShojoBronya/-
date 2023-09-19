<template>
	<view>
		<uni-section title="公告详情" type="line" padding>
			<uni-list>
				<!-- 基本信息 -->
				<uni-list-item :title="notice.title" />
				<uni-list-item :title="notice.time"/>
				<uni-list-item :title="notice.content" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				notice: {}
			}
		},
		onLoad(options) {
			let data = JSON.parse(options.notice);
			this.notice = data
		},
		methods: {
			
		}
	}
</script>

<style>
</style>