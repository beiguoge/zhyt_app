<template>
	<view class="work_down">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="work_down" v-show="load === false">
			<u-section class="work_down_page_title" title="井下作业" font-size="24" line-color="#113b8f" sub-title="" :arrow=false />
			<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#000" size="22" label-size="24" label-color="#000" />
			<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
				<view>所有单位</view>
			</u-popup>
			<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
			<view class="work_down_top">
				<canvas canvas-id="workRing" id="workRing" @touchstart="touchMeasure" />
				<u-table class="work_down_top_table">
					<u-tr class="work_down_top_u-tr">
						<u-td class="work_down_top_u-td">待作业</u-td>
						<u-td class="work_down_top_u-td">{{workDownData[0].toWork}}口</u-td>
					</u-tr>
					<u-tr class="work_down_top_u-tr">
						<u-td class="work_down_top_u-td">作业中</u-td>
						<u-td class="work_down_top_u-td">{{workDownData[0].workIn}}口</u-td>
					</u-tr>
					<u-tr class="work_down_top_u-tr">
						<u-td class="work_down_top_u-td">作业完成</u-td>
						<u-td class="work_down_top_u-td">{{workDownData[0].workFinish}}口</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="work_down_table2">
				<u-table class="work_down_bottom_table">
					<u-tr class="work_down_bottom_u-tr">
						<u-th class="work_down_bottom_u-td">单位</u-th>
						<u-th class="work_down_bottom_u-td">待作业</u-th>
						<u-th class="work_down_bottom_u-td">作业中</u-th>
						<u-th class="work_down_bottom_u-td">作业完成</u-th>
					</u-tr>
					<u-tr class="work_down_bottom_u-tr" v-for="(item, index) in workDownData" :key="index">
						<u-td class="work_down_bottom_u-td">{{ item.deptName }}</u-td>
						<u-td class="work_down_bottom_u-td">{{ item.toWork }}</u-td>
						<u-td class="work_down_bottom_u-td">{{ item.workIn }}</u-td>
						<u-td class="work_down_bottom_u-td">{{ item.workFinish }}</u-td>
					</u-tr>
				</u-table>
			</view>
			<PageTitle title_left_text="作业明细" title_right_text="" />
			<view class="work_down_details">
				<u-table class="work_down_details_table" style="border-top: 0;">
					<u-tr class="work_down_details_u-tr">
						<u-th class="work_down_details_u-td">序号</u-th>
						<u-th class="work_down_details_u-td">井号</u-th>
						<u-th class="work_down_details_u-td">当前任务</u-th>
						<u-th class="work_down_details_u-td">作业名称</u-th>
						<u-th class="work_down_details_u-td">详情</u-th>
					</u-tr>
					<u-tr class="work_down_details_u-tr" v-for="(item, index) in workDownDetailsData" :key="index">
						<u-td class="work_down_details_u-td">{{ index }}</u-td>
						<u-td class="work_down_details_u-td">{{ item.wellNum }}</u-td>
						<u-td class="work_down_details_u-td">{{item.task}}</u-td>
						<u-td class="work_down_details_u-td">{{item.taskName}}</u-td>
						<u-td class="work_down_details_u-td">
							<span @click="toDetails(item.wellNum)">
								<u-icon name="arrow-right-double" color="#22b573" size="28" />
							</span>
						</u-td>
					</u-tr>
				</u-table>
			</view>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	import uCharts from '../../../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaRing;
	var workRingData = null;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				workDownData: [],
				workDownDetailsData: [],
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
				load: true
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
						lineHeight: 18
					},
					title: {
						name: '作业进度',
						color: '#778ca3',
						fontSize: 10*_self.pixelRatio
					},
					background:'#FFFFFF',
					padding: [8*_self.pixelRatio,0*_self.pixelRatio,0*_self.pixelRatio,0*_self.pixelRatio],
					colors: colors,
					pixelRatio:1,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(420)*_self.pixelRatio,
					height: uni.upx2px(420)*_self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
					extra: {
						pie: {
						  offsetAngle: -80,
						  ringWidth: 16*_self.pixelRatio,
						  labelWidth: 4
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
			toDetails(wellName) {
				uni.navigateTo({
					url: './work_down_details/work_down_details?wellName=' + wellName
				})
			}
		},
		onLoad() {
			_self = this;
			_self.workDownData = [{
				deptName: '合计',
				toWork: 20,
				workIn: 18,
				workFinish: 14
			},{
				deptName: '王圈采油站',
				toWork: 15,
				workIn: 12,
				workFinish: 6
			},{
				deptName: '1766采油站',
				toWork: 34,
				workIn: 13,
				workFinish: 24
			},{
				deptName: '高伙采油站',
				toWork: 53,
				workIn: 23,
				workFinish: 14
			},{
				deptName: '东关增压站',
				toWork: 21,
				workIn: 18,
				workFinish: 4
			}];
			_self.workDownDetailsData = [{
				wellNum: "定-1766",
				task: '地层勘探',
				taskName: '钻井'
			},{
				wellNum: "定-1234",
				task: '采油',
				taskName: '固井'
			},{
				wellNum: "定-2144",
				task: '地层勘探',
				taskName: '钻井'
			},{
				wellNum: "定-1567",
				task: '地层勘探',
				taskName: '钻井'
			},{
				wellNum: "定-1786",
				task: '地层勘探',
				taskName: '钻井'
			},{
				wellNum: "定-1921",
				task: '地层勘探',
				taskName: '钻井'
			},];
			workRingData = {
				series: [{
					"name": "项目计划中",
					"data": _self.workDownData[0].toWork
					}, {
					"name": "项目开工",
					"data": _self.workDownData[0].workIn
					}, {
					"name": "项目完成",
					"data": _self.workDownData[0].workFinish
					}]
			};
			_self.showRing("workRing", workRingData, ['#2670f7', '#57c5d9', '#e65a40']);
		},
		onReady() {
			let that = this;
			this.$refs.loading.open();
			setTimeout(function() {
				that.load = false;
				that.$refs.loading.close();
				workRingData.animation = true;
				canvaRing.updateData(workRingData);
			}, 2500);
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/work_down.css");
</style>
