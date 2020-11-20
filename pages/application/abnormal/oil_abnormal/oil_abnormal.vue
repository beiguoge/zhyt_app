<template>
	<view class="oil_abnormal">
		<u-section class="abnormal_page_title" title="异常汇总" line-color="#0c2461" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#0c2461" size="32upx" label-size="24" label-color="#718093" />
		<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#2979ff" size="22" label-size="24" label-color="#718093" />
		<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="oil_abnormal_charts" >
			<canvas canvas-id="oilAbnormalColumn" id="oilAbnormalColumn" />
		</view>
		<PageTitle title_left_text="异常明细" title_right_text="" />
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
				pixelRatio: 1
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
					colors: ["#2ed573"],
					fontSize: 11,
					background: '#FFFFFF',
					padding: [0, 0, 0, 0],
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
					width: uni.upx2px(600)*_self.pixelRatio,
					height: uni.upx2px(300)*_self.pixelRatio,
					extra: {
						column: {
							width: 16
						}
					}
				});
			}
		},
		onLoad() {
			_self = this;
			let oilAbnormalColumnData = {
				categories: ["开井", "液量异常", "含水异常", "动液面异常", "工况异常"],
				series: [{
					"name": "",
					"data": [15, 45, 37, 43, 25]
					}]
			};
			_self.showClumn("oilAbnormalColumn", oilAbnormalColumnData);
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/oil_abnormal.css");
</style>
