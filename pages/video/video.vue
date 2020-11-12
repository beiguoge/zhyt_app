<template>
	<view class="video">
		<u-search @custom="search" @search="search" shape="round" search-icon-color="#0c2461" placeholder="请输入井场名" v-model="oilWell" margin="2% 4%" />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oilWell: ""
			}
		},
		methods: {
			search(value) {
				console.log("search结果" + value);
			}
		}
	}
</script>

<style>
 @import url("/static/css/video/video.css");
</style>
