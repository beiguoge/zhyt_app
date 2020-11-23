<template>
	<view class="oil_abnormal">
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
				<u-button class="details_btn" type="primary">液量</u-button>
				<u-button class="details_btn" type="primary" :plain="true">含水</u-button>
				<u-button class="details_btn" type="primary" :plain="true">动液面</u-button>
				<u-button class="details_btn" type="primary" :plain="true">工况</u-button>
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
						<span>{{index}}</span>
					</u-td>
					<u-td class="oil_abnormal_td" width="28%">
						<span>{{item.wellNum}}</span>
					</u-td>
					<u-td class="oil_abnormal_td" width="22%">
						<span>{{item.time}}</span>
					</u-td>
					<u-td class="oil_abnormal_td" width="38%">
						<span>{{item.warningGist}}</span>
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
				oilAbnormalColumnData: {}
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
							width: 14
						}
					}
				});
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
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/oil_abnormal.css");
</style>
