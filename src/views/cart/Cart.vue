<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue"

import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar.vue"

import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length
    // }

    // 数组写法
    // ...mapGetters(["cartLength", "cartList"])

    // 对象写法
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>