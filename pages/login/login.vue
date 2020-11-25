<template>
	<view class="content">
		<view class="login_title">
			<image class="login_logo" src="/static/image/logo.png" />
			<view class="login_title_text">定边采油厂油田助手</view>
		</view>
		<u-form class="login_form" :model="form" ref="uForm" @submit="login">
			<u-form-item class="login_item" :border-bottom="false" prop="username">
				<u-icon class="login_icon" name="account-fill" color="#f2f2f2" size="38"></u-icon>
				<u-input class="login_inp" type="text" placeholder="用户名" placeholder-style="color: #999999" v-model="form.username" />
			</u-form-item>
			<u-form-item class="login_item" :border-bottom="false" prop="password">
				<u-icon class="login_icon" name="lock-fill" color="#f2f2f2" size="38"></u-icon>
				<u-input class="login_inp" type="password" placeholder="密码" placeholder-style="color: #999999" :password-icon="false" v-model="form.password" />
			</u-form-item>
			<u-checkbox class="remember_me" @change="rememberMeChange" size="30rpx" label-size="28rpx" v-model="rememberMe">自动登录</u-checkbox>
		</u-form>
		<u-button class="login_btn" shape="circle" form-type="submit" type="primary" @click="login()">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: "",
					password: ""
				},
				rules: {
					username: [
						{ 
							required: true, 
							message: '请输入用户名', 
							trigger: ['change','blur'],
						}
					],
					password: [
						{
							required: true, 
							message: '请输入密码', 
							trigger: ['change','blur'],
						},
						{
							min: 5, 
							message: '密码长度不能少于5个字', 
							trigger: 'change'
						}
					]
				},
				rememberMe: false
			}
		},
		methods: {
			login() {
				uni.switchTab({
					url: '../index/index'
				})
				/* let that = this;
				this.$refs.uForm.validate(valid => {
					if(valid) {
						this.postRequest('/login',{username: this.form.username, password: this.form.password}).then(res => {
							if(that.rememberMe) {
								uni.setStorage({
									key: 'userInfo',
									data: {userId: res.data.userId, username: res.data.userName, user_avatar: '/static/image/user/user_avatar.jpg'},
								});
							}
							uni.showToast({
								icon: 'none',
								title: '登录成功!',
								position: 'bottom',
								success: function() {
									setTimeout(
										function() {
											uni.switchTab({
												url: '../index/index'
											})
										}, 2000);
								}
							})
						});
					}
				}) */
			},
			rememberMeChange(e) {
				this.rememberMe = e.value;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	@import url("/static/css/login/login.css");
</style>
<style>
/deep/	.uni-input-input {
		color: #e6e6e6;
	}
/deep/	.u-checkbox__label {
		color: #FFFFFF !important;
	}
</style>
