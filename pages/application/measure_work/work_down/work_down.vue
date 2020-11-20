<template>
	<view class="work_down">
		<u-section class="work_down_page_title" title="井下作业" line-color="#0c2461" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#0c2461" size="32upx" label-size="24" label-color="#718093" />
		<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#2979ff" size="22" label-size="24" label-color="#718093" />
		<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="work_down_top">
			<canvas canvas-id="workRing" id="workRing" @touchstart="touchMeasure" />
			<u-table class="work_down_top_table">
				<u-tr class="work_down_top_u-tr">
					<u-td class="work_down_top_u-td">待作业</u-td>
					<u-td class="work_down_top_u-td">20口</u-td>
				</u-tr>
				<u-tr class="work_down_top_u-tr">
					<u-td class="work_down_top_u-td">作业中</u-td>
					<u-td class="work_down_top_u-td">18口</u-td>
				</u-tr>
				<u-tr class="work_down_top_u-tr">
					<u-td class="work_down_top_u-td">作业完成</u-td>
					<u-td class="work_down_top_u-td">14口</u-td>
				</u-tr>
			</u-table>
		</view>
		<u-table class="work_down_bottom_table">
			<u-tr class="work_down_bottom_u-tr">
				<u-th class="work_down_bottom_u-td">单位</u-th>
				<u-th class="work_down_bottom_u-td">待作业</u-th>
				<u-th class="work_down_bottom_u-td">作业中</u-th>
				<u-th class="work_down_bottom_u-td">作业完成</u-th>
			</u-tr>
			<u-tr class="work_down_bottom_u-tr">
				<u-td class="work_down_bottom_u-td">合计</u-td>
				<u-td class="work_down_bottom_u-td">20口</u-td>
				<u-td class="work_down_bottom_u-td">18口</u-td>
				<u-td class="work_down_bottom_u-td">14口</u-td>
			</u-tr>
			<u-tr class="work_down_bottom_u-tr" style="background: #2bcbba;" v-for="x in 6" :key="x" v-if="x%2 === 0">
				<u-td class="work_down_bottom_u-td">{{ x }}号采油站</u-td>
				<u-td class="work_down_bottom_u-td">20口</u-td>
				<u-td class="work_down_bottom_u-td">18口</u-td>
				<u-td class="work_down_bottom_u-td">14口</u-td>
			</u-tr>
			<u-tr class="work_down_bottom_u-tr" v-else>
				<u-td class="work_down_bottom_u-td">{{ x }}号采油站</u-td>
				<u-td class="work_down_bottom_u-td">20口</u-td>
				<u-td class="work_down_bottom_u-td">18口</u-td>
				<u-td class="work_down_bottom_u-td">14口</u-td>
			</u-tr>
		</u-table>
		<PageTitle title_left_text="作业明细" title_right_text="" />
		<u-table class="work_down_details_table">
			<u-tr class="work_down_details_u-tr">
				<u-th class="work_down_details_u-td">序号</u-th>
				<u-th class="work_down_details_u-td">井号</u-th>
				<u-th class="work_down_details_u-td">当前任务</u-th>
				<u-th class="work_down_details_u-td">作业名称</u-th>
				<u-th class="work_down_details_u-td">详情</u-th>
			</u-tr>
			<u-tr class="work_down_details_u-tr" style="background: #2bcbba;" v-for="x in 6" :key="x" v-if="x%2 === 0">
				<u-td class="work_down_details_u-td">{{ x }}</u-td>
				<u-td class="work_down_details_u-td">{{ x }}号井</u-td>
				<u-td class="work_down_details_u-td">待作业</u-td>
				<u-td class="work_down_details_u-td">正常</u-td>
				<u-td class="work_down_details_u-td" style="border-bottom: 0;">
					<u-icon class="details_table_icon" name="arrow-right-double" size="28" top="20" @click="toDetails(x)" />
				</u-td>
			</u-tr>
			<u-tr class="work_down_details_u-tr" v-else>
				<u-td class="work_down_details_u-td">{{ x }}</u-td>
				<u-td class="work_down_details_u-td">{{ x }}号井</u-td>
				<u-td class="work_down_details_u-td">作业完成</u-td>
				<u-td class="work_down_details_u-td">较差</u-td>
				<u-td class="work_down_details_u-td" style="border-bottom: 0;">
					<u-icon class="details_table_icon" name="arrow-right-double" size="28" top="20" @click="toDetails(x)" />
				</u-td>
			</u-tr>
		</u-table>
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
			showRing(canvasId, chartData, colors, title) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend:{
						show: true,
						lineHeight: 12
					},
					title: {
						name: '作业进度',
						color: '#778ca3',
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					padding: [0*_self.pixelRatio,16*_self.pixelRatio,0*_self.pixelRatio,0*_self.pixelRatio],
					colors: colors,
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(465)*_self.pixelRatio,
					height: uni.upx2px(400)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
					extra: {
						pie: {
						  offsetAngle: -80,
						  ringWidth: 20*_self.pixelRatio,
						  labelWidth: 15
						}
					}
				})
			},
			touchMeasure(e) {
				canvaRing.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return item.name + ': ' + item.data.value;
						}else{
							return item.name + ': ' + item.data;
						}
					}
				});
			},
			toDetails(x) {
				uni.navigateTo({
					url: './work_down_details/work_down_details?id=' + x
				})
			}
		},
		onLoad() {
			_self = this;
			let workRingData = {
				series: [{
					"name": "项目计划中",
					"data": 20
					}, {
					"name": "项目开工",
					"data": 18
					}, {
					"name": "项目完成",
					"data": 14
					}]
			};
			_self.showRing("workRing", workRingData, ['#45aaf2', '#2bcbba', '#fc5c65']);
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/work_down.css");
</style>
