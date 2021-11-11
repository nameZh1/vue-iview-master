<template>
  <div>
    <div id="map" class="mapContainer"></div>
    <!--        <Input search enter-button placeholder="请输入关键字" style="width: 300px;margin:40px 0 0 30px;" />-->
    <div class="selectBox">
      <div class="allBox">
        <Checkbox
            :value="checkAll"
            :indeterminate="indeterminate"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <div class="checkBox">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox label="重载"></Checkbox>
          <Checkbox label="过载"></Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { getMarkerData, addCardModalMarker } from '@/libs/marker_gis.js'
import { getOverloadMapList } from '@/api/map'
import { faultCardModalData } from '@/libs/common_gis'
export default {
  name: 'index',
  data () {
    return {
      indeterminate: false,
      checkAll: true,
      checkAllGroup: ['重载', '过载'],
      params: {},
      deviceList: [],
      currentZoom: 8,
    }
  },
  // beforeDestroy () {
  //     clearInterval(this.timer)
  // },
  async mounted () {
    let { county_company_id, company_id } = this.$parent.info;
    this.params = { county_company_id, 'power_supply_institute_id': company_id }
    // this.$Spin.show();
    // await this.getOverLoadData()
    // this.timer = setInterval(() => {
    //     this.initMap()
    //     if(this.mapGis){
    //         this.$Spin.hide();
    //         clearInterval(this.timer)
    //     }
    // }, 100)

    window.addEventListener("click", async ev => {
      let name = ev.target.className, id = ev.target.id;
      if (name == 'closeAir') {
        this.cardMarkerGroup.removeLayer();
      }
      if (id == 'airDeatail') {
        alert('详情')
      }
    })

  },
  methods: {
    // 全选
    async handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if(this.checkAll){
        this.checkAllGroup = ['重载', '过载']
      } else {
        this.checkAllGroup = []
      }
      await this.getOverLoadData()
      this.judgeByMapZoom()
    },
    // 多选框选择
    async checkAllGroupChange(data) {
      if (data.length) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      await this.getOverLoadData()
      this.judgeByMapZoom()
    },
    // 根据当前地图层级，判断是渲染热力图 || 打点
    judgeByMapZoom() {
      if(this.currentZoom >= 12){  // 打点
        this.filterDevByIds(true)
      } else {  // 热力图
        this.initHeatMap()
      }
    },
    // 请求数据
    async getOverLoadData() {
      if(this.checkAllGroup.length == 2) {
        this.params.heavy_overload_type = '';
      } else if(this.checkAllGroup.length == 1) {
        this.params.heavy_overload_type = this.checkAllGroup[0] == '重载' ? 3 : 2;
      } else {
        this.deviceList = []
        return;
      }
      await getOverloadMapList(this.params).then(res => {
        let list = res.data;
        this.deviceList = list.filter(item => item.heavy_overload_type && item.heavy_overload_type != 1)
      })
    },
    // 初始化地图
    initMap() {
      this.mapGis = new WebGIS.Map({
        container: 'map',
        style: "webgis://styles/normal",
        center: [108.354272, 22.819636],
        zoom: this.currentZoom,
      })
      this.mapGis && this.gisMapActions()
    },
    // 地图的方法 -- load  zoomend
    gisMapActions(){
      this.mapGis.on('load', () => {  // 地图 load 完成
        this.cardMarkerGroup = new WebGIS.Graphics.MarkerGroup(this.mapGis);
        this.initHeatMap()
      })
      this.mapGis.on('zoomend', (e) => {  // 地图缩放
        let zoom = this.mapGis.getZoom()
        this.currentZoom = zoom;
        this.cardMarkerGroup.removeLayer();
        console.log(zoom, 1111)
        this.initHeatMap(zoom > 12)
        this.filterDevByIds(zoom >= 12);
      })
    },
    //调地图 api 渲染热力图
    initHeatMap(flag) {
      this.heatmap && this.heatmap.remove()
      if(flag || this.deviceList.length == 0) return
      let deviceWeight = {};
      for (let item of this.deviceList) {
        deviceWeight[item.dev_id + ""] = 4
      }
      this.heatmap = this.heatmap || new WebGIS.Charts.HeatMap(this.mapGis);
      this.heatmap.setDeviceSource(deviceWeight)
    },
    // 根据设备id 获取 设备数据  经纬度
    filterDevByIds(flag) {
      this.lowMarkerGroup && this.lowMarkerGroup.removeLayer();
      if(!flag) {
        this.cardMarkerGroup.removeLayer();
        return
      }
      let devIds = this.deviceList.map(item => item.dev_id);
      console.log(devIds)
      this.queryDevices = this.queryDevices || new WebGIS.Query.QueryDevices();
      this.queryDevices.queryDeviceByIds({ devIdList: devIds }, (data) => {
        this.deviceListById = data.result.psr_data_list[0].psr_list;
        this.hanlePointData()
      });
    },
    // {x: ,y: }  墨卡特转经纬度
    getLngLat(poi){
      var lnglat = {};
      lnglat.lng = poi.x/20037508.34*180;
      var mmy = poi.y/20037508.34*180;
      lnglat.lat = 180/Math.PI*(2*Math.atan(Math.exp(mmy*Math.PI/180))-Math.PI/2);
      return lnglat;
    },
    // 处理故障点的数据  渲染图标
    hanlePointData() {
      let arr = [];
      for (let item of this.deviceListById) {
        let darr = this.deviceList.filter(i => i.dev_id == item.dev_id );
        if(darr.length) {
          let url = 'gzd_gz.png';
          if(darr[0].heavy_overload_type == 3) {
            url = 'gzd_zz.png';
          }
          let poi = item.coordinate.split(' ')
          let poi2 = this.getLngLat({x: poi[0], y: poi[1]});
          arr.push({
            id: item.dev_id,
            coordinates: [poi2.lng, poi2.lat],
            url: url,
          })
        }
      }
      let obj = getMarkerData(arr, [50, 37]);
      this.lowMarkerGroup = this.lowMarkerGroup || new WebGIS.Graphics.MarkerGroup(this.mapGis);
      this.lowMarkerGroup.setData(obj)
      this.lowMarkerGroup.on("click", (e) => {
        let cid = e.feature.properties.id;
        let coordinate = e.feature.geometry.coordinates;
        this.setFaultMarkerPopup(cid, coordinate)
      })
    },
    // 点击图标弹出
    setFaultMarkerPopup(cid, coordinates){
      let obj = this.deviceList.filter(i => i.dev_id == cid)[0];
      this.curClickPoint = obj;
      let content = faultCardModalData(obj);
      this.cardMarkerGroup.setData(addCardModalMarker({id: cid, coordinates}, content))
    }
  }
}
</script>

<style>
.selectBox .ivu-checkbox{margin-right: 22px;}
</style>
<style  lang="less">
.mapContainer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .card_container {
    cursor: default;
    position: absolute;
    left: 12px;
    bottom: 7px;
    width: 400px;
    .oper_air {
      .air_bottom_box {
        color: #666;
        padding: 5px 0;
      }
    }
    .air_content {
      background: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.32);
      border-radius: 8px;
      padding: 10px 10px 10px 20px;
      a {text-decoration: underline;}
      .air_top {
        overflow: hidden;
        margin-top: 10px;
        padding-left: 8px;

        .air_state {
          background: #daebff;
          border-radius: 11px;
          padding: 1px 8px;
          color: #3874ba;
        }

        .air_top_icon {
          display: inline-block;
          vertical-align: middle;
          margin: 0 8px 0 15px;

          i {
            font-size: 30px;
            color: #3874BA;
          }
        }

        .air_top_message {
          display: inline-block;
          vertical-align: middle;

          .air_message_name {
            color: #3874BA;
            font-weight: 600;
            font-size: 15px;
          }

          .air_message_lev {
            color: #fff;
            font-size: 13px;
            padding: 0 12px;
            border-radius: 10px;
          }

          .lev_other {
            background-color: rgb(85, 25, 140);
          }

          .lev_low {
            background-color: #1296db;
          }

          .lev_med {
            background-color: #ffca00;
          }

          .lev_high {
            background-color: #d81e06;
          }

          .air_message_area {

          }
        }

        .air_top_state {
          float: right;
          color: #3874BA;
          font-weight: 600;
          font-size: 14px;
          margin-right: 30px;
        }

        .air_top_state1 {
          float: right;
          color: #d73037;
          font-size: 14px;
          margin-right: 30px;
        }
      }

      .air_bottom {
        margin: 8px 10px 8px 8px;

        .air_gzd_box {
          padding: 2px 0;
          font-size: 13px;
        }

        .air_text {
          color: #000;
          font-weight: 600;
        }

        .air_bottom_box {
          overflow: hidden;
          display: flex;

          .air_box {
            width: 50%;
            padding-right: 10px;
            font-size: 13px;
          }

          .air_box:nth-child(1) {
            width: 70%;
          }

          .air_box1 {
            width: 90%;
            display: flex;
            font-size: 13px;

            .air_text {
              width: 66px;
              flex-shrink: 0;
            }
          }
        }
      }

      .air_history, .air_detail {
        text-align: right;
        margin-right: 30px;
      }

      .closeAir {
        float: right;
        font-size: 18px;
        margin: -10px -5px 0 10px;
        color: #cacaca;
        cursor: pointer;
      }

      .air_not_show {
        display: none;
      }

    }

    .sanjiao {
      position: absolute;
      left: -17px;
      bottom: -10px;
      color: #fff;
      transform: rotate(235deg);

      i {
        font-size: 24px;
      }
    }
  }
}

</style>
<style lang="less" scoped>
.selectBox{
  position: fixed;
  right: 30px;
  top: 80px;
  width: 119px;
  height: 125px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
  .allBox{
    height: 36px;
    line-height: 36px;
    background-color: #eaeef5;
    padding-left: 16px;
  }
  .checkBox{
    padding-left: 16px;
    padding-top: 10px;
    line-height: 34px;
  }

}
</style>

