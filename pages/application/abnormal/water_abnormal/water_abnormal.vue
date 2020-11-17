<template>
	<view class="water_abnormal">
		<u-section class="abnormal_page_title" title="工况汇总" line-color="#0c2461" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#0c2461" size="32upx" label-size="24" label-color="#718093" />
		<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#2979ff" size="22" label-size="24" label-color="#718093" />
		<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="abnormal_all">
			<u-table class="u-table">
				<u-tr class="u-tr">
					<u-td class="u-td">开井</u-td>
					<u-td class="u-td">450口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">欠注</u-td>
					<u-td class="u-td">60口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">超注</u-td>
					<u-td class="u-td">30口</u-td>
				</u-tr>
			</u-table>
			<canvas canvas-id="waterPie" id="waterPie" class="pie_charts_work" />
		</view>
		<PageTitle title_left_text="工况详情" title_right_text="" />
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
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
			showPie(canvasId, chartData){
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend:{
						show: true,
						position:'right',
						float:'center',
						lineHeight: 26,
					},
					background:'#FFFFFF',
					colors: ['#6a89cc', '#e66767', '#78e08f'],
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(500)*_self.pixelRatio,
					height: uni.upx2px(320)*_self.pixelRatio,
					dataLabel: false,
					extra: {
						pie: {
							offsetAngle: -20,
						    lableWidth: 15
						}
					},
				});
			}
		},
		onLoad() {
			_self = this;
			let waterPieData= {series:[]};
			waterPieData.series= [{
				"name": "正常",
				"data": 450,
				"legendShape": "rect",
				"format": () => {return 450 + '口'}
			  }, {
				"name": "欠注",
				"data": 60,
				"legendShape": "rect",
				"format": () => {return 60 + '口'}
			  }, {
				"name": "超注",
				"data": 30,
				"legendShape": "rect",
				"format": () => {return 30 + '口'}
			  }];
			_self.showPie("waterPie", waterPieData)
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/water_abnormal.css");
</style>
