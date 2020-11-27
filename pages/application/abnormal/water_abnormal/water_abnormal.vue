<template>
	<view class="water_abnormal">
		<w-loading text="加载中.." mask="true" click="false" ref="loading"/>
		<view v-show="load === true" style="width: 100%;height: 100vh;background: #FFFFFF;"/>
		<view class="water_abnormal" v-show="load === false">
			<u-section class="abnormal_page_title" title="工况汇总" font-size="24" line-color="#113b8f" sub-title="" :arrow=false />
			<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-icon class="title_dept" @click="showDept = true" name="arrow-down" label="单位选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
			<u-popup v-model="showDept" width="60%" height="100%" border-radius="20" :closeable=true>
				<view>所有单位</view>
			</u-popup>
			<u-picker v-model="calendarShow" mode="time" :params="params" @confirm="selectByData" />
			<view class="abnormal_all">
				<u-table class="water_abnormal_table">
					<u-tr class="water_abnormal_tr">
						<u-td class="water_abnormal_td">开井</u-td>
						<u-td class="water_abnormal_td">{{waterAbnormalData.openNum}}口</u-td>
					</u-tr>
					<u-tr class="water_abnormal_tr">
						<u-td class="water_abnormal_td">欠注</u-td>
						<u-td class="water_abnormal_td">{{waterAbnormalData.oweInjection}}口</u-td>
					</u-tr>
					<u-tr class="water_abnormal_tr">
						<u-td class="water_abnormal_td">超注</u-td>
						<u-td class="water_abnormal_td">{{waterAbnormalData.moreInjection}}口</u-td>
					</u-tr>
				</u-table>
				<view class="waterPie">
					<canvas canvas-id="waterPie" id="waterPie" />
				</view>
			</view>
			<PageTitle title_left_text="工况详情" title_right_text="" />
			<view class="oil_day_details">
				<u-table class="oil_day_table" border-color="#999999" padding="0 0">
					<u-tr class="oil_day_tr">
						<u-td class="oil_day_td" width="20%">井号</u-td>
						<u-td class="oil_day_td" width="20%">注水站</u-td>
						<u-td class="oil_day_td" width="25%">工况结果</u-td>
						<u-td class="oil_day_td" width="25%">工况原因</u-td>
						<u-td class="oil_day_td" width="10%">详情</u-td>
					</u-tr>
					<u-tr class="oil_day_tr" v-for="(item, index) in waterAbnormalDetailsData" :key="index">
						<u-td class="oil_day_td" width="20%">
							<span>{{item.wellNum}}</span>
						</u-td>
						<u-td class="oil_day_td" width="20%">
							<span>{{item.waterStation}}</span>
						</u-td>
						<u-td class="oil_day_td" width="25%">
							<span>{{item.result}}</span>
						</u-td>
						<u-td class="oil_day_td" width="25%">
							<span>{{item.cause}}</span>
						</u-td>
						<u-td class="oil_day_td" width="10%">
							<span @click="wellDetails(item)">
								<u-icon name="arrow-right-double" color="#22b573" size="28"/>
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
				pixelRatio: 1,
				waterAbnormalData: {},
				waterAbnormalDetailsData: [],
				waterPieData: {},
				load: true
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
					colors: ['#2670f7', '#e65a40', '#57c5d9'],
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: uni.upx2px(360)*_self.pixelRatio,
					height: uni.upx2px(280)*_self.pixelRatio,
					dataLabel: false,
					extra: {
						pie: {
							offsetAngle: -20,
						    lableWidth: 15
						}
					},
				});
			},
			wellDetails(data) {
				uni.navigateTo({
					url: './water_abnormal_single',
					success:function(res){
						res.eventChannel.emit('wellData', data)
					}
				})
			}
		},
		onLoad() {
			_self = this;
			_self.waterAbnormalData = {
				openNum: 450,
				oweInjection: 60,
				moreInjection: 30
			};
			_self.waterPieData = {
				series: [{
				"name": "正常",
				"data": _self.waterAbnormalData.openNum,
				"legendShape": "rect",
				"format": () => {return _self.waterAbnormalData.openNum + '口'}
			  }, {
				"name": "欠注",
				"data": _self.waterAbnormalData.oweInjection,
				"legendShape": "rect",
				"format": () => {return _self.waterAbnormalData.oweInjection + '口'}
			  }, {
				"name": "超注",
				"data": _self.waterAbnormalData.moreInjection,
				"legendShape": "rect",
				"format": () => {return _self.waterAbnormalData.moreInjection + '口'}
			  }]
			};
			_self.showPie("waterPie", _self.waterPieData);
			_self.waterAbnormalDetailsData = [
				{
					wellNum: "1号井",
					waterStation: "上蔡渠注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "2号井",
					waterStation: "1766注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "3号井",
					waterStation: "上蔡渠注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "4号井",
					waterStation: "曹伙注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "5号井",
					waterStation: "上蔡渠注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "6号井",
					waterStation: "东关注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "7号井",
					waterStation: "1876注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "8号井",
					waterStation: "高圈注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "9号井",
					waterStation: "上蔡渠注水站",
					result: "油管漏失",
					cause: "不详"
				},
				{
					wellNum: "10号井",
					waterStation: "庙沟注水站",
					result: "油管漏失",
					cause: "不详"
				}
			]
		},
		onReady() {
			let that = this;
			this.$refs.loading.open();
			setTimeout(function() {
				that.load = false;
				that.$refs.loading.close();
				that.waterPieData.animation = true;
				canvaPie.updateData(that.waterPieData);
			}, 2500);
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/water_abnormal.css");
</style>
