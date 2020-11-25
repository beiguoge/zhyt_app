<template>
	<view class="video">
		<video id="myVideo" style="width: 750rpx;" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
			@error="videoErrorCallback" controls :page-gesture="true" :autoplay="true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
			    title: option.videoName
			});
		}
	}
</script>

<style>
	@import url("/static/css/video/video_watch.css");
</style>
