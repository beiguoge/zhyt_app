<template>
	<view class="oil_year">
		<u-section class="oil_page_title" title="年产油" line-color="#0c2461" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#0c2461" size="32upx" label-size="24" label-color="#718093" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="oil_year_all">
			<u-table class="oil_year_all_table">
				<u-tr class="u-tr">
					<u-td class="u-td">年计划</u-td>
					<u-td class="u-td" style="border-right: 0;">154.15</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">年产量</u-td>
					<u-td class="u-td" style="border-right: 0;">165.98</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">同期产量</u-td>
					<u-td class="u-td" style="border-right: 0">295.15</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td" style="border-bottom: 0">比去年</u-td>
					<u-td class="u-td" style="border-right: 0;border-bottom: 0">198.05</u-td>
				</u-tr>
			</u-table>
			<view class="oil_year_charts">
				<canvas canvas-id="oilNowRing" id="oilNowRing" class="oil_year_now_charts" />
				<canvas canvas-id="oilOldRing" id="oilOldRing" class="oil_year_old_charts" />
			</view>
		</view>
		<PageTitle title_left_text="完成情况" :title_right_text='`据年末剩余${days}天`' />
		<u-table class="oil_year_details_table">
			<u-tr class="details_u-tr">
				<u-th class="details_u-th">单位</u-th>
				<u-th class="details_u-th">开井</u-th>
				<u-th class="details_u-th">计划</u-th>
				<u-th class="details_u-th">产油</u-th>
				<u-th class="details_u-th">较昨日</u-th>
				<u-th class="details_u-th">较月平均</u-th>
			</u-tr>
			<u-tr class="details_u-tr">
				<u-td class="details_u-td">合计</u-td>
				<u-td class="details_u-td">1650</u-td>
				<u-td class="details_u-td">1988.02</u-td>
				<u-td class="details_u-td">154.15</u-td>
				<u-td class="details_u-td">+123.15</u-td>
				<u-td class="details_u-td">-154.15</u-td>
			</u-tr>
		</u-table>
		<u-table class="oil_year_details_table">
			<u-tr class="details_u-tr" v-for="x in 8" :key="x">
				<u-td class="details_u-td">{{ x }}号采油站</u-td>
				<u-td class="details_u-td">1650</u-td>
				<u-td class="details_u-td">1988.02</u-td>
				<u-td class="details_u-td">154.15</u-td>
				<u-td class="details_u-td">+123.15</u-td>
				<u-td class="details_u-td">-154.15</u-td>
			</u-tr>
		</u-table>
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
				calendarShow: false,
				pixelRatio: 1,
				days: 0
			}
		},
		methods: {
			selectByData(val) {
				console.log(val);
			},
			showRing(canvasId, chartData, color, title) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend:{show: false},
					padding: [-6*_self.pixelRatio,15*_self.pixelRatio,20*_self.pixelRatio,15*_self.pixelRatio],
					title: {
						name: title,
						color: color,
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					colors: [color, '#FFFFFF'],
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(330)*_self.pixelRatio,
					height: uni.upx2px(230)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					extra: {
						pie: {
						  offsetAngle: -10,
						  ringWidth: 14*_self.pixelRatio,
						  labelWidth: 15
						}
					}
				})
			}
		},
		onLoad() {
			this.days = Math.floor((new Date(new Date().getFullYear(), 12, 31, 23, 59, 59).getTime() - new Date().getTime()) / (1000 * 24 * 60 *60));
			_self = this;
			let oilNowRingData = {series:[]};
			oilNowRingData.series = [{
				"name": "实际生产",
				"data": 154.15
			}, {
				"name": "未完成生产",
				"data": 43.25
			}];
			let oilOldRingData = {series:[]};
			oilOldRingData.series = [{
				"name": "注水",
				"data": 295.15
			}, {
				"name": "未完成配注",
				"data": 43.25
			}];
			_self.showRing("oilNowRing", oilNowRingData, '#6a89cc', "154.15吨");
			_self.showRing("oilOldRing", oilOldRingData, "#ea8685", "295.15吨");
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_year.css");
</style>
