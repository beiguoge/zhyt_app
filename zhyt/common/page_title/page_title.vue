<template>
	<u-section class="page_title" :title=title_left_text line-color="#0a0f2d" :sub-title=title_right_text :arrow=false />
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
	background: #F1F1F1;
	width: 100%;
	height: 80rpx;
	padding: 0 4%;
}
</style>
