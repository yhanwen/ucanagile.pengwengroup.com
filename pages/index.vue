<template>
<div class="home">
  <!-- <div class="banner" :style="{backgroundImage: 'url(' + homeData.banner + ')'}"> -->
  <div class="banner">
    <div class="banner-content">
      <p class="cn_title">{{homeData.cn_title1}}</p>
      <p class="cn_title">{{homeData.cn_title2}}</p>
      <p class="en_title">{{homeData.en_title}}</p>
      <div class="banner-btn">
        <Button class="view" @click="play">查看产品</Button>
        <Button class="contact" @click="pause">联系AI顾问</Button>
      </div>
    </div>
    <div class="video" style="height:100%;overflow:hidden">
      <video ref="video" width="100%" autoplay="autoplay" loop="loop" muted="muted">
          <source src="~@/assets/images/banner.mp4" type="video/mp4">
          <source src="movie.ogg" type="video/ogg">您的浏览器不支持 HTML5 video 标签。
        </video>
    </div>
  </div>
  <div class="strengthAndProduct">
    <div class="strengthBg"></div>
    <div class="strength screen-width">
      <div class="strength-title">
        <p class="en">{{homeData.strength.en_title}}</p>
        <p class="cn">{{homeData.strength.cn_title}}</p>
      </div>
      <div class="strength-lists">
        <div v-for="(item,index) of homeData.strength.lists" :key="index" class="list-item">
          <div class="item-img">
            <div class="img-icon">
              <img :src="item.icon" alt>
              </div>
              <p class="img-name">{{item.name}}</p>
            </div>
            <p class="item-content" v-for="(item, index) of item.content" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div class="product screen-width">
        <div class="strength-title">
          <p class="en">{{homeData.product.en_title}}</p>
          <p class="cn">{{homeData.product.cn_title}}</p>
        </div>
        <div class="product-content">
          <ai></ai>
        </div>
      </div>
    </div>
    <div class="solution">
      <div class="solution-backimg" :style="{background:'url('+homeData.solution.bgc_img+') center'}"></div>
      <div class="solution-content screen-width">
        <div class="strength-title">
          <p class="en">{{homeData.solution.en_title}}</p>
          <p class="cn">{{homeData.solution.cn_title}}</p>
        </div>
        <div class="solution-lists">
          <div class="solution-item clearfix" v-for="(item, index) of homeData.solution.lists" :key="index">
            <div class="solution-item__img" :class="'solution-item__img'+'-'+item.float" :style="{float:item.float}">
              <img :src="item.img" alt>
            </div>
              <div class="solution-item__content" :class="'solution-item__content'+'-'+item.float">
                <div class="item_container">
                  <p class="before-width"></p>
                  <p class="title-container">
                    <span class="cn">{{item.content.cn_title}}</span>
                    <span class="en">{{item.content.en_title}}</span>
                  </p>
                  <div class="icon_style_alone clearfix">
                    <div class="icon_style_box" @click="routerLink(el.url)" v-for="(el,index) of item.iconData" :key="index">
                      <img class="img_size_style" :src="el.imgUrl" alt>
                      <span class="img_txt_style">{{el.title}}</span>
                    </div>
                  </div>
                  <p class="solution-text" v-for="(text, index) of item.content.text" :key="index">{{text}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <media-report></media-report>
      <partner></partner>
      <form-data :isShow="dialogForm" @dialogFormChange="getNewdialogForm"></form-data>
    </div>
</template>

<script>
import homeData from "@/dataConfig/Home/index.js";
import MediaReport from "./index/MediaReport";
import Partner from "./index/Partner";
import Ai from "@/components/AI";
import FormData from "@/components/FormData";

export default {
  name: "home",
  // scrollToTop: true,
  data() {
    return {
      homeData,
      dialogForm: false
    };
  },
  methods: {
    play() {
      this.$refs.video.play();
      this.$router.push({
        path: "Product/eNLP"
      });
    },
    pause() {
      this.dialogForm = true;
      // this.$refs.video.pause();
    },
    routerLink(path) {
      this.$router.push(path);
    },
    getNewdialogForm(val) {
      this.dialogForm = val;
    }
  },
  components: {
    MediaReport,
    Partner,
    Ai,
    FormData
  }
};
</script>

<style lang="less" scoped>
.img_size_style,
.img_txt_style {
  cursor: pointer;
}

.video {
  background: rgb(20, 25, 46);
}

.icon_style_alone {
  margin-top: 36px;
}

.icon_style_box {
  width: 50%;
  height: 40px;
  margin: 20px 0;
  margin-top: 6px;
  vertical-align: top;
  display: inline-block;
}

.icon_style_box .img_size_style {
  width: 45px;
}

.img_txt_style {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
  color: #4a4a4a;
  text-align: center;
}

/*横向时间轴*/
.time-horizontal {
  list-style-type: none;
  border-top: 1px solid #707070;
  max-width: 800px;
  padding: 0px;
  margin: 0px;
}

.time-horizontal li {
  float: left;
  position: relative;
  text-align: center;
  width: 25%;
  padding-top: 10px;
}

.time-horizontal li b:before {
  content: "";
  position: absolute;
  top: -10px;
  left: 47%;
  width: 12px;
  height: 12px;
  border: 2px solid #4c4c4c;
  border-radius: 8px;
  background: #4c4c4c;
}

.strengthAndProduct {
  position: relative;
  z-index: 1;
}

.strengthBg {
  height: 300px;
  position: absolute;
  z-index: -1;
  transform: rotate(-3deg);
  background: #ffffff;
  width: 200%;
  right: -35px;
  top: -20px;
}

.banner {
  /* height: 768px; */
  position: relative;
  background-position: center top;
  background-repeat: no-repeat;
  z-index: 0;
}

.banner-content {
  text-align: center;
  width: 600px;
  height: 230px;
  /* background: green; */
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -115px;
  z-index: 6;
}

.cn_title {
  font-size: 36px;
  color: #ffffff;
  letter-spacing: 3px;
}

.en_title {
  font-size: 45px;
  color: #ffffff;
  padding-bottom: 20px;
}

.view {
  width: 150px;
  height: 38px;
  background: #b81d29;
  font-size: 16px;
  color: #ffffff;
  border-radius: 0px !important;
  padding: 5px 37px !important;
  margin-right: 20px;
  border: none !important;
}

.contact {
  width: 150px;
  height: 38px;
  border: 1px solid #ffffff !important;
  font-size: 16px;
  color: #ffffff;
  background: none !important;
  border-radius: 0px !important;
  padding: 5px 37px !important;
}

.strength-title .en {
  font-size: 16px;
  color: #4a4a4a;
}

.strength-title .cn {
  font-size: 32px;
  color: #4a4a4a;
}

.strength {
  padding-top: 10px;
  padding-bottom: 96px;
  z-index: 6;
}

.strength-lists {
  margin-top: 28px;
}

.list-item {
  display: inline-block;
  width: 25%;
  vertical-align: top;
  padding: 0px 25px;
}

.list-item .img-icon {
  height: 95px;
  text-align: center;
  padding: 20px 0px 15px 0px;
}

.list-item .img-name {
  font-size: 18px;
  color: #4a4a4a;
  text-align: center;
}

.item-img {
  margin-bottom: 20px;
}

.item-content {
  line-height: 23px;
  text-align: center;
  font-size: 15px;
  color: #424148;
}

.product-content {
  height: 500px;
}

.product {
  z-index: 6;
  height: 876px;
}

.solution {
  min-height: 700px;
  position: relative;
  z-index: 6;
}

.solution-backimg {
  height: 340px;
  background-size: cover !important;
  /* background-image: linear-gradient(62deg, #d92b25 0%, #b81d29 100%); */
  position: absolute;
  transform: rotate(-3deg);
  transform-origin: center top;
  width: 200%;
  right: -35px;
  top: 0;
  z-index: -1;
}

.solution-content {
  padding-top: 86px;
}

/* .solution-content .strength-title {
  padding-bottom: 80px;
} */
.strength-title {
  margin-bottom: 60px;
}

.solution-content .strength-title p {
  color: #ffffff !important;
}

.solution-item__img img {
  width: 430px;
}

.solution-item__content {
  height: 480px;
  padding: 20px;
  position: relative;
}

.solution-item__content-left {
  margin-left: 430px;
}

.solution-item__content-right {
  margin-right: 380px;
}

.solution-item__content-right .solution-text {
  width: 570px;
}

.item_container {
  width: 600px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -249px;
  margin-top: -100px;
}

.solution-item__content .item_container>.title-container {
  /* cursor: pointer; */
  margin: 20px 0px 10px 0px;
}

.solution-item__content .item_container>.title-container>.cn {
  font-size: 28px;
  color: rgba(0, 0, 0, 0.9);
}

.solution-item__content .item_container>.title-container>.en {
  font-size: 50px;
  color: rgba(157, 147, 189, 0.14);
}

.solution-text {
  font-size: 15px;
  color: #0000009e;
  line-height: 24px;
  padding: 10px 0 20px 0;
}

.solution-item {
  position: relative;
  padding-bottom: 60px;
}

.title-container {
  position: relative;
}

.title-container::after {
  position: absolute;
  top: 0;
  left: 0;
  background: #b81d29;
  width: 20px;
  height: 1px;
}

/* .solution-item__content-right  */
.solution-item__content-right .item_container {
  width: 640px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -402px;
  margin-top: -100px;
}

.before-width {
  background: #b81d29;
  width: 60px;
  height: 2px;
}

.solution-item__img-right {
  /* margin-right: 100px; */
}

.strength-lists .img-icon img {
  height: 100%;
}

@import '~assets/styles/h5/index.less';
</style>
