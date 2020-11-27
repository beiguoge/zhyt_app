<template>
	<view class="oil_abnormal">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="oil_abnormal" v-show="load === false">
			<u-section class="abnormal_page_title" font-size="24" title="异常汇总" line-color="#113b8f" sub-title="" :arrow=false />
			<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#000" size="22" label-size="24" label-color="#000" />
			<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
				<view>所有单位</view>
			</u-popup>
			<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
			<view class="oil_abnormal_charts" >
				<canvas canvas-id="oilAbnormalColumn" id="oilAbnormalColumn" />
			</view>
			<PageTitle title_left_text="异常明细" title_right_text="" />
			<view class="oil_abnormal_details">
				<view class="details_top">
					<u-button class="details_btn" type="primary" :plain="liquidPlain" @click="showLiquidLine">液量</u-button>
					<u-button class="details_btn" type="primary" :plain="waterCutPlain" @click="showWaterCutLine">含水</u-button>
					<u-button class="details_btn" type="primary" :plain="movingLiquidPlain" @click="showMovingLiquid">动液面</u-button>
					<u-button class="details_btn" type="primary" :plain="abnormalPlain" @click="showAbnormalGT">工况</u-button>
				</view>
				<u-table class="oil_abnormal_table" border-color="#999999" padding="0 0">
					<u-tr class="oil_abnormal_tr">
						<u-td class="oil_abnormal_td" width="12%">序号</u-td>
						<u-td class="oil_abnormal_td" width="22%">井号</u-td>
						<u-td class="oil_abnormal_td" width="28%">生产时间(h)</u-td>
						<u-td class="oil_abnormal_td" width="38%">诊断结果</u-td>
					</u-tr>
					<u-tr class="oil_abnormal_tr" v-for="(item, index) in oilDetailsData" :key="index">
						<u-td class="oil_abnormal_td" width="12%">
							<span @click="wellDetails(item)">{{index+1}}</span>
						</u-td>
						<u-td class="oil_abnormal_td" width="22%">
							<span @click="wellDetails(item)">{{item.wellNum}}</span>
						</u-td>
						<u-td class="oil_abnormal_td" width="28%">
							<span @click="wellDetails(item)">{{item.time}}</span>
						</u-td>
						<u-td class="oil_abnormal_td" width="38%">
							<span @click="wellDetails(item)">{{item.warningGist}}</span>
						</u-td>
					</u-tr>
				</u-table>
				<view class="bottom_chart">
					<view class="oil_station_name">{{oilStation}}</view>
					<view class="oilLine">
						<canvas canvas-id="bottomLine" id="bottomLine" @touchstart="touchLine" />
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
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
				oilDetailsData: [],
				oilAbnormalColumnData: {},
				liquidLineData: {},
				oilStation: '定-1768—近一周产液量曲线',
				showFlag: 1,
				liquidPlain: false,
				waterCutPlain: true,
				movingLiquidPlain: true,
				abnormalPlain: true,
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
						show:false,
					},
					colors: ["#2670f7"],
					fontSize: 11,
					background: '#FFFFFF',
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						data: [{min: 0,max: 50}],
						disableGrid: true,
					},
					dataLabel: true,
					width: uni.upx2px(640)*_self.pixelRatio,
					height: uni.upx2px(320)*_self.pixelRatio,
					extra: {
						column: {
							width: 14
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
						show: false,
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
			wellDetails(oilStation, categories, series) {
				if(this.showFlag === 1) {
					this.oilStation = oilStation.wellNum + '—近一周产液量曲线';
					categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
					series = [{
						name: '产液量',
						data: [60, 30, 75, 90, 44, 68, 70],
						color: '#57c5d9'
					}];
				} else if(this.showFlag === 2) {
					this.oilStation = oilStation.wellNum + '—近一周含水曲线';
					categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
					series = [{
						name: '含水',
						data: [60, 30, 75, 90, 44, 68, 70],
						color: '#2670f7'
					}];
				} else if(this.showFlag === 3) {
					this.oilStation = oilStation.wellNum + '—不同时段动液面曲线';
					categories = ['00:00-12:00', '12:00-18:00', '18:00-20:00', '20:00-24:00'],
					series = [{
						name: '动液面',
						data: [60, 30, 75, 90],
						color: '#e65a40'
					}];
				}
				const lineData = {
					categories: categories,
					series: series,
					animation: true
				};
				canvaLine.updateData(lineData);
			},
			showLiquidLine() {
				this.liquidPlain = false;
				this.waterCutPlain = true;
				this.movingLiquidPlain = true;
				this.abnormalPlain = true;
				this.showFlag = 1;
				const oilStation = {wellNum: '定-1768'};
				const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
				const series = [{
					name: '产液量',
					data: [60, 30, 75, 90, 44, 68, 70],
					color: '#57c5d9'
				}];
				this.wellDetails(oilStation, categories, series);
			},
			showWaterCutLine() {
				this.liquidPlain = true;
				this.waterCutPlain = false;
				this.movingLiquidPlain = true;
				this.abnormalPlain = true;
				this.showFlag = 2;
				const oilStation = {wellNum: '定-1768'};
				const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
				const series = [{
					name: '含水',
					data: [60, 30, 75, 90, 44, 68, 70],
					color: '#2670f7'
				}];
				this.wellDetails(oilStation, categories, series);
			},
			showMovingLiquid() {
				this.liquidPlain = true;
				this.waterCutPlain = true;
				this.movingLiquidPlain = false;
				this.abnormalPlain = true;
				this.showFlag = 3;
				const oilStation = {wellNum: '定-1768'};
				const categories = ['00:00-12:00', '12:00-18:00', '18:00-20:00', '20:00-24:00'];
				const series = [{
					name: '动液面',
					data: [60, 30, 75, 90],
					color: '#e65a40'
				}];
				this.wellDetails(oilStation, categories, series);
			},
			showAbnormalGT() {
				this.$refs.uToast.show({
					title: '暂不支持该功能',
					type: 'warning',
					icon: false
				})
			}
		},
		onLoad() {
			_self = this;
			_self.oilDetailsData = [
				{
					time: '2020-11-01 12:03:45',
					wellNum: '定-1768',
					warningGist: '气锁'
				},
				{
					time: '2020-11-08 12:03:45',
					wellNum: '定-1745',
					warningGist: '分压异常'
				},
				{
					time: '2020-11-09 06:03:45',
					wellNum: '定-1732',
					warningGist: '泵压不足'
				},
				{
					time: '2020-11-11 12:03:45',
					wellNum: '定-1312',
					warningGist: '刺漏'
				},
				{
					time: '2020-11-11 12:03:45',
					wellNum: '定-1542',
					warningGist: '刺漏'
				},
				{
					time: '2020-11-11 12:03:45',
					wellNum: '定-1612',
					warningGist: '刺漏'
				},
				{
					time: '2020-11-11 12:03:45',
					wellNum: '定-1132',
					warningGist: '刺漏'
				}
			];
			_self.oilAbnormalColumnData = {
				categories: ["开井", "液量异常", "含水异常", "动液面异常", "工况异常"],
				series: [{
					"name": "",
					"data": [45, 15, 37, 23, 25]
				}]
			};
			_self.showClumn("oilAbnormalColumn", _self.oilAbnormalColumnData);
			_self.liquidLineData = {
				categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
				series: [{
					name: '产液量',
					data: [70, 40, 65, 100, 44, 68, 70],
					color: '#57c5d9'
				}]
			};
			_self.showLine("bottomLine", _self.liquidLineData);
		},
		onReady() {
			let that = this;
			this.$refs.loading.open();
			setTimeout(function() {
				that.load = false;
				that.$refs.loading.close();
				that.oilAbnormalColumnData.animation = true;
				canvaColumn.updateData(that.oilAbnormalColumnData);
				that.liquidLineData.animation = true;
				canvaLine.updateData(that.liquidLineData);
			}, 2500);
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/oil_abnormal.css");
</style>
