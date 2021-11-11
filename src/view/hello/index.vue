<template>
  <div class="hello">
    <!--    面包屑-->
<!--    <Breadcrumb>-->
<!--      <BreadcrumbItem to="/">home</BreadcrumbItem>-->
<!--      <BreadcrumbItem to="/hello">hello</BreadcrumbItem>-->
<!--      <BreadcrumbItem to="/login">login</BreadcrumbItem>-->
<!--      <BreadcrumbItem to="/test">test</BreadcrumbItem>-->
<!--    </Breadcrumb>-->
    <Carousel v-model="value1" loop>
      <CarouselItem>
        <div class="">1
          <Alert show-icon>消息提示文案</Alert>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="">2
          <Alert type="success" show-icon>成功提示文案</Alert>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="">3
          <Alert type="warning" show-icon>警告提示文案</Alert>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="">4
          <Alert type="error" show-icon>错误提示文案</Alert>
        </div>
      </CarouselItem>
    </Carousel>


    <i-circle :percent="percent" :stroke-color="color">
      <Icon
          v-if="percent == 100"
          type="ios-checkmark-empty"
          size="60"
          style="color: #5cb85c"
      ></Icon>
      <span v-else style="font-size: 24px">{{ percent }}%</span>
    </i-circle>
    <div>
      <Button icon="ios-plus-empty" @click="add">+</Button>
      <Button icon="ios-minus-empty" @click="minus">-</Button>
      <!--            <Button-group size="large">-->
      <!--                <Button icon="ios-plus-empty" @click="add">+</Button>-->
      <!--                <Button icon="ios-minus-empty" @click="minus">-</Button>-->
      <!--            </Button-group>-->
    </div>


    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank"> Core Docs </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank"> Forum </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
      </li>
      <br/>
      <li>
        <a
            href="http://vuejs-templates.github.io/webpack/"
            target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank"> vuex </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      value1:0,
      percent: 0,
      msg: "Welcome to Your Vue.js App",
    };
  },
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.percent == 100) {
        color = "#5cb85c";
      }
      return color;
    },
  },
  methods: {
    add() {
      if (this.percent >= 100) {
        return false;
      }
      this.percent += 10;
    },
    minus() {
      if (this.percent <= 0) {
        return false;
      }
      this.percent -= 10;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%;
  height: 100%;
  /* background-color: #29d4ff; */
  /* background-image: url("./assets/123.jpg"); */
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
