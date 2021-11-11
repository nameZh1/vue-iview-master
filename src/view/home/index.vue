<template>
  <div>
    <div>
      <!--          导航栏-->
      <!--      <Layout>-->
      <!--        <Content>-->
      <!--        </Content>-->
      <!--        <Sider>-->
      <!--          头像-->
      <!--        </Sider>-->
      <!--      </Layout>-->
      <Menu
          mode="horizontal"
          :theme="theme1"
          :active-name="1"
          @on-select="handleSwitch"
          @on-open-change="handleSwitch2"
      >
        <MenuItem name="1">
          <Icon type="ios-paper"/>
          首页
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people"/>
          临时
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats"/>
            测试
          </template>
          <MenuGroup title="笔记">
            <MenuItem name="3-1">笔记1</MenuItem>
            <MenuItem name="3-2">笔记2</MenuItem>
            <MenuItem name="3-3">笔记3</MenuItem>
          </MenuGroup>
          <MenuGroup title="测试">
            <MenuItem name="3-4">测试</MenuItem>
            <MenuItem name="3-5">测试</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon type="ios-construct"/>
          测试
        </MenuItem>

        <!--        右上角用户界面-->
        <div class="user" @click="handleUser" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <Avatar icon="ios-person" :size="userClass? 'large':'small'" src=""></Avatar>
          <!--          <span>{{ user.name }}</span>-->
        </div>
      </Menu>
      <!--      组件页面-->
      <div>
        <Button @click="test">测试</Button>
      </div>
      <div>
        <login ref="login"></login>
        <HelloWorld v-if="flagPage==1? true:false"></HelloWorld>
        <temporary v-if="flagPage==2? true:false"></temporary>
        <notes v-if="flagPage=='3-1'? true:false"></notes>
        <Map v-if="flagPage=='3-2'? true:false" ref="map"></Map>
        <test v-if="flagPage==4? true:false"></test>
      </div>

      <div class="bottom">
        <p>Change theme</p>
        <RadioGroup v-model="theme1">
          <Radio label="light"></Radio>
          <Radio label="dark"></Radio>
          <Radio label="primary"></Radio>
        </RadioGroup>
        <Row>
          <Rate show-text allow-half v-model="score">
            <span style="color: #f5a623">{{ score }}</span>
          </Rate>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import HelloWorld from '../hello'
import login from '../login'
import test from '../test'
import notes from '../notes'
import Map from '../Map'
import temporary from '../temporary'

export default {
  name: 'home',
  components: {
    HelloWorld,
    login,
    test,
    notes,
    Map,
    temporary
  },
  mounted() {
    this.flagPage = this.$route.query.flag
  },
  data() {
    return {
      userClass: false,
      // 路由锚点
      flagPage: 1,
      isCollapsed: true,
      // 评分
      score: 0,
      // 主题
      theme1: "light",
      // 用户
      user: {
        loginShow: false,
        name: '测试测试测试'
      }
    };
  },
  methods: {
    // 鼠标悬停
    mouseOver() {
      this.userClass = true;
    },
    mouseLeave() {
      this.userClass = false;
    },
    // 导航点击
    handleSwitch(name) {
      this.flagPage = name;
      this.$router.push({ path:'', query: {flag:name} }); // 更新到url
      // console.log(this.flagPage)
    },
    handleSwitch2(name) {
      // this.flagPage = name[0];
      // console.log(this.flagPage)
    },

    // 点击用户
    handleUser() {
      this.$refs.login.isShow = true;
      // this.flagPage = 2;
      // alert(this.user.loginShow)
    },
    test() {
      alert(this.$refs.map.mapZoom)
    }
  },
  watch: {
    '$route.query.flag'() {
      this.flagPage = this.$route.query.flag
    }
  }
};
</script>
<style>
/*页面底部居中*/
.bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*用户头像*/
.user {
  text-align: right;
  padding-right: 20px;
  /*float: right;*/
  /*margin: 10px*/
}
</style>
