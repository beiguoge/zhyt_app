
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/application/application","pages/video/video","pages/user/user"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"智慧油田","navigationBarBackgroundColor":"#0c2461","backgroundColor":"#0c2461"},"tabBar":{"color":"#FFFFFF","selectedColor":"#ffd04b","borderStyle":"black","backgroundColor":"#0c2461","list":[{"pagePath":"pages/index/index","iconPath":"static/image/tabBar/index_default.png","selectedIconPath":"static/image/tabBar/index_select.png","text":"首页"},{"pagePath":"pages/application/application","iconPath":"static/image/tabBar/application_default.png","selectedIconPath":"static/image/tabBar/application_select.png","text":"应用"},{"pagePath":"pages/video/video","iconPath":"static/image/tabBar/video_default.png","selectedIconPath":"static/image/tabBar/video_select.png","text":"视频"},{"pagePath":"pages/user/user","iconPath":"static/image/tabBar/user_default.png","selectedIconPath":"static/image/tabBar/user_select.png","text":"个人"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"zhyt","compilerVersion":"2.9.8","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"智慧油田","navigationBarBackgroundColor":"#0c2461","navigationBarTextStyle":"white"}},{"path":"/pages/application/application","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"应用","enablePullDownRefresh":false}},{"path":"/pages/video/video","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"视频","enablePullDownRefresh":false}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
