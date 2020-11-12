<template>
	<view class="oil_day">
		<u-section class="oil_page_title" title="日产油" line-color="#0c2461" sub-title="日期选择" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="chooseDate" color="#0c2461" size="32upx" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="oil_day_charts" >
			<canvas canvas-id="oilDayColumn" id="oilDayColumn" @touchstart="touchColumn" />
		</view>
		<PageTitle title_left_text="完成情况" title_right_text="" />
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js'
	var _self;
	var canvaColumn = null;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				calendarShow: false,
				pixelRatio: 1
			}
		},
		methods: {
			chooseDate() {
				this.calendarShow = true
			},
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
					},
					colors: ["#2ed573", "#ff4757"],
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
						gridType: 'dash'
					},
					dataLabel: true,
					width: uni.upx2px(680)*_self.pixelRatio,
					height: uni.upx2px(380)*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: 16
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
					"name": "计划产油",
					"data": [15, 45, 37, 43]
					}, {
					"name": "实际产油",
					"data": [10, 40, 34, 18]
				}]
			};
			_self.showClumn("oilDayColumn", oilColumnData);
		}
	}
</script>

<style>
	@import url("/static/css/application/product/oil_day.css");
	.oil_page_title {
		background: #F1F1F1;
		width: 100%;
		height: 80rpx;
		padding: 0 4%;
		padding-right: 9%;
	}
	.title_calendar {
		position: absolute;
		top: 2%;
		left: 93%;
	}
</style>
