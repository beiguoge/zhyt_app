<template>
	<view class="work_down_details">
		<PageTitle :title_left_text='`${x}号井作业进度`' title_right_text="" />
		<uni-steps class="step" :options="stepList" :active="1" active-color="#2979ff" />
		<view class="step1" @click="stepInfo('1')"/>
		<view class="step2" @click="stepInfo('2')"/>
		<view class="step3" @click="stepInfo('3')"/>
		<view class="step4" @click="stepInfo('4')"/>
		<PageTitle title_left_text="节点详情" title_right_text="" />
		<view class="details_info">
			<view class="details_info_1" v-if="showFlag === '1'">
				<u-icon class="details_info_icon" label="上报" color="#2979ff" label-color="#2979ff" size="30" name="clock-fill" />
				<u-table class="details_info_table">
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">作业名称</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">作业类型</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">上报人</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">上报时间</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">备注</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">附件(下载)</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="details_info_2" v-else-if="showFlag === '2'">
				<u-icon class="details_info_icon" label="派工" color="#2979ff" label-color="#2979ff" size="30" name="clock-fill" />
				<u-table class="details_info_table">
					<u-tr class="details_info_tr1">
						<u-td class="details_info_td1" width=25%>上次</u-td>
						<u-td class="details_info_td2">
							<u-tr class="u-tr1">
								<u-td class="u-td">作业名称</u-td>
								<u-td class="u-td">作业队伍</u-td>
							</u-tr>
							<u-tr class="u-tr1">
								<u-td class="u-td">作业时间</u-td>
								<u-td class="u-td">据现在*天</u-td>
							</u-tr>
						</u-td>
					</u-tr>
					<u-tr class="details_info_tr2">
						<u-td class="details_info_td1" width=25%>本次</u-td>
						<u-td class="details_info_td2">
							<u-tr class="u-tr2">
								<u-td class="u-td">作业名称</u-td>
								<u-td class="u-td">作业队伍</u-td>
							</u-tr>
							<u-tr class="u-tr2">
								<u-td class="u-td">派工单编号</u-td>
								<u-td class="u-td">备注</u-td>
							</u-tr>
							<u-tr class="u-tr2">
								<u-td class="u-td">附件</u-td>
								<u-td class="u-td">www.baidu.com</u-td>
							</u-tr>
						</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="details_info_3" v-else-if="showFlag === '3'">
				<u-icon class="details_info_icon" label="现场作业" color="#2979ff" label-color="#2979ff" size="30" name="clock-fill" />
				<u-table class="details_info_table">
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">上报次数</u-td>
						<u-td class="details_info_u-td">1  2  3  4</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">上报日期</u-td>
						<u-td class="details_info_u-td">上报人</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">进度描述</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">现场照片</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
					<u-tr class="details_info_u-tr">
						<u-td class="details_info_u-td">附件</u-td>
						<u-td class="details_info_u-td">20口</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="details_info_4" v-else-if="showFlag === '4'">
				<u-icon class="details_info_icon" label="效果评价" color="#2979ff" label-color="#2979ff" size="30" name="clock-fill" />
				<view>评价结果</view>
				<view>评价日期</view>
				<view>评价结论</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PageTitle from "../../../../../common/page_title/page_title.vue";
	import uniSteps from '../../../../../components/uni-steps/uni-steps.vue'
	export default {
		components: {
			PageTitle,
			uniSteps
		},
		data() {
			return {
				x: 0,
				stepList: [{
					title: '上报',
					desc: '2020-09-12',
					person: '张三'
				}, {
					title: '派工',
					desc: '2020-09-14',
					person: '李四'
				}, {
					title: '现场作业',
					desc: '2020-09-15',
					person: '张三'
				}, {
					title: '效果评价',
					desc: '2020-09-18',
					person: '王五'
				}],
				showFlag: 0
			}
		},
		methods: {
			stepInfo(index) {
				this.showFlag = index;
			}
		},
		onLoad:function(option){
			this.x = option.id;
			this.showFlag = option.id;
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/work_down_details.css");
</style>
