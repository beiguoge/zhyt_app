<template>
	<view class="index">
		<PageTitle title_left_text="生产汇总" title_right_text="单位：(万吨)" />
		<view class="index_product">
			<u-table class="product_table">
				<u-tr class="product_tr">
					<u-td class="product_td">
						<view class="left_text">
							<view class="left_text_title">原油生产</view>
							<view class="left_text_value">{{this.productData.oilData}}</view>
						</view>
					</u-td>
					<u-td class="product_td">
						<view class="right_ring">
							<view class="right_ring_text">月完成比例</view>
							<canvas canvas-id="oilRing" id="oilRing" />
						</view>
					</u-td>
				</u-tr>
				<u-tr class="product_tr">
					<u-td class="product_td">
						<view class="left_text">
							<view class="left_text_title">油田注水</view>
							<view class="left_text_value">{{this.productData.waterData}}</view>
						</view>
					</u-td>
					<u-td class="product_td">
						<view class="right_ring">
							<view class="right_ring_text">配注合格率</view>
							<canvas canvas-id="waterRing" id="waterRing" />
						</view>
					</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="工况汇总" title_right_text="单位：(口)" />
		<canvas canvas-id="workRing" id="workRing" />
		<PageTitle title_left_text="异常汇总" title_right_text="单位：(口)" />
		<view class="index_abnormal">
			<u-table class="abnormal_table">
				<u-tr class="abnormal_tr">
					<u-td class="abnormal_td1" width="25%">油井</u-td>
					<u-td class="abnormal_td2" width="50%">
						<u-tr class="abnormal_tr">
							<view class="abnormal_open">
								<view class="abnormal_title">开井</view>
								<view class="abnormal_value" style="color: #2670f7;">{{this.abnormalData.oilOpen}}</view>
							</view>
						</u-tr>
						<u-tr class="abnormal_tr">
							<view class="abnormal_abnormal">
								<view class="abnormal_title">异常</view>
								<view class="abnormal_value" style="color: #e65a40;">{{this.abnormalData.oilAbnormal}}</view>
							</view>
						</u-tr>
					</u-td>
					<u-td class="abnormal_td3" width="25%">
						<canvas canvas-id="oilAbnormalRing" id="oilAbnormalRing" />
					</u-td>
				</u-tr>
				<u-tr class="abnormal_tr">
					<u-td class="abnormal_td1" width="25%">注水井</u-td>
					<u-td class="abnormal_td2" width="50%">
						<u-tr class="abnormal_tr">
							<view class="abnormal_open">
								<view class="abnormal_title">开井</view>
								<view class="abnormal_value" style="color: #2670f7;">{{this.abnormalData.waterOpen}}</view>
							</view>
						</u-tr>
						<u-tr class="abnormal_tr">
							<view class="abnormal_abnormal">
								<view class="abnormal_title">异常</view>
								<view class="abnormal_value" style="color: #e65a40;">{{this.abnormalData.waterAbnormal}}</view>
							</view>
						</u-tr>
					</u-td>
					<u-td class="abnormal_td3" width="25%">
						<canvas canvas-id="waterAbnormalRing" id="waterAbnormalRing" />
					</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="重点工作" title_right_text="" />
		<view class="index_work" style="height: 200rpx;">
			<u-table class="work_table">
				<u-tr class="work_tr">
					<u-td class="work_td">
						<view class="work_text">
							<view class="work_title">重点工作</view>
							<view class="work_value">{{this.workData.importantData}}</view>
						</view>
					</u-td>
					<u-td class="work_td">
						<view class="work_text">
							<view class="work_title">待审批</view>
							<view class="work_value" style="color: #e65a40;">{{this.workData.checkData}}</view>
						</view>
					</u-td>
				</u-tr>
				<u-tr class="work_tr">
					<u-td class="work_td">
						<view class="work_text">
							<view class="work_title">通知消息</view>
							<view class="work_value" style="color: #e65a40;">{{this.workData.messageData}}</view>
						</view>
					</u-td>
					<u-td class="work_td">
						<view class="work_text">
							<view class="work_title">已完成</view>
							<view class="work_value">{{this.workData.finishData}}</view>
						</view>
					</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../common/page_title/page_title.vue";
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	var canvaRing;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				pixelRatio: 1,
				// 生产汇总
				productData: {
					oilData: 0,
					waterData: 0
				},
				// 异常汇总
				abnormalData: {
					oilOpen: 0,
					oilAbnormal: 0,
					waterOpen: 0,
					waterAbnormal: 0
				},
				// 重点工作
				workData: {
					importantData: 0,
					checkData: 0,
					messageData: 0,
					finishData: 0
				}
			}
		},
		onLoad() {
			_self = this;
			// 生产汇总
			_self.productData = {oilData: 154.15, waterData: 295.15};
			let oilRingData = {
				series:[{
					"name": "实际生产",
					"data": _self.productData.oilData
				}, {
					"name": "未完成生产",
					"data": 43.25
				}]
			};
			_self.showRing("oilRing", oilRingData, ['#f8841d', '#e6e6e6'], (Math.round(_self.productData.oilData / (_self.productData.oilData+43.25) * 10000) / 100.00)+"%", 200, 200, [-20*_self.pixelRatio,18*_self.pixelRatio,20*_self.pixelRatio,6*_self.pixelRatio], false, 8);
			let waterRingData = {
				series:[{
					"name": "注水",
					"data": _self.productData.waterData
				}, {
					"name": "未完成配注",
					"data": 43.25
				}]
			};
			_self.showRing("waterRing", waterRingData, ['#57c5d9', '#e6e6e6'], (Math.round(_self.productData.waterData / (_self.productData.waterData+43.25) * 10000) / 100.00)+"%", 200, 200, [-20*_self.pixelRatio,18*_self.pixelRatio,20*_self.pixelRatio,6*_self.pixelRatio], false, 8);
			// 工况汇总
			let workRingData = {
				series: [{
					"name": "正常井     1005",
					"data": 1005,
					"legendShape": 'rect'
				  }, {
					"name": "一级预警  20",
					"data": 20,
					"legendShape": 'rect'
				  }, {
					"name": "二级预警  50",
					"data": 50,
					"legendShape": 'rect'
				  }, {
					"name": "三级预警  10",
					"data": 10,
					"legendShape": 'rect'
				  }]
			};
			_self.showRing("workRing", workRingData, ['#2670f7', '#e65a40', '#f8841d', '#57c5d9'],"", 700, 260, [0, 0, 0, 0], true, 14);
			// 异常汇总
			_self.abnormalData = {
				oilOpen: 15,
				oilAbnormal: 8,
				waterOpen: 18,
				waterAbnormal: 7
			};
			let oilAbnormalRingData = {
				series: [{
					"name": "开井",
					"data": _self.abnormalData.oilOpen
				}, {
					"name": "异常",
					"data": _self.abnormalData.oilAbnormal
				}]
			};
			_self.showRing("oilAbnormalRing", oilAbnormalRingData, ['#e65a40', '#e6e6e6'], (Math.round(_self.abnormalData.oilOpen / (_self.abnormalData.oilOpen+_self.abnormalData.oilAbnormal) * 10000) / 100.00)+"%", 200, 200, [-20*_self.pixelRatio,18*_self.pixelRatio,20*_self.pixelRatio,6*_self.pixelRatio], false, 8);
			let waterAbnormalRingData = {
				series: [{
					"name": "开井",
					"data": _self.abnormalData.waterOpen
				}, {
					"name": "异常",
					"data": _self.abnormalData.waterAbnormal
				}]
			};
			_self.showRing("waterAbnormalRing", waterAbnormalRingData, ["#2670f7", '#e6e6e6'], (Math.round(_self.abnormalData.waterOpen / (_self.abnormalData.waterOpen+_self.abnormalData.waterAbnormal) * 10000) / 100.00)+"%", 200, 200, [-20*_self.pixelRatio,18*_self.pixelRatio,20*_self.pixelRatio,6*_self.pixelRatio], false, 8);
			// 重点工作
			_self.workData = {
				importantData: 20,
				checkData: 5,
				messageData: 4,
				finishData: 15
			}
		},
		methods: {
			showRing(canvasId, chartData, colors, title, width, height, padding, dataLabel, ringWidth) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend:{
						show: dataLabel,
						position: 'right',
						fontSize: 13,
						lineHeight: 24
					},
					padding: padding,
					title: {
						name: title,
						color: colors[0],
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					colors: colors,
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(width)*_self.pixelRatio,
					height: uni.upx2px(height)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: dataLabel,
					extra: {
						pie: {
						  offsetAngle: 10,
						  ringWidth: ringWidth*_self.pixelRatio,
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
