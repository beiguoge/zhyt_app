<template>
	<view class="oil_day">
		<u-section class="oil_page_title" font-size="24" title="日注水" line-color="#113b8f" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="oil_day_charts" >
			<canvas canvas-id="waterColumn" id="waterColumn" @touchstart="touchColumn" />
		</view>
		<PageTitle title_left_text="完成情况" title_right_text="" />
		<view class="oil_day_details">
			<u-table class="oil_day_table" border-color="#999999" padding="0 0">
				<u-tr class="oil_day_tr">
					<u-td class="oil_day_td" width="20%">场站</u-td>
					<u-td class="oil_day_td" width="14%">开井</u-td>
					<u-td class="oil_day_td" width="18%">配注</u-td>
					<u-td class="oil_day_td" width="18%">实注</u-td>
					<u-td class="oil_day_td" width="15%">实配差</u-td>
					<u-td class="oil_day_td" width="15%">较昨日</u-td>
				</u-tr>
				<u-tr class="oil_day_tr">
					<u-td class="oil_day_td" width="20%">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.oilStationName}}</span>
					</u-td>
					<u-td class="oil_day_td" width="14%">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.openNum}}</span>
					</u-td>
					<u-td class="oil_day_td" width="18%">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.injectionPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_day_td" width="18%">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.injectionFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-if="waterDayDataSum.poorFact > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(waterDayDataSum)">+{{waterDayDataSum.poorFact}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.poorFact}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-if="waterDayDataSum.toYesterday > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(waterDayDataSum)">+{{waterDayDataSum.toYesterday}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(waterDayDataSum)">{{waterDayDataSum.toYesterday}}</span>
					</u-td>
				</u-tr>
				<u-tr class="oil_day_tr" v-for="(item, index) in waterDayData" :key="index">
					<u-td class="oil_day_td" width="20%">
						<span @click="wellDetails(item)">{{item.oilStationName}}</span>
					</u-td>
					<u-td class="oil_day_td" width="14%">
						<span @click="wellDetails(item)">{{item.openNum}}</span>
					</u-td>
					<u-td class="oil_day_td" width="18%">
						<span @click="wellDetails(item)">{{item.injectionPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_day_td" width="18%">
						<span @click="wellDetails(item)">{{item.injectionFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-if="item.poorFact > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(item)">+{{item.poorFact}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(item)">{{item.poorFact}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-if="item.toYesterday > 0" style="color: #e65a40;font-weight: bold;">
						<span @click="wellDetails(item)">+{{item.toYesterday}}</span>
					</u-td>
					<u-td class="oil_day_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
						<span @click="wellDetails(item)">{{item.toYesterday}}</span>
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
	var canvaColumn = null;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				calendarShow: false,
				pixelRatio: 1,
				waterDayDataSum: {},
				waterDayData: [],
				waterColumnData: {}
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
						data: [{min: 5000,max: 12500}],
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
			},
			wellDetails(data) {
				const oilData = {
					categories: ["总计", "转注", "投注"],
					series: [{
						"name": "计划",
						"data": [data.injectionPlan, 11520, 9512.5]
						}, {
						"name": "实际",
						"data": [data.injectionFact, 10516, 9515.6]
					}],
					animation: true
				};
				canvaColumn.updateData(oilData);
			}
		},
		onLoad() {
			_self = this;
			_self.waterDayDataSum = {
				oilStationName: '合计',
				openNum: 320,
				injectionPlan: 12345,
				injectionFact:12355,
				toYesterday: 125,
				poorFact: -86
			};
			// 完成情况
			_self.waterDayData = [
				{
					oilStationName: '白家洼采油站',
					openNum: 10,
					injectionPlan: 12345,
					injectionFact:1235.5,
					toYesterday: 105,
					poorFact: -10
				},
				{
					oilStationName: '上蔡渠采油站',
					openNum: 23,
					injectionPlan: 12345,
					injectionFact:12355,
					toYesterday: 105,
					poorFact: -50
				},
				{
					oilStationName: '1766采油站',
					openNum: 16,
					injectionPlan: 1234.5,
					injectionFact:12355,
					toYesterday: -105,
					poorFact: 102
				},
				{
					oilStationName: '曹伙采油站',
					openNum: 25,
					injectionPlan: 12345,
					injectionFact:12355,
					toYesterday: 105,
					poorFact: -10
				},
				{
					oilStationName: '东关增压站',
					openNum: 42,
					injectionPlan: 12345,
					injectionFact:12355,
					toYesterday: 10.5,
					poorFact: -110
				},
				{
					oilStationName: '1876采油站',
					openNum: 15,
					injectionPlan: 12345,
					injectionFact:12355,
					toYesterday: -195,
					poorFact: -320
				},
				{
					oilStationName: '东仁沟采油站',
					openNum: 21,
					injectionPlan: 12345,
					injectionFact:12355,
					toYesterday: 185,
					poorFact: -98
				},
				{
					oilStationName: '高圈采油站',
					openNum: 45,
					injectionPlan: 123.45,
					injectionFact:123.55,
					toYesterday: 25,
					poorFact: -64
				},
				{
					oilStationName: '一号采油站',
					openNum: 17,
					injectionPlan: 2345,
					injectionFact:1235,
					toYesterday: 35,
					poorFact: -47
				},
				{
					oilStationName: '庙沟采油站',
					openNum: 13,
					injectionPlan: 2345,
					injectionFact:3214,
					toYesterday: -28,
					poorFact: 47
				},
			];
			_self.waterColumnData = {
				categories: ["总计", "转注", "投注"],
				series: [{
					"name": "计划",
					"data": [12345, 11520, 9512.5]
					}, {
					"name": "实际",
					"data": [12355, 10516, 9515.6]
				}]
			};
			_self.showClumn("waterColumn", _self.waterColumnData);
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_day.css");
</style>
