<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="$route.meta.footShow"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue"

export default {
  name: "App",
  components: {
    MainTabBar
  }
}
</script>

<style>
/* @import "./assets/css/base.css"; */
@import "assets/css/base.css";
</style>
