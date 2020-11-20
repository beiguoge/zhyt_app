<template>
	<u-section class="page_title" font-size="24" :title=title_left_text line-color="#113b8f" :sub-title=title_right_text sub-color="#000" :arrow=false />
</template>

<script>
	export default {
		props: {
			title_left_text: {
				type: String
			},
			title_right_text: {
				type: String
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.page_title {
	background: #cfd8e9;
	width: 100%;
	height: 60rpx;
	padding: 0 4%;
}
</style>
