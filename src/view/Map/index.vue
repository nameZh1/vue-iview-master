<template>
  <div>
    <el-amap class="mapContainer" :center="center" :zoom="mapZoom" :vid="'amap-vue'">

    </el-amap>
    <div class="mapContainer" id="mapContainer">
    </div>
    <Button @click="test">销毁</Button>
  </div>
</template>
<script>
export default {
  name:'Map',
  data() {
    return {
      mapGis: null,
      center: [108.354272, 22.819636],
      mapZoom: 9,
    }
  },
  mounted() {
  },
  methods: {
    test() {

    }
  }
}
</script>
<!--<script>-->
<!--import * as AMap from 'amap-js'-->
<!--// import AA from 'AMap'-->

<!--export default {-->
<!--  name: "Map",-->
<!--  data() {-->
<!--    return {-->
<!--      // 108.354272, 22.819636-->
<!--      center: [108.354272, 22.819636],-->
<!--      mapZoom: 9,-->
<!--      mapGis: null,-->
<!--      flag: [-->
<!--        {id: 1, name: 'wzh'},-->
<!--        {id: 2, name: 'pjh'},-->
<!--        {id: 3, name: '777'},-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.init()-->
<!--  },-->
<!--  methods: {-->
<!--    init() {-->
<!--      this.initMap()-->
<!--      // const mapContainer = document.getElementById('mapContainer')-->
<!--      // this.mapGis = new AMap.Map('mapContainer)', {-->
<!--      //   content: [],-->
<!--      //   zooms: [5 - 11]-->
<!--      // })-->
<!--    },-->
<!--    test() {-->
<!--      this.mapGis.destroy();-->
<!--    },-->
<!--    // 初始化地图-->
<!--    initMap() {-->
<!--      // 创建AMap Loader-->
<!--      const loader = new AMap.AMapLoader({-->
<!--        key: '6d86b7b2be78ac668c375b84580d84d0',-->
<!--        version: '2.0',-->
<!--        plugins: ["AMap.Marker"],-->
<!--      });-->
<!--      // 调用 load 方法完成加载并调用执行回调。-->
<!--      loader.load()-->
<!--          .then(({AMap}) => {-->
<!--            // 请求成功-->
<!--            // new AMap.Map('mapContainer')-->
<!--            const container = document.getElementById('mapContainer')-->
<!--            // 创建地图实例-->
<!--            this.mapGis = new AMap.Map(container, {-->
<!--              center: [108.354272, 22.819636],-->
<!--              zoom: this.mapZoom-->
<!--            })-->
<!--            // console.log(AMap); // => window.AMap === loader.AMap-->
<!--            // const marker = new AMap.Marker({-->
<!--            //   map:  this.mapGis,-->
<!--            //   center: [108.354272, 22.819636]-->
<!--            // })-->

<!--            this.mapGis.on("complete", function(){-->
<!--              alert('加载完成')-->
<!--            });-->



<!--          })-->
<!--          .catch(e => {-->
<!--            // 请求失败-->
<!--          });-->
<!--    },-->
<!--    handler({BMap, map}) {-->
<!--      console.log(BMap, map)-->
<!--      this.center.lng = 116.404-->
<!--      this.center.lat = 39.915-->
<!--      this.zoom = 15-->
<!--    }-->


<!--    // 组件初始化-->
<!--    // init() {-->
<!--    //   // this.$Spin.show()-->
<!--    //   // setTimeout(() => {-->
<!--    //   //   this.$Spin.hide()-->
<!--    //   // },2000)  // 两秒后执行-->
<!--    //-->
<!--    //-->
<!--    //   // this.flag && this.flag.splice(0, 2);-->
<!--    //   // alert(this.flag || 'default')-->
<!--    //-->
<!--    //   // let timer = setInterval(() => {    // 周期执行直到mapGis存在-->
<!--    //   //   this.initMap()-->
<!--    //   //   if(this.mapGis){-->
<!--    //   //     this.$Spin.hide();-->
<!--    //   //     clearInterval(timer)-->
<!--    //   //   }-->
<!--    //   // }, 100)-->
<!--    //-->
<!--    //   // let wzh = this.flag.map(item => item.name) // 不影响原数组下修改数组并返回数组-->
<!--    //   // console.log(wzh);-->
<!--    //-->
<!--    //   // console.log(this.flag)-->
<!--    //   // for (const key in this.flag) {-->
<!--    //   //   console.log(key)-->
<!--    //   // }-->
<!--    //   // this.flag.forEach((elem, index) => {-->
<!--    //   //   console.log(elem,index)-->
<!--    //   // });-->
<!--    //   // for (const [index, elem] of this.flag.entries()) {-->
<!--    //   //   console.log(index, elem)-->
<!--    //   // }-->
<!--    //   // let wzh = this.flag.filter(i => {-->
<!--    //   //   if(i.id > 1)-->
<!--    //   //     return i.id + '号'-->
<!--    //   // })-->
<!--    //   // console.log(wzh)-->
<!--    //-->
<!--    //   // let map = new Map();-->
<!--    //   // map.set('wzh', 123)-->
<!--    //   // map.set('777', 777)-->
<!--    //   // alert(map.get('777'))-->
<!--    // },-->
<!--    // // 地图初始化-->
<!--    // mapInit() {-->
<!--    //   let mapOption = {-->
<!--    //     container: 'map',-->
<!--    //     style: '',-->
<!--    //     center: [108.354272, 22.819636],-->
<!--    //     zoom: this.mapZoom-->
<!--    //   }-->
<!--    //   this.mapGis = new WebGIS.Map(mapOption)-->
<!--    // },-->
<!--    // // 地图方法  load zoom-->
<!--    // gisMapActions() {-->
<!--    //   this.heatmap && this.heatmap.remove() // 如果heatmap已经存在就删除-->
<!--    //   this.mapGis.on('load', () => {-->
<!--    //     this.cardMarkerGroup = new WebGIS.Graphics.MarkerGroup(this.mapGis) // 创建一个marker图层-->
<!--    //     this.initHeatMap()-->
<!--    //   })-->
<!--    // },-->
<!--    // initHeatMap(flag) {-->
<!--    //   this.heatmap && this.heatmap.remove()-->
<!--    // }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less">
@import "map";

</style>
