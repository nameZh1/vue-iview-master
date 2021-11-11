<template>
  <div class="container">
    <!--筛选条件-->
    <div class="menuBox">
      <RadioGroup v-model="org_type" type="button" style="text-align: center">
        <Radio label="全省" style="width: 100px"></Radio>
        <Radio label="筛选市局" style="width: 100px"></Radio>
        <Radio label="筛选区局" style="width: 100px"></Radio>
      </RadioGroup>
    </div>
    <!--标题-->
    <div style="height: 50px">
      <span class="title1">{{ titleMain }}</span>
    </div>
    <!--块选择-->
<!--    <div style="padding: 100px 20px">-->
<!--      <Row gutter="16">-->
<!--        <Col span="7">-->
<!--          <div class="mark">aaa</div>-->
<!--        </Col>-->
<!--        <Col span="7">-->
<!--        </Col>-->
<!--        <Col span="7">-->
<!--        </Col>-->
<!--      </Row>-->
<!--    </div>-->

<!--线路停电-->
    <div style="text-align: left">
      <Input placeholder="线路名称" style="width: 120px" prefix="ios-search"></Input>
    </div>
  </div>
</template>

<script>
export default {
  name: "temporary",
  data() {
    return {
      org_type: null,
      titleMain: '标题测试',


    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  .menuBox {
    padding: 20px;
    text-align: left;
  }
  .title1 {
    border-width: 0px;
    position: absolute;
    left: 25px;
    //top: -16px;
    width: 196px;
    height: 32px;
    display: flex;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #AAAAAA;
  }
}
.mark {
  background-color: cornflowerblue;
}
</style>
