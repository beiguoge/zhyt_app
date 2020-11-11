<template>
	<view class="content">
		<view class="login_title">
			<image class="login_logo" src="/static/image/logo.png" />
			<view class="login_title_text">定边采油厂智能油田</view>
		</view>
		<u-form class="login_form" :model="form" ref="uForm" @submit="login">
			<u-form-item class="login_item" prop="username">
				<u-icon class="login_icon" name="account-fill" color="#FFFFFF" size="28"></u-icon>
				<u-input class="login_inp" type="text" placeholder="请输入用户名" placeholder-style="color: #fff" v-model="form.username" />
			</u-form-item>
			<u-form-item class="login_item" prop="password">
				<u-icon class="login_icon" name="lock-fill" color="#FFFFFF" size="28"></u-icon>
				<u-input class="login_inp" type="password" placeholder="请输入密码" placeholder-style="color: #fff" :password-icon="true" v-model="form.password" />
			</u-form-item>
		</u-form>
		<u-button class="login_btn" form-type="submit" type="primary" @click="login()">登录</u-button>
		<u-toast ref="uToast" />
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
				}
			}
		},
		methods: {
			login() {
				uni.setStorage({
					key: 'userInfo',
					data: {userId: '723504', username: '张三', user_avatar: '/static/image/user/user_avatar.jpg'},
					success: function() {
						uni.switchTab({
							url: '../index/index'
						})
					}
				});
				/* let that = this;
				this.$refs.uForm.validate(valid => {
					if(valid) {
						this.postRequest('/login',{username: this.form.username, password: this.form.password}).then(res => {
							uni.setStorage({
								key: 'userInfo',
								data: res.data.userName,
								success: function() {
									uni.switchTab({
										url: '../index/index'
									})
								}
							});
						});
					}
				}) */
			},
			onReady() {
				this.$refs.uForm.setRules(this.rules);
			}
		}
	}
</script>

<style lang="scss">
	@import url("/static/css/login/login.css");
</style>
<style>
/deep/	.uni-input-input {
		color: #FFFFFF;
	}
</style>
