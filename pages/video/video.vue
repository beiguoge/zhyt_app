<template>
	<view class="video">
		<u-search class="video_search" @custom="search" @search="search" shape="round" search-icon-color="#0c2461" placeholder="请输入井场名" v-model="oilWell" />
		<view class="video_team">
			<u-collapse :head-style="headStyle">
				<u-collapse-item :title="item.departmentName" :open="true" v-for="(item, index) in oilTeam" :key="index">
					<view class="video_item" v-for="(itemX,indexX) in item.children" :key="indexX" @click="detailsVideo(itemX)">
						<image class="video_item_icon" src="../../static/image/video/oil_station.png" />
						<u-section class="video_item_text" :title="itemX.departmentName" sub-title="" :show-line=false :arrow="true" />
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oilWell: "",
				oilTeam: [],
				headStyle: {
					fontSize: '28rpx',
					fontWeight: 'bold',
					paddingLeft: '4%',
					paddingRight: '2%',
					background: '#f3f4f6',
					height: '85rpx'
				}
			}
		},
		methods: {
			oilTeamInit() {
				this.getRequest('/system/department/getDepartmentTree').then(res => {
					this.oilTeam = res.data;
				})
			},
			search(value) {
				let videos = this.oilTeam[0].children;
				let that = this;
				if(value === '' || value === null) {
					that.$refs.uToast.show({
						title: '请输入井场名',
						type: 'warning',
						icon: false
					})
				} else {
					for (let i = 0; i < videos.length; i++) {
						if(value === videos[i].departmentName) {
							uni.navigateTo({
								url: 'video_details?stationName=' + value
							});
							break;
						}
						if(i === videos.length-1 && value !== videos[i].departmentName) {
							that.$refs.uToast.show({
								title: '暂无搜索结果',
								type: 'error',
								icon: false
							})
						}
					}
				}
			},
			detailsVideo(data) {
				uni.navigateTo({
					url: 'video_details?stationName=' + data.departmentName
				})
			}
		},
		onLoad() {
			this.oilTeamInit()
		}
	}
</script>

<style>
	@import url("/static/css/video/video.css");
</style>
