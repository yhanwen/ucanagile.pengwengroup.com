<template>
  <div class="common-page-wrapper">
    <nuxt class="common-content"/>
    <div class="icp">&copy; 2011~2018 北京鹏文网络科技有限公司 | <a href="http://www.beian.miit.gov.cn/">京ICP备18056004号</a></div>
  </div>
</template>

<script>


export default {
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  }
};
</script>

<style lang="less">
body, html {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.common-page-wrapper {
  // position: relative;
  // height: 100%;
  // width: 100%;
  // overflow: hidden;
  // .common-content {
  //   position: relative;
  //   height: 100%;
  //   width: 100%;
  //   overflow: hidden;
  // }
}
.icp {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  color: fadeout(#fff, 50);
  text-align: center;
  padding: 10px 0;
  background: fadeout(#000, 50);
  z-index: 100;
  a {
    color: fadeout(#fff, 30);
  }
}
</style>
