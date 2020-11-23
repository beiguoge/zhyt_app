<template>
	<view class="water_single">
		<u-section class="water_single_page_title" font-size="24" title="单井工况" line-color="#113b8f" sub-title="" :arrow=false />
		<u-icon class="title_calendar" name="calendar" @click="calendarShow = true" label="日期选择" label-pos="left" color="#000" size="30upx" label-size="24" label-color="#000" />
		<u-calendar v-model="calendarShow" mode="date" @change="selectByData" />
		<view class="single_abnormal">
			<u-table class="u-table">
				<u-tr class="u-tr">
					<u-td class="u-td">井号</u-td>
					<u-td class="u-td">{{singleWellData.wellNum}}</u-td>
					<u-td class="u-td">生产时间</u-td>
					<u-td class="u-td">{{singleWellData.wellNum}}</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">配注量</u-td>
					<u-td class="u-td">{{singleWellData.oweInjection}}</u-td>
					<u-td class="u-td">实注量</u-td>
					<u-td class="u-td">{{singleWellData.wellNum}}</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">泵压</u-td>
					<u-td class="u-td">{{singleWellData.moreInjection}}</u-td>
					<u-td class="u-td">分压</u-td>
					<u-td class="u-td">{{singleWellData.wellNum}}</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">管压</u-td>
					<u-td class="u-td">{{singleWellData.moreInjection}}</u-td>
					<u-td class="u-td">油压</u-td>
					<u-td class="u-td">{{singleWellData.wellNum}}</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td">套压</u-td>
					<u-td class="u-td">{{singleWellData.moreInjection}}</u-td>
					<u-td class="u-td">工况结果</u-td>
					<u-td class="u-td">{{singleWellData.result}}</u-td>
				</u-tr>
				<u-tr class="u-tr">
					<u-td class="u-td" width="25%">工况原因</u-td>
					<u-td class="u-td">{{singleWellData.cause}}</u-td>
				</u-tr>
			</u-table>
		</view>
		<PageTitle title_left_text="详细工况" title_right_text="" />
		<view class="single_details">
			<u-table class="single_table" border-color="#999999" padding="0 0">
				<u-tr class="single_tr">
					<u-td class="single_td" width="12%">序号</u-td>
					<u-td class="single_td" width="28%">时间</u-td>
					<u-td class="single_td" width="22%">工况预测</u-td>
					<u-td class="single_td" width="38%">预测依据</u-td>
				</u-tr>
				<u-tr class="single_tr" v-for="(item, index) in singleDetailsData" :key="index">
					<u-td class="single_td" width="12%">
						<span>{{index}}</span>
					</u-td>
					<u-td class="single_td" width="28%">
						<span>{{item.time}}</span>
					</u-td>
					<u-td class="single_td" width="22%">
						<span>{{item.abnormalWarning}}</span>
					</u-td>
					<u-td class="single_td" width="38%">
						<span>{{item.warningGist}}</span>
					</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../../../common/page_title/page_title.vue";
	var _self;
	export default {
		components: {
			PageTitle
		},
		data() {
			return {
				singleWellData: {},
				singleDetailsData: [],
				calendarShow: false
			}
		},
		methods: {
			selectByData(val) {
				console.log(val);
			},
		},
		onLoad: function(option){
			_self = this;
			const eventChannel = _self.getOpenerEventChannel();
			eventChannel.once('wellData', function(data) {
				_self.singleWellData = data;
			});
			_self.singleDetailsData = [
				{
					time: '2020-11-01 12:03:45',
					abnormalWarning: '超注',
					warningGist: '实注量超出配注量'
				},
				{
					time: '2020-11-08 12:03:45',
					abnormalWarning: '超注',
					warningGist: '分压异常'
				},
				{
					time: '2020-11-09 06:03:45',
					abnormalWarning: '欠注',
					warningGist: '泵压不足'
				},
				{
					time: '2020-11-11 12:03:45',
					abnormalWarning: '超注',
					warningGist: '刺漏'
				},
			]
		}
	}
</script>

<style>
	@import url("/static/css/application/abnormal/water_abnormal_single.css");
</style>
