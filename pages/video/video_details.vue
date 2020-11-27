<template>
	<view class="video_details">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="video_details" v-show="load === false">
			<view class="video_item" v-for="(item,index) in videos" :key="index" @click="detailsVideo(item)">
				<image class="video_details_icon" src="../../static/image/video/video.png" />
				<u-section class="video_details_text" :title="item.videoName" sub-title="" :show-line=false :arrow="true" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videos: [],
				load: true
			}
		},
		methods: {
			detailsVideo(video) {
				uni.navigateTo({
					url: './video_watch?videoName=' + video.videoName
				})
			}
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
		},
		onReady() {
			let that = this;
			this.$refs.loading.open();
			setTimeout(function() {
				that.load = false;
				that.$refs.loading.close();
			}, 2500);
		}
	}
</script>
	
<style>
	@import url("/static/css/video/video_details.css");
</style>
