<template>
	<view class="measure">
		<u-section class="oil_page_title" title="评价汇总" line-color="#0c2461" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#0c2461" size="32upx" label-size="24" label-color="#718093" />
		<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#2979ff" size="22" label-size="24" label-color="#718093" />
		<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
			<view>所有单位</view>
		</u-popup>
		<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
		<view class="measure_all">
			<canvas canvas-id="measureRing" id="measureRing" @touchstart="touchMeasure" />
			<u-table class="measure_all_table">
				<u-tr class="u-tr">
					<u-td class="u-td">作业完成</u-td>
					<u-td class="u-td">20口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果正常</u-td>
					<u-td class="u-td">18口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果较差</u-td>
					<u-td class="u-td">14口</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">效果失败</u-td>
					<u-td class="u-td">6口</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="measure_all_list">
			<u-table class="measure_list_th" border-color="#3742fa">
				<u-tr class="list_u-tr">
					<u-th class="list_u-th" width="200rpx">单位</u-th>
					<u-th class="list_u-th">完成</u-th>
					<u-th class="list_u-th">正常</u-th>
					<u-th class="list_u-th">较差</u-th>
					<u-th class="list_u-th">失败</u-th>
					<u-th class="list_u-th">成功率</u-th>
				</u-tr>
			</u-table>
			<u-table class="measure_list_th" bg-color="#d1d8e0">
				<u-tr class="list_u-tr">
					<u-th class="list_u-th" width="200rpx">合计</u-th>
					<u-th class="list_u-th">267</u-th>
					<u-th class="list_u-th">248</u-th>
					<u-th class="list_u-th">24</u-th>
					<u-th class="list_u-th">16</u-th>
					<u-th class="list_u-th">92.5%</u-th>
				</u-tr>
			</u-table>
			<scroll-view class="measure_all_scroll" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll" @scrolltolower="changeList">
				<u-table class="measure_list_all_item">
					<u-tr class="list_u-tr" v-for="x in number" :key="x" v-if="x%2 == 0">
						<u-td class="list_u-td" width="200rpx">{{ x }}号采油站</u-td>
						<u-td class="list_u-td">22</u-td>
						<u-td class="list_u-td">3</u-td>
						<u-td class="list_u-td">2</u-td>
						<u-td class="list_u-td">1</u-td>
						<u-td class="list_u-td">92%</u-td>
					</u-tr>
					<u-tr class="list_u-tr" v-else style="background: #2bcbba;">
						<u-td class="list_u-td" width="200rpx">{{ x }}号采油站</u-td>
						<u-td class="list_u-td">34</u-td>
						<u-td class="list_u-td">12</u-td>
						<u-td class="list_u-td">2</u-td>
						<u-td class="list_u-td">6</u-td>
						<u-td class="list_u-td">87%</u-td>
					</u-tr>
				</u-table>
			</scroll-view>
		</view>
		<u-divider color="#808e9b" height="80" half-width="260" border-color="#0fbcf9" @tap="goTop">返回顶部</u-divider>
		<PageTitle title_left_text="评价明细" title_right_text="" />
		<u-table class="measure_list_details">
			<u-tr class="u_tr">
				<u-th class="u_th">序号</u-th>
				<u-th class="u_th">井号</u-th>
				<u-th class="u_th">评价日期</u-th>
				<u-th class="u_th">评价结果</u-th>
				<u-th class="u_th">评价结论</u-th>
			</u-tr>
			<u-tr class="u_tr" v-for="x in number" :key="x" v-if="x%2 == 0">
				<u-td class="u_td">{{ x }}</u-td>
				<u-td class="u_td">定{{ x }}</u-td>
				<u-td class="u_td">3</u-td>
				<u-td class="u_td">正常</u-td>
				<u-td class="u_td">正常</u-td>
			</u-tr>
			<u-tr class="u_tr" v-else style="background: #2bcbba;">
				<u-td class="u_td">{{ x }}</u-td>
				<u-td class="u_td">定{{ x }}</u-td>
				<u-td class="u_td">12</u-td>
				<u-td class="u_td">较差</u-td>
				<u-td class="u_td">油管漏失</u-td>
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
				pixelRatio: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				number: 6
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
						  offsetAngle: -30,
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
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			changeList(e) {
				this.number += 10
			},
			goTop(e) {
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				this.number = 6;
			},
			changePage(e) {
				console.log(e)
			}
		},
		onLoad() {
			_self = this;
			let measureRingData = {
				series: [{
					"name": "作业完成",
					"data": 20
					}, {
					"name": "效果正常",
					"data": 18
					}, {
					"name": "效果较差",
					"data": 14
					}, {
					"name": "效果失败",
					"data": 6
				}]
			};
			_self.showRing("measureRing", measureRingData, ['#45aaf2', '#2bcbba', '#fc5c65', '#fed330']);
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/measure.css");
</style>
