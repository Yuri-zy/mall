<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue"

// import { mapGetters } from "vuex"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    // ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        // filter会报错
        // this.cartList
        this.$store.state.cartList
          .filter(item => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 进行一次判断, 如果购物车为空则返回false
      if (this.$store.state.cartList.length === 0) return false
      //   return !(this.$store.state.cartList.filter(item => !item.checked).length)
      return !this.$store.state.cartList.find(item => !item.checked)

      //   啥都不会也得会的普通遍历
      //   for (let item of this.$store.state.cartList) {
      //     if (!item.checked) {
      //       return false
      //     }
      //     return true
      //   }
    }
  },
  methods: {
    checkClick() {
      //   console.log("click")
      // console.log('111');
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false))
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true))
      }
    },
    calcClick() {
      if (!this.$store.getters.cartList.find(item => item.checked)) {
        this.$toast.show("请先选择要结算的商品")
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background-color: pink;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 14px;
  color: #000;
}

.check-content {
  display: flex;
  height: 40px;
  width: 70px;
  align-items: center;
}

.check-button {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 10px;
}
.price {
  flex: 1;
  margin-left: 20px;
}

.calculate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  background-color: orangered;
}
</style>