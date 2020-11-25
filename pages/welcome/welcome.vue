<template>
	<view class="welcome">
		<view class="welcome_title">
			<image class="welcome_logo" src="/static/image/logo.png" />
			<view class="welcome_title_text">延长石油</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo');
			if(userInfo === null || userInfo === '') {
				setTimeout(
					function() {
						uni.redirectTo({
							url: '../login/login'
						})
					}, 2000);
			} else {
				setTimeout(
					function() {
						uni.switchTab({
							url: '../index/index'
						})
					}, 2000);
			}
		}
	}
</script>

<style>
.welcome {
	width: 100%;
	height: 100%;
	padding-top: 40%;
	background: #113b8f;
}
.welcome_title {
	width: 100%;
	height: 40%;
	text-align: center;
}
.welcome_logo {
	width: 50%;
	height: 80%;
}
.welcome_title_text {
	font-size: 30rpx;
	color: #ffffff;
}
</style>
