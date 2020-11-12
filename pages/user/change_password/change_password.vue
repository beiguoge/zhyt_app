<template>
	<view class="change_password">
		<view class="card_background" />
		<view class="card">
			<u-avatar class="user_img" :src="userAvatar" size="large" />
			<u-field class="old_password" :required=true type="password" v-model="oldPassword" label="原密码" placeholder="请输入原密码" placeholder-style="color: #ced6e0" />
			<u-field class="new_password" :required=true type="password" v-model="newPassword" label="新密码" placeholder="请输入新密码" placeholder-style="color: #ced6e0" />
			<u-field :required=true type="password" v-model="commitPassword" label="确认密码" placeholder="请确认新密码" placeholder-style="color: #ced6e0" />
			<u-button class="submit_btn" type="primary" @click="changePassword">点击修改</u-button>
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
				commitPassword: ""
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
					this.$refs.uToast.show({
						title: '新密码与确认密码不一致',
						icon: false,
						type: 'error'
					})
				}
				this.$refs.uToast.show({
					title: '密码修改成功!',
					icon: false,
					type: 'success',
					position: 'bottom'
				})
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
	padding: 0 12%;
	background: #f1f2f6;
}
.card_background {
	width: 140%;
	height: 30%;
	margin-left: -24%;
	background: #0c2461;
}
.card {
	width: 100%;
	height: 66%;
	margin-top: -40%;
	border-radius: 30upx;
	text-align: center;
	padding: 10% 12%;
	background: #1e90ff;
}
.old_password {
	margin-top: 10%;
}
.new_password {
	margin-top: 10%;
}
.submit_btn {
	width: 90%;
	height: 8%;
	margin-top: 20%;
	border-radius: 10upx;
	font-size: 26upx;
	background: #5352ed;
}
</style>
