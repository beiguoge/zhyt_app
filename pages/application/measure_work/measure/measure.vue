<template>
	<view class="measure">
		<u-section class="oil_page_title" title="评价汇总" line-color="#0c2461" sub-title="日期选择" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="chooseDate" color="#0c2461" size="32upx" />
		<view class="title_dept" @click="showDept = true">单位选择</view>
		<u-popup v-model="showDept" width="50%" height="100%">
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="measure_all">
			<canvas canvas-id="measureRing" id="measureRing" @touchstart="touchMeasure" />
			<u-table class="measure_all_table">
				<u-tr class="u-tr">
					<u-td class="u-td">作业完成</u-td>
					<u-td class="u-td">20口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果正常</u-td>
					<u-td class="u-td">18口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果较差</u-td>
					<u-td class="u-td">14口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果失败</u-td>
					<u-td class="u-td">6口</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="measure_all_list">
			<view></view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="measure_all_scroll" @scroll="scroll">
				<view class="measure_all_list_item" v-for="x in 100">{{ x }}</view>
			</scroll-view>
		</view>
		<view @tap="goTop" class="uni-link uni-center uni-common-mt">返回顶部</view>
		<PageTitle title_left_text="评价明细" title_right_text="" />
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaRing;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				showDept: false,
				calendarShow: false,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				pixelRatio: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			chooseDate() {
				this.calendarShow = true
			},
			selectByData(val) {
				console.log(val);
			},
			showRing(canvasId, chartData, colors, title) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend:{
						show: true,
						position:'right',
						float:'center',
						lineHeight: 26,
					},
					title: {
						name: '评价汇总',
						color: '#778ca3',
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					padding: [0*_self.pixelRatio,14*_self.pixelRatio,0*_self.pixelRatio,0*_self.pixelRatio],
					colors: colors,
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(450)*_self.pixelRatio,
					height: uni.upx2px(350)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					extra: {
						pie: {
						  offsetAngle: -30,
						  ringWidth: 20*_self.pixelRatio,
						  labelWidth: 15
						}
					}
				})
			},
			touchMeasure(e) {
				canvaRing.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return item.name + ': ' + item.data.value + '口';
						}else{
							return item.name + ': ' + item.data + '口';
						}
					}
				});
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			}
		},
		onLoad() {
			_self = this;
			let measureRingData = {
				series: [{
					"name": "作业完成",
					"data": 20
					}, {
					"name": "效果正常",
					"data": 18
					}, {
					"name": "效果较差",
					"data": 14
					}, {
					"name": "效果失败",
					"data": 6
				}]
			};
			_self.showRing("measureRing", measureRingData, ['#45aaf2', '#2bcbba', '#fc5c65', '#fed330']);
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/measure.css");
</style>
