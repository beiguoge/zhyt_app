<template>
	<view class="measure">
		<u-section class="oil_page_title" title="评价汇总" font-size="24" line-color="#113b8f" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
		<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#000" size="22" label-size="24" label-color="#000" />
		<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="measure_all">
			<canvas canvas-id="measureRing" id="measureRing" @touchstart="touchMeasure" />
			<u-table class="measure_all_table">
				<u-tr class="u-tr">
					<u-td class="u-td">作业完成</u-td>
					<u-td class="u-td">{{measureData[0].finish}}口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果正常</u-td>
					<u-td class="u-td">{{measureData[0].normal}}口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果较差</u-td>
					<u-td class="u-td">{{measureData[0].poor}}口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果失败</u-td>
					<u-td class="u-td">{{measureData[0].fail}}口</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="measure_all_list">
			<u-table class="measure_list_table">
				<u-tr class="list_u-tr">
					<u-th class="list_u-th" width="30%">单位</u-th>
					<u-th class="list_u-th">完成</u-th>
					<u-th class="list_u-th">正常</u-th>
					<u-th class="list_u-th">较差</u-th>
					<u-th class="list_u-th">失败</u-th>
					<u-th class="list_u-th">成功率</u-th>
				</u-tr>
				<u-tr class="list_u-tr" v-for="(item, index) in measureData" :key="index">
					<u-td class="list_u-td" width="30%">{{ item.wellStation }}</u-td>
					<u-td class="list_u-td">{{item.finish}}</u-td>
					<u-td class="list_u-td">{{item.normal}}</u-td>
					<u-td class="list_u-td">{{item.poor}}</u-td>
					<u-td class="list_u-td">{{item.fail}}</u-td>
					<u-td class="list_u-td">{{item.successRate}}</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="评价明细" title_right_text="" />
		<view class="measure_all_details">
			<u-table class="measure_details_table">
				<u-tr class="details_u_tr">
					<u-th class="details_u-th" width="10%">序号</u-th>
					<u-th class="details_u-th" width="20%">井号</u-th>
					<u-th class="details_u-th" width="30%">评价日期</u-th>
					<u-th class="details_u-th" width="20%">评价结果</u-th>
					<u-th class="details_u-th" width="20%">评价结论</u-th>
				</u-tr>
				<u-tr class="details_u_tr" v-for="(item, index) in measureDetailsData" :key="index">
					<u-td class="details_u_td" width="10%">{{ index+1 }}</u-td>
					<u-td class="details_u_td" width="20%">{{ item.wellNum }}</u-td>
					<u-td class="details_u_td" width="30%">{{item.time}}</u-td>
					<u-td class="details_u_td" width="20%">{{item.result}}</u-td>
					<u-td class="details_u_td" width="20%">{{item.conclusion}}</u-td>
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
				measureData: [],
				measureDetailsData: [],
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
						position:'right',
						float:'center',
						lineHeight: 26,
					},
					title: {
						name: '评价汇总',
						color: '#778ca3',
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					padding: [0*_self.pixelRatio,14*_self.pixelRatio,0*_self.pixelRatio,0*_self.pixelRatio],
					colors: colors,
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(450)*_self.pixelRatio,
					height: uni.upx2px(350)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
					extra: {
						pie: {
						  offsetAngle: -130,
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
							return item.name + ': ' + item.data.value + '口';
						}else{
							return item.name + ': ' + item.data + '口';
						}
					}
				});
			}
		},
		onLoad() {
			_self = this;
			_self.measureData = [{
				wellStation: '合计',
				finish: 267,
				normal: 248,
				poor: 24,
				fail:16,
				successRate: 92.5
			},{
				wellStation: '一号采油站',
				finish: 123,
				normal: 76,
				poor: 12,
				fail:76,
				successRate: 98.5
			},
			{
				wellStation: '高伙采油站',
				finish: 192,
				normal: 188,
				poor: 2,
				fail:3,
				successRate: 96.5
			},
			{
				wellStation: '1766采油站',
				finish: 124,
				normal: 87,
				poor: 12,
				fail:16,
				successRate: 88.9
			},
			{
				wellStation: '王圈采油站',
				finish: 267,
				normal: 248,
				poor: 24,
				fail:16,
				successRate: 92.5
			},
			{
				wellStation: '上蔡渠采油站',
				finish: 267,
				normal: 248,
				poor: 24,
				fail:16,
				successRate: 92.5
			},
			{
				wellStation: '东关采油站',
				finish: 213,
				normal: 154,
				poor: 47,
				fail:16,
				successRate: 74.15
			}];
			_self.measureDetailsData = [{
				wellNum: '定-1766',
				time: '2020-10-15 15:34:56',
				result: '作业完成',
				conclusion: '效果正常'
			},{
				wellNum: '定-1768',
				time: '2020-11-15 15:34:56',
				result: '作业完成',
				conclusion: '效果正常'
			},{
				wellNum: '定-1987',
				time: '2020-09-15 12:34:56',
				result: '作业完成',
				conclusion: '效果失败'
			},{
				wellNum: '定-9527',
				time: '2020-11-15 04:34:56',
				result: '作业完成',
				conclusion: '效果正常'
			},{
				wellNum: '定-1268',
				time: '2020-07-15 15:34:56',
				result: '作业完成',
				conclusion: '效果较差'
			},{
				wellNum: '定-2315',
				time: '2020-10-23 21:14:56',
				result: '作业完成',
				conclusion: '效果失败'
			},{
				wellNum: '定-2654',
				time: '2020-10-19 15:34:56',
				result: '作业完成',
				conclusion: '效果较差'
			}];
			let measureRingData = {
				series: [{
					"name": "作业完成",
					"data": _self.measureData[0].finish
					}, {
					"name": "效果正常",
					"data": _self.measureData[0].normal
					}, {
					"name": "效果较差",
					"data": _self.measureData[0].poor
					}, {
					"name": "效果失败",
					"data": _self.measureData[0].fail
				}]
			};
			_self.showRing("measureRing", measureRingData, ['#2670f7', '#57c5d9', '#e65a40', '#f8841d']);
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/measure.css");
</style>
