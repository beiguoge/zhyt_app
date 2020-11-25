<template>
	<view class="user">
		<view class="user_info">
			<view class="user_info1">
				<u-avatar class="user_img" :src="userAvatar" size=160 />
				<view class="user_name">{{ username }}</view>
				<view class="user_id">ID：{{ userId }}</view>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item index=0 icon="server-fill" title="联系我们" @click="details" />
			<u-cell-item index=1 icon="lock-opened-fill" title="修改密码" @click="details" />
			<u-cell-item index=2 icon="setting-fill" title="版本检查" value="V1.0" @click="details" />
			<u-cell-item index=3 icon="minus-circle-fill" title="退出登录" @click="details" />
		</u-cell-group>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: "",
				userAvatar: "",
				username: ""
			}
		},
		methods: {
			details(index) {
				switch(index) {
					case '0':
						uni.navigateTo({
							url: './about_us/about_us'
						});
						break;
					case '1':
						uni.navigateTo({
							url: './change_password/change_password'
						});
						break;
					case '2':
						this.$refs.uToast.show({
							title: '已是最新版本',
							type: 'success'
						})
						break;
					case '3':
						uni.removeStorage({
							key: 'userInfo'
						});
						uni.reLaunch({
							url: '../login/login'
						})
						break;
				}
			}
		},
		onLoad() {
			const userInfo = uni.getStorageSync('userInfo');
			this.userId = userInfo.userId;
			this.userAvatar = userInfo.user_avatar;
			this.username = userInfo.username;
		}
	}
</script>

<style>
	@import url("/static/css/user/user.css");
</style>
