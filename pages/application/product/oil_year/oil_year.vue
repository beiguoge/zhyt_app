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
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;">{{oilYearData.yearPlan}}</u-td>
						</u-tr>
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td" style="border-bottom: 0;">年产量</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">{{oilYearData.yearFact}}</u-td>
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
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;">{{oilYearData.sameTimeYield}}</u-td>
						</u-tr>
						<u-tr class="oil_year_top_tr">
							<u-td class="oil_year_top_td" style="border-bottom: 0;">比去年</u-td>
							<u-td class="oil_year_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">{{oilYearData.toLastYear}}</u-td>
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
					<u-td class="oil_year_td" width="18%">计划产油</u-td>
					<u-td class="oil_year_td" width="18%">实际产油</u-td>
					<u-td class="oil_year_td" width="14%">完成率</u-td>
					<u-td class="oil_year_td" width="15%">日平均</u-td>
					<u-td class="oil_year_td" width="15%">较去年</u-td>
				</u-tr>
				<u-tr class="oil_year_tr">
					<u-td class="oil_year_td" width="20%">
						<span @click="wellDetails(oilYearData)">{{oilYearData.oilStationName}}</span>
					</u-td>
					<u-td class="oil_year_td" width="18%">
						<span @click="wellDetails(oilYearData)">{{oilYearData.yearPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_year_td" width="18%">
						<span @click="wellDetails(oilYearData)">{{oilYearData.yearFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_year_td" width="14%">
						<span @click="wellDetails(oilYearData)">{{oilYearData.completionRate}}%</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-if="oilYearData.yesterdayAvg > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(oilYearData)">+{{oilYearData.yesterdayAvg}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(oilYearData)">{{oilYearData.yesterdayAvg}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-if="oilYearData.toLastYear > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(oilYearData)">+{{oilYearData.toLastYear}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(oilYearData)">{{oilYearData.toLastYear}}</span>
					</u-td>
				</u-tr>
				<u-tr class="oil_year_tr" v-for="(item, index) in oilDetailsData" :key="index">
					<u-td class="oil_year_td" width="20%">
						<span @click="wellDetails(item)">{{item.oilStationName}}</span>
					</u-td>
					<u-td class="oil_year_td" width="18%">
						<span @click="wellDetails(item)">{{item.oilPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_year_td" width="18%">
						<span @click="wellDetails(item)">{{item.oilFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_year_td" width="14%">
						<span @click="wellDetails(item)">{{item.completionRate}}%</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-if="item.yesterdayAvg > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(item)">+{{item.yesterdayAvg}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(item)">{{item.yesterdayAvg}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-if="item.toLastYear > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(item)">+{{item.toLastYear}}</span>
					</u-td>
					<u-td class="oil_year_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(item)">{{item.toLastYear}}</span>
					</u-td>
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
			},
			wellDetails(data) {
				console.log(data)
			}
		},
		onLoad() {
			_self = this;
			_self.oilYearData = {
				oilStationName: '合计',
				yearPlan: 12536,
				yearFact: 12524.35,
				sameTimeYield: 1019,
				completionRate: 99.5,
				yesterdayAvg: 126,
				toLastYear: 105
			};
			let oilNowRingData = {
				series: [{
					"name": "年计划",
					"data": _self.oilYearData.yearPlan
				}, {
					"name": "年产量",
					"data": _self.oilYearData.yearFact
				}]
			};
			_self.showRing("oilNowRing", oilNowRingData, '#2670f7', _self.oilYearData.yearPlan+"吨");
			let oilOldRingData = {
				series: [{
					"name": "同期产量",
					"data": _self.oilYearData.sameTimeYield
				}, {
					"name": "比去年",
					"data": _self.oilYearData.toLastYear
				}]
			};
			_self.showRing("oilOldRing", oilOldRingData, "#e65a40", _self.oilYearData.sameTimeYield+"吨");
			// 完成情况
			_self.oilDetailsData = [
				{
					oilStationName: '白家洼采油站',
					completionRate: 99.5,
					oilPlan: 12345,
					oilFact:1235.5,
					yesterdayAvg: 105,
					toLastYear: -10
				},
				{
					oilStationName: '上蔡渠采油站',
					completionRate: 98,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 105,
					toLastYear: -50
				},
				{
					oilStationName: '1766采油站',
					completionRate: 99.15,
					oilPlan: 1234.5,
					oilFact:12355,
					yesterdayAvg: -105,
					toLastYear: 102
				},
				{
					oilStationName: '曹伙采油站',
					completionRate: 98.99,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 105,
					toLastYear: -10
				},
				{
					oilStationName: '东关增压站',
					completionRate: 99.36,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 10.5,
					toLastYear: -110
				},
				{
					oilStationName: '1876采油站',
					completionRate: 99.18,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: -195,
					toLastYear: -320
				},
				{
					oilStationName: '东仁沟采油站',
					completionRate: 99.65,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 185,
					toLastYear: -98
				},
				{
					oilStationName: '高圈采油站',
					completionRate: 99.37,
					oilPlan: 123.45,
					oilFact:123.55,
					yesterdayAvg: 25,
					toLastYear: -64
				},
				{
					oilStationName: '一号采油站',
					completionRate: 97.95,
					oilPlan: 2345,
					oilFact:1235,
					yesterdayAvg: 35,
					toLastYear: -47
				},
				{
					oilStationName: '庙沟采油站',
					completionRate: 99.66,
					oilPlan: 2345,
					oilFact:3214,
					yesterdayAvg: -28,
					toLastYear: 47
				},
			]
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_year.css");
</style>
