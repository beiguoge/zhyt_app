<template>
	<view class="index">
		<PageTitle title_left_text="生产汇总" title_right_text="单位：(万吨)" />
		<view class="index_product">
			<u-table class="index_table">
				<u-tr class="u-tr">
					<u-td class="u-td">原油生产</u-td>
					<u-td class="u-td" style="border-right: 0;">154.15</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td" style="border-bottom: 0">月完成比例</u-td>
					<u-td class="u-td" style="border-right: 0;border-bottom: 0">89%</u-td>
				</u-tr>
				<u-line color="#e4e7ed" style="width: 750upx;" />
				<u-tr class="u-tr">
					<u-td class="u-td">油田注水</u-td>
					<u-td class="u-td" style="border-right: 0">295.15</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td" style="border-bottom: 0">配注合格率</u-td>
					<u-td class="u-td" style="border-right: 0;border-bottom: 0">85%</u-td>
				</u-tr>
			</u-table>
			<view class="product_charts">
				<canvas canvas-id="oilRing" id="oilRing" class="product_charts_oil" />
				<canvas canvas-id="waterRing" id="waterRing" class="product_charts_water" />
			</view>
		</view>
		<PageTitle title_left_text="工况汇总" title_right_text="单位：(口)" />
		<canvas canvas-id="workPie" id="workPie" class="pie_charts_work" />
		<PageTitle title_left_text="异常汇总" title_right_text="单位：(口)" />
		<view class="index_abnormal">
			<u-table class="index_table">
				<u-tr class="abnormal_tr">
					<u-td class="abnormal_td1" width=25%>油井</u-td>
					<u-td class="abnormal_td2">
						<u-tr class="u-tr">
							<u-td class="u-td">开井</u-td>
							<u-td class="u-td" style="border-right: 0;">7</u-td>
						</u-tr>
						<u-tr class="u-tr">
							<u-td class="u-td" style="border-bottom: 0">异常</u-td>
							<u-td class="u-td" style="border-right: 0;border-bottom: 0">11</u-td>
						</u-tr>
					</u-td>
				</u-tr>
				<u-line color="#e4e7ed" style="width: 750upx;" />
				<u-tr class="abnormal_tr">
					<u-td class="abnormal_td1" width=25%>水井</u-td>
					<u-td class="abnormal_td2">
						<u-tr class="u-tr">
							<u-td class="u-td">开井</u-td>
							<u-td class="u-td" style="border-right: 0;">9</u-td>
						</u-tr>
						<u-tr class="u-tr">
							<u-td class="u-td" style="border-bottom: 0">异常</u-td>
							<u-td class="u-td" style="border-right: 0;border-bottom: 0">15</u-td>
						</u-tr>
					</u-td>
				</u-tr>
			</u-table>
			<view class="product_charts">
				<canvas canvas-id="oilAbnormalRing" id="oilAbnormalRing" class="product_charts_oil" />
				<canvas canvas-id="waterAbnormalRing" id="waterAbnormalRing" class="product_charts_water" />
			</view>
		</view>
		<PageTitle title_left_text="重点工作" title_right_text="" />
		<view>
			<u-table class="index_last_table">
				<u-tr class="u-tr">
					<u-td class="u-td">重点工作</u-td>
					<u-td class="u-td">3</u-td>
					<u-td class="u-td">待审批</u-td>
					<u-td class="u-td" style="border-right: 0;">2</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td" style="border-bottom: 0">通知消息</u-td>
					<u-td class="u-td" style="border-bottom: 0">50</u-td>
					<u-td class="u-td" style="border-bottom: 0">已完成</u-td>
					<u-td class="u-td" style="border-right: 0;border-bottom: 0">4</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../common/page_title/page_title.vue";
	var _self;
	var canvaPie = null;
	var canvaRing;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				pixelRatio:1
			}
		},
		onLoad() {
			_self = this;
			let oilRingData = {series:[]};
			oilRingData.series = [{
				"name": "实际生产",
				"data": 154.15
			}, {
				"name": "未完成生产",
				"data": 43.25
			}];
			let waterRingData = {series:[]};
			waterRingData.series = [{
				"name": "注水",
				"data": 295.15
			}, {
				"name": "未完成配注",
				"data": 43.25
			}];
			let oilAbnormalRingData = {series:[]};
			oilAbnormalRingData.series = [{
				"name": "开井",
				"data": 18
			}, {
				"name": "异常",
				"data": 7
			}];
			let waterAbnormalRingData = {series:[]};
			waterAbnormalRingData.series = [{
				"name": "开井",
				"data": 15
			}, {
				"name": "异常",
				"data": 4
			}];
			_self.showRing("oilRing", oilRingData, '#6a89cc', "154.15吨");
			_self.showRing("waterRing", waterRingData, "#ea8685", "295.15吨");
			_self.showRing("oilAbnormalRing", oilAbnormalRingData, '#f3a683', "34.7%");
			_self.showRing("waterAbnormalRing", waterAbnormalRingData, "#63cdda", "22.1%");
			let workPieData= {series:[]};
			workPieData.series= [{
				"name": "正常井     450",
				"data": 450,
				"legendShape": "rect",
				"format": () => {return 450 + '口'}
			  }, {
				"name": "一级预警  60",
				"data": 60,
				"legendShape": "rect",
				"format": () => {return 60 + '口'}
			  }, {
				"name": "二级预警  30",
				"data": 30,
				"legendShape": "rect",
				"format": () => {return 30 + '口'}
			  }, {
				"name": "三级预警  5",
				"data": 5,
				"legendShape": "rect",
				"format": () => {return 5 + '口'}
			  }];
			_self.showPie("workPie", workPieData)
		},
		methods: {
			showPie(canvasId, chartData){
				canvaPie = this.uCharts({
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
					colors: ['#6a89cc', '#e66767', '#78e08f', '#fff200'],
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(720)*_self.pixelRatio,
					height: uni.upx2px(360)*_self.pixelRatio,
					dataLabel: false,
					extra: {
						pie: {
							offsetAngle: -20,
						    lableWidth: 15
						}
					},
				});
			},
			showRing(canvasId, chartData, color, title) {
				canvaRing = this.uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend:{show: false},
					padding: [-6*_self.pixelRatio,15*_self.pixelRatio,20*_self.pixelRatio,15*_self.pixelRatio],
					title: {
						name: title,
						color: color,
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					colors: [color, '#FFFFFF'],
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(330)*_self.pixelRatio,
					height: uni.upx2px(230)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					extra: {
						pie: {
						  offsetAngle: -10,
						  ringWidth: 14*_self.pixelRatio,
						  labelWidth: 15
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("/static/css/index/index.css");
</style>
