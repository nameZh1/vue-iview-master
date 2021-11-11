<template>
  <div class="container">
    <Modal
        v-model="isShow"
        title="登录"
        @on-ok="handleSubmit('loginData')"
        @on-cancel="quit"
        width="400px">
      <Form
          ref="loginData"
          :model="loginData"
          :rules="ruleValidate"
          class="formS">
        <Row type="flex" justify="start" align="middle">
          <Col span="18">
            <FormItem prop="user">
              <Input type="text" v-model="loginData.user" placeholder="用户名" class="enter" size="large">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col span="18">
            <FormItem prop="password">
              <Input type="password" v-model="loginData.pass" placeholder="密码" class="enter" size="large">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <!--        <FormItem>-->
        <!--          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>-->
        <!--        </FormItem>-->
      </Form>
    </Modal>
  </div>
  <!--  </div>-->
</template>
<script>
// import api from '/axios/api.js'
// import gd from '/axios/globalData.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import {MeshSurfaceSampler} from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'

export default {
  name: 'login',
  props: {
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      isShow: false,
      loginData: {
        user: '',
        pass: ''
      },
      ruleValidate: {
        user: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 16,
            message: '账号长度3-16个字符',
            trigger: 'blur'
          }
        ],
        pass: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            max: 16,
            message: '密码长度6-16个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    // this.init();
  },
  methods: {


    // init() {
    //   console.clear();
    //
    //   const scene = new THREE.Scene();
    //   const camera = new THREE.PerspectiveCamera(
    //       75,
    //       window.innerWidth / window.innerHeight,
    //       0.1,
    //       1000
    //   );
    //
    //   const renderer = new THREE.WebGLRenderer({
    //     antialias: true,
    //     alpha: true
    //   });
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   document.body.appendChild(renderer.domElement);
    //
    //   camera.position.z = 220;
    //   camera.position.y = 100;
    //
    //   const controls = new OrbitControls(camera, renderer.domElement);
    //
    //   const group = new THREE.Group();
    //   scene.add(group);
    //
    //   let sampler = null;
    //   let elephant = null;
    //   let paths = [];
    //   new OBJLoader().load(
    //       "https://assets.codepen.io/127738/Mesh_Elephant.obj",
    //       (obj) => {
    //         sampler = new MeshSurfaceSampler(obj.children[0]).build();
    //
    //         for (let i = 0;i < 4; i++) {
    //           const path = new Path(i);
    //           paths.push(path);
    //           group.add(path.line);
    //         }
    //
    //         renderer.setAnimationLoop(render);
    //       },
    //       (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    //       (err) => console.error(err)
    //   );
    //
    //   const tempPosition = new THREE.Vector3();
    //   const materials = [new THREE.LineBasicMaterial({color: 0xFAAD80, transparent: true, opacity: 0.5}),
    //     new THREE.LineBasicMaterial({color: 0xFF6767, transparent: true, opacity: 0.5}),
    //     new THREE.LineBasicMaterial({color: 0xFF3D68, transparent: true, opacity: 0.5}),
    //     new THREE.LineBasicMaterial({color: 0xA73489, transparent: true, opacity: 0.5})];
    //   class Path {
    //     constructor (index) {
    //       this.geometry = new THREE.BufferGeometry();
    //       this.material = materials[index % 4];
    //       this.line = new THREE.Line(this.geometry, this.material);
    //       this.vertices = [];
    //
    //       sampler.sample(tempPosition);
    //       this.previousPoint = tempPosition.clone();
    //     }
    //     update () {
    //       let pointFound = false;
    //       while (!pointFound) {
    //         sampler.sample(tempPosition);
    //         if (tempPosition.distanceTo(this.previousPoint) < 30) {
    //           this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
    //           this.previousPoint = tempPosition.clone();
    //           pointFound = true;
    //         }
    //       }
    //       this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
    //     }
    //   }
    //
    //
    //   function render(a) {
    //     group.rotation.y += 0.002;
    //
    //     paths.forEach(path => {
    //       if (path.vertices.length < 10000) {
    //         path.update();
    //       }
    //     });
    //
    //     controls.update();
    //     renderer.render(scene, camera);
    //   }
    //
    //   window.addEventListener("resize", onWindowResize, false);
    //
    //   function onWindowResize() {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //   }
    // },



    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.isShow = true
          this.$Message.error('表单验证失败!')
        }
      })
    },
    // handleQuit() {
    //   this.show = false;
    // }
    ok() {
      this.$Message.info({content: 'ok', duration: 3})
    },
    quit() {
      this.$Message.info({content: 'quit', duration: 3})
    }
  }
}
</script>
<style scoped>
/*//@import "../common";*/
.container {
  width: 100%;
  height: 100%;
}

/* 缩放*/
.zoom {
  width: 100%
}

.formS {
  padding: 10px 0 0 50px;
  /*width: 250px;*/
}

.enter {
  width: 100%
}
</style>
