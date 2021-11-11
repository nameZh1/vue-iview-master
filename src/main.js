// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import less from 'less'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '6d86b7b2be78ac668c375b84580d84d0',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
// import * as AMap from 'amap-js'
//
// // 创建AMap Loader
// const loader = new AMap.AMapLoader({
//   key: '6d86b7b2be78ac668c375b84580d84d0',
//   version: '2.0',
//   plugins: [],
// });
// // 调用 load 方法完成加载并调用执行回调。
// loader.load()
//     .then(({AMap}) => {
//       // 请求成功
//       // new AMap.Map('mapContainer')
//       console.log(AMap,1111); // => window.AMap === loader.AMap
//     })
//     .catch(e => {
//       // 请求失败
//     });

Vue.use(less) // 引入less

// Vue.use(AMap);

// // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 申请的高德key
//   key: '6d86b7b2be78ac668c375b84580d84d0',
//   // 插件集合，根据自己的需求选择插件（我是想用来定位获取cityCode，所以使用AMap.Geolocation插件）
//   plugin: []
// });

// import three from 'three'
// 引入echarts
import * as echarts from 'echarts';
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(iView) // 使用iview组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

