<template>
	<view class="video">
		<u-search class="video_search" @custom="search" @search="search" shape="round" search-icon-color="#0c2461" placeholder="请输入井场名" v-model="oilWell" />
		<view class="video_team">
			<view class="video_list" v-for="(item,indexSub) in oilTeam" :key="indexSub">
				<view class="video_item" v-if="indexSub === 0">
					<image class="video_team_icon" src="../../static/image/video/oil_team.png" />
					<u-section class="video_team_text" :title="item.departmentName" :right="false" />
					<u-icon name="arrow-down" color="#2979ff" size="28" />
				</view>
				<view class="video_item" v-else>
					<image class="video_team_icon" src="../../static/image/video/oil_team.png" />
					<u-section class="video_team_text" :title="item.departmentName" sub-title="" :show-line=false :arrow="true" />
				</view>
				<view class="video_item_children" v-if="indexSub === 0" v-for="(item,index) in oilStation" :key="index">
					<image class="video_team_children_icon" src="../../static/image/video/oil_station.png" />
					<u-section class="video_team_text" :title="item.departmentName" sub-title="" :show-line=false :arrow="true" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oilWell: "",
				oilTeam: [],
				oilStation: []
			}
		},
		methods: {
			oilTeamInit() {
				this.getRequest('/system/department/getDepartmentTree').then(res => {
					this.oilTeam = res.data;
					if(res.data.length < 5) {
						this.oilStation = res.data[0].children;
					}
				})
			},
			search(value) {
				console.log("search结果" + value);
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
