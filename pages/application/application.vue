<template>
	<view class="application">
		<PageTitle title_left_text="生产运行" title_right_text="" />
		<u-grid :col="4" :border=false>
			<u-grid-item index=0 @click="details">
				<image class="application_icon" src="../../static/image/application/oil_day.png" mode="aspectFit" />
				<view class="grid-text">日产油</view>
			</u-grid-item>
			<u-grid-item index=1 @click="details">
				<image class="application_icon" src="../../static/image/application/oil_month.png" mode="aspectFit" />
				<view class="grid-text">月产油</view>
			</u-grid-item>
			<u-grid-item index=2 @click="details">
				<image class="application_icon" src="../../static/image/application/oil_year.png" mode="aspectFit" />
				<view class="grid-text">年产油</view>
			</u-grid-item>
			<u-grid-item index=3 @click="details">
				<image class="application_icon" src="../../static/image/application/water_day.png" mode="aspectFit" />
				<view class="grid-text">实时注水</view>
			</u-grid-item>
			<u-grid-item index=4 @click="details">
				<image class="application_icon" src="../../static/image/application/water_day.png" mode="aspectFit" />
				<view class="grid-text">日注水</view>
			</u-grid-item>
			<u-grid-item index=5 @click="details">
				<image class="application_icon" src="../../static/image/application/water_month.png" mode="aspectFit" />
				<view class="grid-text">月注水</view>
			</u-grid-item>
			<u-grid-item index=6 @click="details">
				<image class="application_icon" src="../../static/image/application/water_year.png" mode="aspectFit" />
				<view class="grid-text">年注水</view>
			</u-grid-item>
		</u-grid>
		<PageTitle title_left_text="工况预警" title_right_text="" />
		<u-grid :col="4" :border=false>
			<u-grid-item index=7 @click="details">
				<image class="application_icon" src="../../static/image/application/gtzd.png" mode="aspectFit" />
				<view class="grid-text">功图诊断</view>
			</u-grid-item>
			<u-grid-item index=8 @click="details">
				<image class="application_icon" src="../../static/image/application/oil_abnormal.png" mode="aspectFit" />
				<view class="grid-text">油井异常</view>
			</u-grid-item>
			<u-grid-item index=9 @click="details">
				<image class="application_icon" src="../../static/image/application/water_abnormal.png" mode="aspectFit" />
				<view class="grid-text">水井异常</view>
			</u-grid-item>
			<u-grid-item index=10 @click="details">
				<image class="application_icon" src="../../static/image/application/video_zd.png" mode="aspectFit" />
				<view class="grid-text">视频诊断</view>
			</u-grid-item>
		</u-grid>
		<PageTitle title_left_text="措施作业" title_right_text="" />
		<u-grid :col="4" :border=false>
			<u-grid-item index=11 @click="details">
				<image class="application_icon" src="../../static/image/application/work_down.png" mode="aspectFit" />
				<view class="grid-text">井下作业</view>
			</u-grid-item>
			<u-grid-item index=12 @click="details">
				<image class="application_icon" src="../../static/image/application/measure.png" mode="aspectFit" />
				<view class="grid-text">措施评价</view>
			</u-grid-item>
		</u-grid>
		<PageTitle title_left_text="知识库" title_right_text="" />
		<u-grid :col="4" :border=false>
			<u-grid-item index=13 @click="details">
				<image class="application_icon" src="../../static/image/application/gtzd_knowledge.png" mode="aspectFit" />
				<view class="grid-text">功图诊断知识库</view>
			</u-grid-item>
			<u-grid-item index=14 @click="details">
				<image class="application_icon" src="../../static/image/application/water_knowledge.png" mode="aspectFit" />
				<view class="grid-text">水井诊断知识库</view>
			</u-grid-item>
			<u-grid-item index=15 @click="details">
				<image class="application_icon" src="../../static/image/application/video_knowledge.png" mode="aspectFit" />
				<view class="grid-text">视频诊断知识库</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	import PageTitle from "../../common/page_title/page_title.vue";
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				
			}
		},
		methods: {
			details(index) {
				switch(index) {
					case '0':
						uni.navigateTo({
							url: './product/oil_day/oil_day',
							animationType: 'pop-in',
							animationDuration: 600
						});
						break;
					case '1':
						uni.navigateTo({
							url: './product/oil_month/oil_month'
						});
						break;
					case '2':
						uni.navigateTo({
							url: './product/oil_year/oil_year'
						});
						break;
					case '3':
						uni.navigateTo({
							url: './product/water_current/water_current'
						})
						break;
					case '4':
						uni.navigateTo({
							url: './product/water_day/water_day'
						})
						break;
					case '5':
						uni.navigateTo({
							url: './product/water_month/water_month'
						})
						break;
					case '6':
						uni.navigateTo({
							url: './product/water_year/water_year'
						})
						break;
					case '8':
						uni.navigateTo({
							url: './abnormal/oil_abnormal/oil_abnormal'
						})
						break;
					case '9':
						uni.navigateTo({
							url: './abnormal/water_abnormal/water_abnormal'
						})
						break;
					case '11':
						uni.navigateTo({
							url: './measure_work/work_down/work_down'
						})
						break;
					case '12':
						uni.navigateTo({
							url: './measure_work/measure/measure'
						})
						break;
				}
			}
		}
	}
</script>

<style>
	@import url("/static/css/application/application.css");
</style>
