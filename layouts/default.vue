<template>
  <div class="common-page-wrapper">
    <div class="Top" :class="{TopLine:TopLine}">
      <common-header/>
    </div>
    <nuxt class="common-content"/>
    <Footer/>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import Footer from "../components/NavFooter.vue";

export default {
  components: {
    CommonHeader,
    Footer
  },
  data() {
    return {
      bgColor: "rgba(8, 12, 29, 0.88)",
      pageY: 0,
      TopLine: null
    };
  },
  mounted() {
    this.pageY = window.pageYOffset;
    this.setNav(this.$route);
    this.isScroll();
  },
  methods: {
    isScroll() {
      const bar = document.querySelector(".Top");
      let flag = true; // top
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100 && flag) {
          // console.log("scroll");
          bar.style.backgroundColor = this.bgColor;
          this.TopLine = false;
          flag = false;
        } else if (window.pageYOffset <= 100 && !flag) {
          bar.style.backgroundColor = "rgba(0, 0, 0, 0)";
          this.TopLine = true;
          flag = true;
        }
      });
    },
    setNav(route) {
      this.pageY = window.pageYOffset;
      if (route.name&& route.name == "News-content")
        this.bgColor = "rgb(233, 239, 247)";
      else {
        this.bgColor = "rgba(8, 12, 29, 0.88)";
      }
      if (this.pageY > 100) {
        this.TopLine = false;
        document.querySelector(".Top").style.backgroundColor = this.bgColor;
      } else {
        this.TopLine = true;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.setNav(to);
    }
  }
};
</script>

<style lang="less">
@import "~assets/styles/vars";
// .common-page-wrapper {
//   // background: @gray-dark;
//   position: relative;
//   .common-header {
//     position: relative;
//     z-index: 5;
//   }
//   .common-content {
//     margin-top: -@hdHeight;
//     padding-top: @hdHeight;
//     position: relative;
//     z-index: 5;
//   }
// }
</style>
