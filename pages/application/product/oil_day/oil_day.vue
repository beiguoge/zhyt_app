<template>
	<view class="oil_day">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="oil_day" v-show="load === false">
			<u-section class="oil_page_title" font-size="24" title="日产油" line-color="#113b8f" sub-title="" :arrow=false />
			<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
			<view class="oil_day_charts" >
				<canvas canvas-id="oilDayColumn" id="oilDayColumn" @touchstart="touchColumn" />
			</view>
			<PageTitle title_left_text="完成情况" title_right_text="" />
			<view class="oil_day_details">
				<u-table class="oil_day_table" border-color="#999999" padding="0 0">
					<u-tr class="oil_day_tr">
						<u-td class="oil_day_td" width="20%">场站</u-td>
						<u-td class="oil_day_td" width="14%">开井</u-td>
						<u-td class="oil_day_td" width="18%">计划产油</u-td>
						<u-td class="oil_day_td" width="18%">实际产油</u-td>
						<u-td class="oil_day_td" width="15%">较昨日</u-td>
						<u-td class="oil_day_td" width="15%">较月平均</u-td>
					</u-tr>
					<u-tr class="oil_day_tr">
						<u-td class="oil_day_td" width="20%">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.oilStationName}}</span>
						</u-td>
						<u-td class="oil_day_td" width="14%">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.openNum}}</span>
						</u-td>
						<u-td class="oil_day_td" width="18%">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.oilPlan}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_day_td" width="18%">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.oilFact}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-if="oilDayDataSum.toYesterday > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(oilDayDataSum)">+{{oilDayDataSum.toYesterday}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.toYesterday}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-if="oilDayDataSum.toMonth > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(oilDayDataSum)">+{{oilDayDataSum.toMonth}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-else style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(oilDayDataSum)">{{oilDayDataSum.toMonth}}</span>
						</u-td>
					</u-tr>
					<u-tr class="oil_day_tr" v-for="(item, index) in oilDayData" :key="index">
						<u-td class="oil_day_td" width="20%">
							<span @click="wellDetails(item)">{{item.oilStationName}}</span>
						</u-td>
						<u-td class="oil_day_td" width="14%">
							<span @click="wellDetails(item)">{{item.openNum}}</span>
						</u-td>
						<u-td class="oil_day_td" width="18%">
							<span @click="wellDetails(item)">{{item.oilPlan}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_day_td" width="18%">
							<span @click="wellDetails(item)">{{item.oilFact}}m<sup>3</sup></span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-if="item.toYesterday > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(item)">+{{item.toYesterday}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(item)">{{item.toYesterday}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-if="item.toMonth > 0" style="color: #e65a40;font-weight: bold;">
							<span @click="wellDetails(item)">+{{item.toMonth}}</span>
						</u-td>
						<u-td class="oil_day_td" width="15%" v-else  style="color: #22b573;font-weight: bold;">
							<span @click="wellDetails(item)">{{item.toMonth}}</span>
						</u-td>
					</u-tr>
				</u-table>
				<view class="oil_station_name">{{oilStation}}—近15天产油曲线</view>
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
				oilDayDataSum: {},
				oilDayData: [],
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
					categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
					series: [{
						name: '计划',
						data: [35, 60, 25, 37, 4, 20, 35, 20, 61, 37, 47, 20, 102, 20, 25],
						color: '#2670f7'
					}, {
						name: '实际',
						data: [70, 40, 65, 37, 44, 68, 59, 24, 65, 100, 44, 68, 70, 62, 41],
						color: '#57c5d9'
					}],
					animation: true
				};
				canvaLine.updateData(oilData);
			}
		},
		onLoad() {
			_self = this;
			_self.oilDayDataSum = {
				oilStationName: '合计',
				openNum: 320,
				oilPlan: 12345,
				oilFact:12355,
				toYesterday: 125,
				toMonth: -86
			};
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
			];
			_self.oilColumnData = {
				categories: ["总计", "旧井", "新井", "措施井"],
				series: [{
					"name": "计划",
					"data": [12345, 11520, 9512.5, 7518.56]
					}, {
					"name": "实际",
					"data": [12355, 10516, 9515.6, 8510.5]
				}]
			};
			_self.showClumn("oilDayColumn", _self.oilColumnData);
			_self.oilLineData = {
				categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
				series: [{
					name: '计划',
					data: [35, 20, 25, 37, 4, 20, 35, 20, 25, 37, 4, 20, 35, 20, 25],
					color: '#2670f7'
				}, {
					name: '实际',
					data: [70, 40, 65, 100, 44, 68, 70, 40, 65, 100, 44, 68, 70, 40, 65],
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
	@import url("/static/css/application/product/oil_day.css");
</style>
