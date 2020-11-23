<template>
	<view class="water_current">
		<PageTitle title_left_text="实时注水" title_right_text="" />
		<view class="water_current_top">
			<u-table class="water_current_top_table" padding="0 0">
				<u-tr class="water_current_top_tr">
					<u-td class="water_current_top_td1" width="70%">
						<u-tr class="water_current_top_tr">
							<u-td class="water_current_top_td">配注</u-td>
							<u-td class="water_current_top_td" style="font-weight: bold;border-right: 0;">
								<span>{{waterCurrentData.injectionPlan}}m<sup>3</sup></span>
							</u-td>
						</u-tr>
						<u-tr class="water_current_top_tr">
							<u-td class="water_current_top_td" style="border-bottom: 0;">实注</u-td>
							<u-td class="water_current_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">
								<span>{{waterCurrentData.injectionFact}}m<sup>3</sup></span>
							</u-td>
						</u-tr>
					</u-td>
					<u-td class="water_current_top_td2" width="30%">
						<canvas canvas-id="waterCurrentRing" id="waterCurrentRing" />
					</u-td>
				</u-tr>
				<u-tr class="water_current_top_tr">
					<u-td class="water_current_top_td1" width="70%">
						<u-tr class="water_current_top_tr">
							<u-td class="water_current_top_td">预测超注</u-td>
							<u-td class="water_current_top_td" style="font-weight: bold;border-right: 0;">{{waterCurrentData.moreInjection}}口</u-td>
						</u-tr>
						<u-tr class="water_current_top_tr">
							<u-td class="water_current_top_td" style="border-bottom: 0;">预测欠注</u-td>
							<u-td class="water_current_top_td" style="font-weight: bold;border-right: 0;border-bottom: 0;">{{waterCurrentData.oweInjection}}口</u-td>
						</u-tr>
					</u-td>
					<u-td class="water_current_top_td2" width="30%">
						<canvas canvas-id="waterWarningRing" id="waterWarningRing" />
					</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="完成情况" title_right_text="" />
		<view class="water_current_details">
			<u-table class="water_current_table" border-color="#999999" padding="0 0">
				<u-tr class="water_current_tr">
					<u-td class="water_current_td" width="20%">场站</u-td>
					<u-td class="water_current_td" width="18%">配注</u-td>
					<u-td class="water_current_td" width="18%">实注</u-td>
					<u-td class="water_current_td" width="14%">完成率</u-td>
					<u-td class="water_current_td" width="15%">预警超注</u-td>
					<u-td class="water_current_td" width="15%">预警欠注</u-td>
				</u-tr>
				<u-tr class="water_current_tr">
					<u-td class="water_current_td" width="20%">
						<span>{{waterCurrentData.oilStationName}}</span>
					</u-td>
					<u-td class="water_current_td" width="18%">
						<span>{{waterCurrentData.injectionPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="water_current_td" width="18%">
						<span>{{waterCurrentData.injectionFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="water_current_td" width="14%">
						<span>{{waterCurrentData.completionRate}}%</span>
					</u-td>
					<u-td class="water_current_td" width="15%">
						<span>{{waterCurrentData.moreInjection}}</span>
					</u-td>
					<u-td class="water_current_td" width="15%">
						<span>{{waterCurrentData.oweInjection}}</span>
					</u-td>
				</u-tr>
				<u-tr class="water_current_tr" v-for="(item, index) in waterDetailsData" :key="index">
					<u-td class="water_current_td" width="20%">
						<span>{{item.oilStationName}}</span>
					</u-td>
					<u-td class="water_current_td" width="18%">
						<span>{{item.injectionPlan}}m<sup>3</sup></span>
					</u-td>
					<u-td class="water_current_td" width="18%">
						<span>{{item.injectionFact}}m<sup>3</sup></span>
					</u-td>
					<u-td class="water_current_td" width="14%">
						<span>{{item.completionRate}}%</span>
					</u-td>
					<u-td class="water_current_td" width="15%">
						<span>{{item.moreInjection}}</span>
					</u-td>
					<u-td class="water_current_td" width="15%">
						<span>{{item.oweInjection}}</span>
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
				pixelRatio: 1,
				waterCurrentData: {},
				waterDetailsData: []
			}
		},
		methods: {
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
			}
		},
		onLoad() {
			_self = this;
			_self.waterCurrentData = {
				oilStationName: '合计',
				injectionPlan: 12536,
				injectionFact: 12524.5,
				completionRate: 99.5,
				moreInjection: 126,
				oweInjection: 105
			};
			let waterCurrentRingData = {
				series: [{
					"name": "年计划",
					"data": _self.waterCurrentData.yearPlan
				}, {
					"name": "年产量",
					"data": _self.waterCurrentData.yearFact
				}]
			};
			_self.showRing("waterCurrentRing", waterCurrentRingData, '#2670f7', _self.waterCurrentData.yearPlan+"吨");
			let waterWarningRingData = {
				series: [{
					"name": "同期产量",
					"data": _self.waterCurrentData.sameTimeYield
				}, {
					"name": "比去年",
					"data": _self.waterCurrentData.toLastYear
				}]
			};
			_self.showRing("waterWarningRing", waterWarningRingData, "#e65a40", _self.waterCurrentData.sameTimeYield+"吨");
			// 完成情况
			_self.waterDetailsData = [
				{
					oilStationName: '白家洼采油站',
					completionRate: 99.5,
					injectionPlan: 12345,
					injectionFact:1235.5,
					moreInjection: 105,
					oweInjection: 10
				},
				{
					oilStationName: '上蔡渠采油站',
					completionRate: 98,
					injectionPlan: 12345,
					injectionFact:12355,
					moreInjection: 105,
					oweInjection: 50
				},
				{
					oilStationName: '1766采油站',
					completionRate: 99.15,
					injectionPlan: 1234.5,
					injectionFact:12355,
					moreInjection: 105,
					oweInjection: 102
				},
				{
					oilStationName: '曹伙采油站',
					completionRate: 98.99,
					injectionPlan: 12345,
					injectionFact:12355,
					moreInjection: 105,
					oweInjection: 10
				},
				{
					oilStationName: '东关增压站',
					completionRate: 99.36,
					injectionPlan: 12345,
					injectionFact:12355,
					moreInjection: 15,
					oweInjection: 110
				},
				{
					oilStationName: '1876采油站',
					completionRate: 99.18,
					injectionPlan: 12345,
					injectionFact:12355,
					moreInjection: 195,
					oweInjection: 32
				},
				{
					oilStationName: '东仁沟采油站',
					completionRate: 99.65,
					injectionPlan: 12345,
					injectionFact:12355,
					moreInjection: 185,
					oweInjection: 98
				},
				{
					oilStationName: '高圈采油站',
					completionRate: 99.37,
					injectionPlan: 123.45,
					injectionFact:123.55,
					moreInjection: 25,
					oweInjection: 64
				},
				{
					oilStationName: '一号采油站',
					completionRate: 97.95,
					injectionPlan: 2345,
					injectionFact:1235,
					moreInjection: 35,
					oweInjection: 47
				},
				{
					oilStationName: '庙沟采油站',
					completionRate: 99.66,
					injectionPlan: 2345,
					injectionFact:3214,
					moreInjection: 28,
					oweInjection: 47
				},
			]
		}
	}
</script>

<style>
	@import url("/static/css/application/product/water_current.css");
</style>
