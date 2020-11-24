<template>
	<view class="video_details">
		<view class="video_item" v-for="(item,index) in videos" :key="index" @click="detailsVideo(item)">
			<image class="video_details_icon" src="../../static/image/video/video.png" />
			<u-section class="video_details_text" :title="item.videoName" sub-title="" :show-line=false :arrow="true" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videos: []
			}
		},
		methods: {
			
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
			    title: option.stationName
			});
			this.videos = [{
				videoName: '1号井场视频'
			},{
				videoName: '2号井场视频'
			},{
				videoName: '3号井场视频'
			},{
				videoName: '4号井场视频'
			},{
				videoName: '5号井场视频'
			},{
				videoName: '6号井场视频'
			},]
		}
	}
</script>
	
<style>
	@import url("/static/css/video/video_details.css");
</style>
