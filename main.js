import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import uCharts from './js_sdk/u-charts/u-charts/u-charts.js'
import wLoading from "@/components/w-loading.vue";
import { getRequest } from 'common/api/request.js'
import { postRequest } from 'common/api/request.js'
Vue.use(uView);
Vue.component('w-loading',wLoading)

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
