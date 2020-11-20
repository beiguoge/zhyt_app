<template>
	<view class="oil_year">
		<u-section class="oil_page_title" font-size="24" title="年产油" line-color="#113b8f" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="oil_year_top">
			<u-table class="oil_year_top_table" padding="0 0">
				<u-tr class="oil_year_top_tr">
					<u-td class="oil_year_top_td1" width="70%">
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td">年计划</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;">{{this.oilYearData.yearPlan}}</u-td>
						</u-tr>
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td" style="border-bottom: 0;">年产量</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">{{this.oilYearData.yearYield}}</u-td>
						</u-tr>
					</u-td>
					<u-td class="oil_year_top_td2" width="30%">
						<canvas canvas-id="oilNowRing" id="oilNowRing" />
					</u-td>
				</u-tr>
				<u-tr class="oil_year_top_tr">
					<u-td class="oil_year_top_td1" width="70%">
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td">同期产量</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;">{{this.oilYearData.sameTimeYield}}</u-td>
						</u-tr>
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td" style="border-bottom: 0;">比去年</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">{{this.oilYearData.toLastYear}}</u-td>
						</u-tr>
					</u-td>
					<u-td class="oil_year_top_td2" width="30%">
						<canvas canvas-id="oilOldRing" id="oilOldRing" />
					</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="完成情况" title_right_text="" />
		<view class="oil_year_details">
			<u-table class="oil_year_table" border-color="#999999" padding="0 0">
				<u-tr class="oil_year_tr">
					<u-td class="oil_year_td" width="20%">场站</u-td>
					<u-td class="oil_year_td" width="14%">开井</u-td>
					<u-td class="oil_year_td" width="18%">计划产油</u-td>
					<u-td class="oil_year_td" width="18%">实际产油</u-td>
					<u-td class="oil_year_td" width="15%">较昨日</u-td>
					<u-td class="oil_year_td" width="15%">较月平均</u-td>
				</u-tr>
				<u-tr class="oil_year_tr">
					<u-td class="oil_year_td" width="20%">合计</u-td>
					<u-td class="oil_year_td" width="14%">320</u-td>
					<u-td class="oil_year_td" width="18%"><span>12536m<sup>3</sup></span></u-td>
					<u-td class="oil_year_td" width="18%"><span>12536m<sup>3</sup></span></u-td>
					<u-td class="oil_year_td" width="15%" style="color: #e65a40;font-weight: bold;">+126</u-td>
					<u-td class="oil_year_td" width="15%" style="color: #22b573;font-weight: bold;">-86</u-td>
				</u-tr>
				<u-tr class="oil_year_tr" v-for="(item, index) in oilDetailsData" :key="index">
					<u-td class="oil_year_td" width="20%">{{item.oilStationName}}</u-td>
					<u-td class="oil_year_td" width="14%">{{item.openNum}}</u-td>
					<u-td class="oil_year_td" width="18%"><span>{{item.oilPlan}}m<sup>3</sup></span></u-td>
					<u-td class="oil_year_td" width="18%"><span>{{item.oilFact}}m<sup>3</sup></span></u-td>
					<u-td class="oil_year_td" width="15%" v-if="item.toYesterday > 0" style="color: #e65a40;font-weight: bold;">+{{item.toYesterday}}</u-td>
					<u-td class="oil_year_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">{{item.toYesterday}}</u-td>
					<u-td class="oil_year_td" width="15%" v-if="item.toMonth > 0" style="color: #e65a40;font-weight: bold;">+{{item.toMonth}}</u-td>
					<u-td class="oil_year_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">{{item.toMonth}}</u-td>
				</u-tr>
			</u-table>
		</view>
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
				oilYearData: {},
				oilDetailsData: []
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
					padding: [-16*_self.pixelRatio,12*_self.pixelRatio,18*_self.pixelRatio,12*_self.pixelRatio],
					title: {
						name: title,
						color: color,
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					colors: [color, '#e6e6e6'],
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(200)*_self.pixelRatio,
					height: uni.upx2px(200)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					extra: {
						pie: {
						  offsetAngle: 100,
						  ringWidth: 8*_self.pixelRatio,
						  labelWidth: 15
						}
					}
				})
			}
		},
		onLoad() {
			_self = this;
			_self.oilYearData = {
				yearPlan: 2005,
				yearYield: 2020,
				sameTimeYield: 2019,
				toLastYear: 105
			};
			let oilNowRingData = {
				series: [{
					"name": "年计划",
					"data": _self.oilYearData.yearPlan
				}, {
					"name": "年产量",
					"data": _self.oilYearData.yearYield
				}]
			};
			_self.showRing("oilNowRing", oilNowRingData, '#2670f7', "2020吨");
			let oilOldRingData = {
				series: [{
					"name": "同期产量",
					"data": _self.oilYearData.sameTimeYield
				}, {
					"name": "比去年",
					"data": _self.oilYearData.toLastYear
				}]
			};
			_self.showRing("oilOldRing", oilOldRingData, "#e65a40", "2019吨");
			// 完成情况
			_self.oilDetailsData = [
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
	@import url("/static/css/application/product/oil_year.css");
</style>
