<template>
<div class="home-wrapper">
  <img src="~assets/images/logo.png" alt="" class="logo">
  <a @click="changeLang" class="change-lang">{{$t('switch_lang')}}</a>
  <div class="intro-text">
    <div class="index-main-title" v-html="$t('index_main_title')"></div>
    <div class="index-main-brief">{{$t('index_main_brief')}}</div>
    <div class="button">
      <a href="https://github.com/yhanwen/soda/releases/download/v1.0.1/Soda-1.0.1.dmg" download="Soda-1.0.0.dmg" class="download btn"><i class="icon-mac"></i><span v-html="$t('try_it_free')"></span></a>
      <a href="https://github.com/yhanwen/soda" target="_blank" class="github btn"><i class="icon-github"></i><span v-html="$t('source_code')"></span></a>
    </div>
  </div>
  <div class="screen">
    <img src="~assets/images/screen.png" alt="">
  </div>
</div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
    };
  },
  methods: {
    changeLang() {
      if(this.$i18n.locale == 'zh-CN') {
        this.$i18n.locale = 'en';
      }else {
        this.$i18n.locale = 'zh-CN'
      }
    }
  },
  components: {
  }
};
</script>

<style lang="less">
@import '~assets/styles/vars';
@import '~assets/styles/mixins';
.home-wrapper {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background: url('~assets/images/bg.jpg') no-repeat top center;
  background-size: cover;
  .change-lang {
    position: absolute;
    top: 20px;
    right: 20px;
    color: @white;
    opacity: 0.8;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      opacity: 1;
    }
  }
  .logo {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 160px;
  }
  .intro-text {
    position: absolute;
    width: 700px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -90%);
    text-align: center;
    color: @white;
    font-size: 20px;
    line-height: 1.5;
    z-index: 20;
    .index-main-title {
      font-size: 60px;
      margin-bottom: 30px;
      line-height: 1.2;
    }
    .index-main-brief {
      font-size: 20px;
      margin-bottom: 40px;
      opacity: 0.6;
    }
    .button {
      .btn {
        display: inline-block;
        padding: 10px 35px;
        margin: 0 10px;
        background: darken(@orange, 10);
        color: @white;
        transition: all 0.4s;
        border:solid 1px darken(@orange, 10);
        font-size: 18px;
        i {
          margin: 0 10px 0 -10px;
        }
        span {
          letter-spacing: 3px;
        }
        &:hover {
          background: darken(@orange, 0);
          border:solid 1px darken(@orange, 0);
          transform: translate(0, -4px);
        }
        &.github {
          background: transparent;
          color: fadeout(@white, 20);
          border-color: fadeout(@white, 50);
          &:hover {
            background: transparent;
            color: @white;
            border:solid 1px fadeout(@white, 30);
          }
        }
      }
    }
  }
  .screen {
    z-index: 10;
    position: absolute;
    top: 100%;
    left: 50%;
    transform:translate(-50%, -45%);
    width: 1300px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
