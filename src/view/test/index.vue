<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div style="">
    <img src="../img/567.jpg" @click="location" id="Img" height="500px">
  </div>
</template>
<script>
import {oneTest} from "../../api/test";

export default {
  name: 'test',
  data() {
    return {
      // isCollapsed: false,
      mapX: 0,
      mapY: 0
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // alert('flag')
      oneTest('aa','18').then(res => {
        console.log(res.data)
      });
    },
    location() {
      this.mapX = event.pageX
      this.mapY = event.pageY
      console.log(this.mapX)
      console.log(this.mapY)
      if (506 < this.mapX && this.mapX < 758 && 108 < this.mapY && this.mapY < 333) {
        console.log('头')
      } else {
        console.log('其他')
      }
    }
  }
}
</script>
