<template>
	<view class="oil_month">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="oil_month" v-show="load === false">
			<u-section class="oil_page_title" font-size="24" title="月产油" line-color="#113b8f" sub-title="" :arrow=false />
			<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
			<view class="oil_month_charts" >
				<canvas canvas-id="oilMonthColumn" id="oilMonthColumn" @touchstart="touchColumn" />
			</view>
			<PageTitle title_left_text="完成情况" title_right_text="" />
			<view class="oil_month_details">
				<u-table class="oil_month_table" border-color="#999999" padding="0 0">
					<u-tr class="oil_month_tr">
						<u-td class="oil_month_td" width="20%">场站</u-td>
						<u-td class="oil_month_td" width="18%">计划产油</u-td>
						<u-td class="oil_month_td" width="18%">实际产油</u-td>
						<u-td class="oil_month_td" width="14%">完成率</u-td>
						<u-td class="oil_month_td" width="15%">日平均</u-td>
						<u-td class="oil_month_td" width="15%">较年平均</u-td>
					</u-tr>
					<u-tr class="oil_month_tr">
						<u-td class="oil_month_td" width="20%">
							<span @click="wellDetails(oilMonthDataSum)">合计</span>
						</u-td>
						<u-td class="oil_month_td" width="18%">
							<span @click="wellDetails(oilMonthDataSum)">{{oilMonthDataSum.oilPlan}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_month_td" width="18%">
							<span @click="wellDetails(oilMonthDataSum)">{{oilMonthDataSum.oilFact}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_month_td" width="14%">
							<span @click="wellDetails(oilMonthDataSum)">{{oilMonthDataSum.completionRate}}%</span>
						</u-td>
						<u-td class="oil_month_td" width="15%" v-if="oilMonthDataSum.toYesterday > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(oilMonthDataSum)">+{{oilMonthDataSum.yesterdayAvg}}</span>
						</u-td>
						<u-td class="oil_month_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(oilMonthDataSum)">{{oilMonthDataSum.yesterdayAvg}}</span>
						</u-td>
						<u-td class="oil_month_td" width="15%" v-if="oilMonthDataSum.toYear > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(oilMonthDataSum)">+{{oilMonthDataSum.toYear}}</span>
						</u-td>
						<u-td class="oil_month_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(oilMonthDataSum)">{{oilMonthDataSum.toYear}}</span>
						</u-td>
					</u-tr>
					<u-tr class="oil_month_tr" v-for="(item, index) in oilMonthData" :key="index">
						<u-td class="oil_month_td" width="20%"><span @click="wellDetails(item)">{{item.oilStationName}}</span></u-td>
						<u-td class="oil_month_td" width="18%"><span @click="wellDetails(item)">{{item.oilPlan}}m<sup>3</sup></span></u-td>
						<u-td class="oil_month_td" width="18%"><span @click="wellDetails(item)">{{item.oilFact}}m<sup>3</sup></span></u-td>
						<u-td class="oil_month_td" width="14%"><span @click="wellDetails(item)">{{item.completionRate}}%</span></u-td>
						<u-td class="oil_month_td" width="15%" v-if="item.yesterdayAvg > 0" style="color: #e65a40;font-weight: bold;"><span @click="wellDetails(item)">+{{item.yesterdayAvg}}</span></u-td>
						<u-td class="oil_month_td" width="15%" v-else  style="color: #22b573;font-weight: bold;"><span @click="wellDetails(item)">{{item.yesterdayAvg}}</span></u-td>
						<u-td class="oil_month_td" width="15%" v-if="item.toYear > 0" style="color: #e65a40;font-weight: bold;"><span @click="wellDetails(item)">+{{item.toYear}}</span></u-td>
						<u-td class="oil_month_td" width="15%" v-else  style="color: #22b573;font-weight: bold;"><span @click="wellDetails(item)">{{item.toYear}}</span></u-td>
					</u-tr>
				</u-table>
				<view class="oil_station_name">{{oilStation}}—12个月产油曲线</view>
				<view class="oilLine">
					<canvas canvas-id="oilDayLine" id="oilDayLine" @touchstart="touchLine" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;
	var canvaLine = null;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				calendarShow: false,
				pixelRatio: 1,
				oilMonthDataSum: {},
				oilMonthData: [],
				oilColumnData: {},
				oilLineData: {},
				oilStation: '合计',
				load: true
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
						data: [{min: 5000,max: 12600}],
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
			showLine(canvasId, chartData) {
				canvaLine = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend:{
						show: true,
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 4,
						splitNumber: 5,
						min: 10,
						max: 140,
					},
					width: uni.upx2px(720)*_self.pixelRatio,
					height: uni.upx2px(400)*_self.pixelRatio,
					extra: {
						line:{
							type: 'curve',
							// type: 'straight',
							width: 1
						}
					}
				})
			},
			touchLine(e) {
				canvaLine.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			wellDetails(data) {
				this.oilStation = data.oilStationName;
				const oilData = {
					categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					series: [{
						name: '计划',
						data: [35, 60, 25, 37, 4, 20, 35, 20, 61, 37, 47, 20],
						color: '#2670f7'
					}, {
						name: '实际',
						data: [70, 40, 65, 37, 44, 68, 59, 24, 65, 100, 44, 68],
						color: '#57c5d9'
					}],
					animation: true
				};
				canvaLine.updateData(oilData);
			}
		},
		onLoad() {
			_self = this;
			_self.oilMonthDataSum = {
				oilStationName: '合计',
				completionRate: 98,
				oilPlan: 12345,
				oilFact:12355,
				yesterdayAvg: 126,
				toYear: -86
			};
			// 完成情况
			_self.oilMonthData = [
				{
					oilStationName: '白家洼采油站',
					completionRate: 99.5,
					oilPlan: 12345,
					oilFact:1235.5,
					yesterdayAvg: 105,
					toYear: -10
				},
				{
					oilStationName: '上蔡渠采油站',
					completionRate: 98.2,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 105,
					toYear: -50
				},
				{
					oilStationName: '1766采油站',
					completionRate: 96.25,
					oilPlan: 1234.5,
					oilFact:12355,
					yesterdayAvg: -105,
					toYear: 102
				},
				{
					oilStationName: '曹伙采油站',
					completionRate: 97.18,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 105,
					toYear: -10
				},
				{
					oilStationName: '东关增压站',
					completionRate: 99.56,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 10.5,
					toYear: -110
				},
				{
					oilStationName: '1876采油站',
					completionRate: 98.69,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: -195,
					toYear: -320
				},
				{
					oilStationName: '东仁沟采油站',
					completionRate: 99.5,
					oilPlan: 12345,
					oilFact:12355,
					yesterdayAvg: 185,
					toYear: -98
				},
				{
					oilStationName: '高圈采油站',
					completionRate: 97.95,
					oilPlan: 123.45,
					oilFact:123.55,
					yesterdayAvg: 25,
					toYear: -64
				},
				{
					oilStationName: '一号采油站',
					completionRate: 95.99,
					oilPlan: 2345,
					oilFact:1235,
					yesterdayAvg: 35,
					toYear: -47
				},
				{
					oilStationName: '庙沟采油站',
					completionRate: 99.85,
					oilPlan: 2345,
					oilFact:3214,
					yesterdayAvg: -28,
					toYear: 47
				},
			];
			_self.oilColumnData = {
				categories: ["总计", "旧井", "新井", "措施井"],
				series: [{
					"name": "计划",
					"data": [_self.oilMonthDataSum.oilPlan, 11520, 9512.5, 7518.56]
					}, {
					"name": "实际",
					"data": [_self.oilMonthDataSum.oilFact, 10516, 9515.6, 8510.5]
				}]
			};
			_self.showClumn("oilMonthColumn", _self.oilColumnData);
			_self.oilLineData = {
				categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
				series: [{
					name: '计划',
					data: [35, 20, 25, 37, 4, 20, 35, 20, 25, 37, 4, 20],
					color: '#2670f7'
				}, {
					name: '实际',
					data: [70, 40, 65, 100, 44, 68, 70, 40, 65, 100, 44, 68],
					color: '#57c5d9'
				}]
			};
			_self.showLine("oilDayLine", _self.oilLineData);
		},
		onReady() {
			let that = this;
			this.$refs.loading.open();
			setTimeout(function() {
				that.load = false;
				that.$refs.loading.close();
				that.oilColumnData.animation = true;
				canvaColumn.updateData(that.oilColumnData);
				that.oilLineData.animation = true;
				canvaLine.updateData(that.oilLineData);
			}, 2500);
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_month.css");
</style>
