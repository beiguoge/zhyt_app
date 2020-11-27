<template>
	<view class="work_down_details">
		<PageTitle :title_left_text='`${wellName}作业进度`' title_right_text="" />
		<uni-steps class="step" :options="stepList" :active="0" active-color="#2979ff" />
		<view class="step1" @click="stepInfo(1)"/>
		<view class="step2" @click="stepInfo(2)"/>
		<view class="step3" @click="stepInfo(3)"/>
		<view class="step4" @click="stepInfo(4)"/>
		<PageTitle title_left_text="节点详情" title_right_text="" />
		<view class="details_info">
			<view class="details_info" v-if="showFlag === 1">
				<u-card class="details_card" title="上报" title-color="#2979ff" border-radius="20" title-size="28" thumb="/static/image/application/node.png" thumb-width="36">
					<view class="" slot="body">
						<view class="card_item">
							<view class="card_item_title">作业名称:</view>
							<view class="card_item_text">{{reportInfo.workName}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业类型:</view>
							<view class="card_item_text">{{reportInfo.workType}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">上报人:</view>
							<view class="card_item_text">{{reportInfo.reportPerson}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">上报时间:</view>
							<view class="card_item_text">{{reportInfo.reportTime}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">备注:</view>
							<view class="card_item_text">{{reportInfo.remark}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">附件(下载、预览)</view>
							<view class="word" @click="downloadFile">
								<u-image width="45rpx" height="48rpx" src="/static/image/application/word.png" />
								<u-link class="card_item_text" href="#" font-size="25" style="margin-top: 2%;">{{reportInfo.annex}}</u-link>
							</view>
						</view>
					</view>
				</u-card>
			</view>
			<view class="details_info" v-else-if="showFlag === 2">
				<u-card class="details_card" title="派工" title-color="#2979ff" border-radius="20" title-size="28" thumb="/static/image/application/node.png" thumb-width="36">
					<view class="" slot="body">
						<view class="card_item">
							<view class="card_item_title_parent">上次:</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业名称:</view>
							<view class="card_item_text">{{dispatchData.lastWorkName}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业队伍:</view>
							<view class="card_item_text">{{dispatchData.lastWorkTeam}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业时间:</view>
							<view class="card_item_text">据现在{{dispatchData.lastWorkTime}}(天)</view>
						</view>
						<view class="card_item">
							<view class="card_item_title_parent">本次:</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业名称:</view>
							<view class="card_item_text">{{dispatchData.workName}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">作业队伍:</view>
							<view class="card_item_text">{{dispatchData.workTeam}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">派工单号:</view>
							<view class="card_item_text">{{dispatchData.listNum}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">备注:</view>
							<view class="card_item_text">{{dispatchData.remark}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">附件(下载、预览)</view>
							<view class="word" @click="downloadFile">
								<u-image width="45rpx" height="48rpx" src="/static/image/application/word.png" />
								<u-link class="card_item_text" href="#" font-size="25" style="margin-top: 2%;">{{dispatchData.annex}}</u-link>
							</view>
						</view>
					</view>
				</u-card>
			</view>
			<view class="details_info" v-else-if="showFlag === 3">
				<u-card class="details_card" title="现场作业" title-color="#2979ff" border-radius="20" title-size="28" thumb="/static/image/application/node.png" thumb-width="36">
					<view class="" slot="body">
						<view class="card_item">
							<view class="card_item_title">上报次数:</view>
							<view class="card_item_text_num" v-for="index of workSceneData.length" @click="changeScene(index-1)">
								<view style="color: #007AFF;" v-if="index-1 === chooseSceneData.reportNum">{{index}}</view>
								<view v-else>{{index}}</view>
							</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">上报人:</view>
							<view class="card_item_text">{{chooseSceneData.reportPerson}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">上报日期:</view>
							<view class="card_item_text">{{chooseSceneData.reportTime}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">进度描述:</view>
							<view class="card_item_text">{{chooseSceneData.progressDescribe}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">现场照片:</view>
							<u-image class="card_item_text" width="62rpx" height="54rpx" :src="chooseSceneData.img" @click="preview(chooseSceneData.img)">
								<u-loading slot="loading" />
							</u-image>
							<view style="margin-left: 5%;margin-top: 2%;">点击看大图</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">附件(下载、预览)</view>
							<view class="word" @click="downloadFile">
								<u-image width="45rpx" height="48rpx" src="/static/image/application/word.png" />
								<u-link class="card_item_text" href="#" font-size="25" style="margin-top: 2%;">{{chooseSceneData.annex}}</u-link>
							</view>
						</view>
					</view>
				</u-card>
			</view>
			<view class="details_info" v-else-if="showFlag === 4">
				<u-card class="details_card" title="效果评价" title-color="#2979ff" border-radius="20" title-size="28" thumb="/static/image/application/node.png" thumb-width="36">
					<view class="" slot="body">
						<view class="card_item">
							<view class="card_item_title">评价结果:</view>
							<view class="card_item_text">{{assessData.result}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">评价日期:</view>
							<view class="card_item_text">{{assessData.assessTime}}</view>
						</view>
						<view class="card_item">
							<view class="card_item_title">评价结论:</view>
							<view class="card_item_text">{{assessData.conclusion}}</view>
						</view>
					</view>
				</u-card>
			</view>
		</view>
		<u-popup v-model="showImg" mode="center" width="100%" height="40%" :mask-custom-style="maskCustomStyle">
			<u-image width="100%" height="100%" :src="showPath" />
		</u-popup>
		<u-toast ref="uToast" />
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
				wellName: '',
				stepList: [],
				showFlag: 0,
				reportInfo: {},
				dispatchData: {},
				workSceneData: [],
				chooseSceneData: {},
				assessData: {},
				showPath: '',
				showImg: false,
				maskCustomStyle: {
					background: '#000'
				}
			}
		},
		methods: {
			stepInfo(index) {
				this.showFlag = index;
			},
			preview(path) {
				this.showPath = path;
				this.showImg = true
			},
			changeScene(index) {
				this.chooseSceneData = this.workSceneData[index];
			},
			downloadFile() {
				console.log('aaa');
				let that = this;
				uni.downloadFile({
					url: 'https://finance-1255360499.cos.ap-beijing.myqcloud.com/finance/user/user_multipartFile04bdf570-b489-470f-a9b9-4b7c9d5a7029.gif',
					success: (res) => {
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success:function(res){
								uni.openDocument({
									filePath: res.savedFilePath
								})
							}
						})
					},
					fail: (res) => {
						this.$refs.uToast.show({
							title: '下载失败,请检查网络',
							type: 'error'
						})
					}
				})
			}
		},
		onLoad:function(option){
			this.wellName = option.wellName;
			this.showFlag = 1;
			this.stepList = [{
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
			}];
			this.reportInfo = {
				workName: '钻井',
				workType: '施工',
				reportPerson: '张三',
				reportTime: '2020-11-24',
				remark: '施工需三天完成',
				annex: '钻井施工.docx'
			};
			this.dispatchData = {
				workName: '钻井',
				workTeam: '钻井大队一队',
				listNum: '2020-11-24-14-53',
				lastWorkName: '钻井',
				lastWorkTeam: '钻井大队一队',
				lastWorkTime: 6,
				remark: '施工需三天完成',
				annex: '钻井施工.docx'
			}
			this.workSceneData = [{
				reportNum: 0,
				reportPerson: '张三',
				reportTime: '2020-10-24',
				progressDescribe: '已完成28%',
				img: '/static/image/application/drilling0.jpg',
				annex: '钻井施工.docx'
			},{
				reportNum: 1,
				reportPerson: '李四',
				reportTime: '2020-10-28',
				progressDescribe: '已完成58%',
				img: '/static/image/application/drilling1.jpg',
				annex: '钻井施工.docx'
			},{
				reportNum: 2,
				reportPerson: '王五',
				reportTime: '2020-11-04',
				progressDescribe: '已完成78%',
				img: '/static/image/application/drilling2.jpg',
				annex: '钻井施工.docx'
			},{
				reportNum: 3,
				reportPerson: '赵六',
				reportTime: '2020-11-14',
				progressDescribe: '已完成98%',
				img: '/static/image/application/drilling3.jpg',
				annex: '钻井施工.docx'
			}];
			this.chooseSceneData = this.workSceneData[0];
			this.assessData = {
				result: '作业良好',
				assessTime: '2020-11-04 12:54:33',
				conclusion: '该作业大队态度认真负责'
			}
		}
	}
</script>

<style>
	@import url("/static/css/application/measure_work/work_down_details.css");
</style>
