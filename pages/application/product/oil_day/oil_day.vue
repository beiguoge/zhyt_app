<template>
	<view class="oil_day">
		<u-section class="oil_page_title" font-size="24" title="日产油" line-color="#113b8f" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="oil_day_charts" >
			<canvas canvas-id="oilDayColumn" id="oilDayColumn" @touchstart="touchColumn" />
		</view>
		<PageTitle title_left_text="完成情况" title_right_text="" />
		<view class="oil_day_details">
			<u-table class="oil_day_table" border-color="#999999">
				<u-tr class="oil_day_tr">
					<u-td class="oil_day_td" width="20%">场站</u-td>
					<u-td class="oil_day_td" width="16%">开井</u-td>
					<u-td class="oil_day_td" width="16%">计划产油</u-td>
					<u-td class="oil_day_td" width="16%">实际产油</u-td>
					<u-td class="oil_day_td" width="16%">较昨日</u-td>
					<u-td class="oil_day_td" width="16%">较月平均</u-td>
				</u-tr>
				<u-tr class="oil_day_tr">
					<u-td class="oil_day_td" width="20%">合计</u-td>
					<u-td class="oil_day_td" width="16%">320</u-td>
					<u-td class="oil_day_td" width="16%"><span>12536m<sup>3</sup></span></u-td>
					<u-td class="oil_day_td" width="16%"><span>12536m<sup>3</sup></span></u-td>
					<u-td class="oil_day_td" width="16%" style="color: #e65a40;font-weight: bold;">+126</u-td>
					<u-td class="oil_day_td" width="16%" style="color: #22b573;font-weight: bold;">-86</u-td>
				</u-tr>
				<u-tr class="oil_day_tr" v-for="(item, index) in oilDayData" :key="index">
					<u-td class="oil_day_td" width="20%">{{item.oilStationName}}</u-td>
					<u-td class="oil_day_td" width="16%">{{item.openNum}}</u-td>
					<u-td class="oil_day_td" width="16%"><span>{{item.oilPlan}}m<sup>3</sup></span></u-td>
					<u-td class="oil_day_td" width="16%"><span>{{item.oilFact}}m<sup>3</sup></span></u-td>
					<u-td class="oil_day_td" width="16%" v-if="item.toYesterday > 0" style="color: #e65a40;font-weight: bold;">+{{item.toYesterday}}</u-td>
					<u-td class="oil_day_td" width="16%" v-else  style="color: #22b573;font-weight: bold;">{{item.toYesterday}}</u-td>
					<u-td class="oil_day_td" width="16%" v-if="item.toMonth > 0" style="color: #e65a40;font-weight: bold;">+{{item.toMonth}}</u-td>
					<u-td class="oil_day_td" width="16%" v-else  style="color: #22b573;font-weight: bold;">{{item.toMonth}}</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				calendarShow: false,
				pixelRatio: 1,
				oilDayData: []
			}
		},
		methods: {
			selectByData(val) {
				console.log(val);
			},
			showClumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show:true,
						position: 'right',
						fontSize: 12,
						lineHeight: 24,
						float: 'top'
					},
					colors: ["#2670f7", "#57c5d9"],
					fontSize: 11,
					background: '#FFFFFF',
					padding: [18, 0, 4, 35],
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						data: [{min: 0,max: 50}],
						disableGrid: true
					},
					dataLabel: false,
					width: uni.upx2px(720)*_self.pixelRatio,
					height: uni.upx2px(340)*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: 12
						}
					}
				});
			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return item.name + ': ' + item.data.value + '吨';
						}else{
							return item.name + ': ' + item.data + '吨';
						}
					}
				});
			}
		},
		onLoad() {
			_self = this;
			let oilColumnData = {
				categories: ["总计", "旧井", "新井", "措施井"],
				series: [{
					"name": "计划",
					"data": [15, 45, 37, 43]
					}, {
					"name": "实际",
					"data": [10, 40, 34, 18]
				}]
			};
			_self.showClumn("oilDayColumn", oilColumnData);
			// 完成情况
			_self.oilDayData = [
				{
					oilStationName: '白家洼采油站',
					openNum: 10,
					oilPlan: 12345,
					oilFact:1235.5,
					toYesterday: 105,
					toMonth: -10
				},
				{
					oilStationName: '上蔡渠采油站',
					openNum: 23,
					oilPlan: 12345,
					oilFact:12355,
					toYesterday: 105,
					toMonth: -50
				},
				{
					oilStationName: '1766采油站',
					openNum: 16,
					oilPlan: 1234.5,
					oilFact:12355,
					toYesterday: -105,
					toMonth: 102
				},
				{
					oilStationName: '曹伙采油站',
					openNum: 25,
					oilPlan: 12345,
					oilFact:12355,
					toYesterday: 105,
					toMonth: -10
				},
				{
					oilStationName: '东关增压站',
					openNum: 42,
					oilPlan: 12345,
					oilFact:12355,
					toYesterday: 10.5,
					toMonth: -110
				},
				{
					oilStationName: '1876采油站',
					openNum: 15,
					oilPlan: 12345,
					oilFact:12355,
					toYesterday: -195,
					toMonth: -320
				},
				{
					oilStationName: '东仁沟采油站',
					openNum: 21,
					oilPlan: 12345,
					oilFact:12355,
					toYesterday: 185,
					toMonth: -98
				},
				{
					oilStationName: '高圈采油站',
					openNum: 45,
					oilPlan: 123.45,
					oilFact:123.55,
					toYesterday: 25,
					toMonth: -64
				},
				{
					oilStationName: '一号采油站',
					openNum: 17,
					oilPlan: 2345,
					oilFact:1235,
					toYesterday: 35,
					toMonth: -47
				},
				{
					oilStationName: '庙沟采油站',
					openNum: 13,
					oilPlan: 2345,
					oilFact:3214,
					toYesterday: -28,
					toMonth: 47
				},
			]
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_day.css");
</style>
