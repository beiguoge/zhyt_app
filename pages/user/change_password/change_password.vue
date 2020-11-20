<template>
	<view class="change_password">
		<view class="card">
			<u-avatar class="user_img" :src="userAvatar" size="160" />
			<view class="user_name">张三</view>
			<u-field class="old_password" :required=true type="password" v-model="oldPassword" :clearable="false" label="原密码" placeholder="请输入原密码" placeholder-style="color: #cccccc;font-size: 26rpx" />
			<u-field class="new_password" :required=true type="password" v-model="newPassword" :clearable="false" label="新密码" placeholder="密码为6位数,可包含字母数字和符号" placeholder-style="color: #cccccc;font-size: 26rpx" />
			<u-field class="commit_password" :required=true type="password" v-model="commitPassword" :clearable="false" :error-message="errorMessage" label="确认密码" placeholder="密码为6位数,可包含字母数字和符号" placeholder-style="color: #cccccc;font-size: 26rpx" />
			<u-button class="submit_btn" type="primary" @click="changePassword">确认修改</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				commitPassword: "",
				errorMessage: ""
			}
		},
		methods: {
			changePassword() {
				if(this.oldPassword === null || this.oldPassword.length < 1) {
					this.$refs.uToast.show({
						title: '请输入原密码',
						icon: false,
						type: 'error'
					})
				} else if(this.newPassword === null || this.newPassword.length < 1) {
					this.$refs.uToast.show({
						title: '请输入新密码',
						icon: false,
						type: 'error'
					})
				} else if(this.commitPassword === null || this.commitPassword.length < 1) {
					this.$refs.uToast.show({
						title: '请确认新密码',
						icon: false,
						type: 'error'
					})
				} else if(this.newPassword !== this.commitPassword) {
					this.errorMessage = "输入密码不一致"
					/* this.$refs.uToast.show({
						title: '新密码与确认密码不一致',
						icon: false,
						type: 'error'
					}) */
				} else {
					this.$refs.uToast.show({
						title: '密码修改成功!',
						icon: false,
						type: 'success',
						position: 'bottom'
					})
				}
			}
		},
		onLoad() {
			const userInfo = uni.getStorageSync('userInfo');
			this.userAvatar = userInfo.user_avatar;
		}
	}
</script>

<style>
.change_password {
	width: 100%;
	height: 100%;
	padding: 16% 0;
	background: #ffffff;
}
.card {
	width: 100%;
	height: 100%;
	text-align: center;
	padding: 10% 10%;
}
.user_name {
	font-size: 34rpx;
}
.old_password,.new_password {
	margin-top: 10%;
	border-bottom: 1rpx solid #999999;
}
.commit_password {
	border-bottom: 1rpx solid #999999;
}
.submit_btn {
	width: 80%;
	height: 9%;
	margin-top: 20%;
	border-radius: 10upx;
	font-size: 26upx;
	background: #2670f7;
}
</style>
