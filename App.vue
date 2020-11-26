<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			setTimeout(
				function() {
					// #ifdef APP-PLUS
					plus.navigator.closeSplashscreen();
					// #endif
				}, 3500);
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
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	page {
		width: 100%;
		height: 100%;
	}
</style>
