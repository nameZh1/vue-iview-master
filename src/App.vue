<template>
  <div id="app">
    <!-- <img src="./assets/123.jpg"> -->
    <!-- <login> -->
    <!-- 显示组件 -->
    <!-- </login> -->
<!--    <h1>服务端数据为：{{ serverData }}</h1>-->
<!--    <button v-on:click="getdata()">获得服务器端数据</button>-->
    <router-view/>
  </div>
</template>

<script>
// import login from './components/login' // 引入login.vue组件

export default {
  name: 'App',
  data () {
    return {
      serverData: '页面数据'
    }
    // img = './assets/123.jpg'
  },
  components: {},
  methods: {
    // $http: undefined,
    getdata () {
      this.$http.get('http://localhost:8080').then(function (response) {
        this.serverData = response.data
      })
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  /*margin-top: 60px;*/
  /* background-image:url('./assets/123.jpg'); */
}
</style>
