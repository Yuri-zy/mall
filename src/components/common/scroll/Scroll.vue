<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 安装了具备所有插件能力的 better-scroll, 因此不需要再npm install插件
import BScroll from "better-scroll"
import ObserveDOM from "@better-scroll/observe-dom"
import ObserveImage from "@better-scroll/observe-image"
import PullUp from "@better-scroll/pull-up"

BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)
BScroll.use(PullUp)

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      ObserveImage: 200,
      pullUpLoad: true
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position)
        this.$emit("scroll", position)
      })
    }

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("load")
        this.$emit("pullingUp")
      })
    }

    this.scroll.refresh()
  },
  updated() {
    // // 1. 创建BScroll对象
    // this.scroll = new BScroll(this.$refs.wrapper, {
    //   click: true,
    //   probeType: this.probeType
    // })
    // // 2.监听滚动的位置
    // this.scroll.on("scroll", position => {
    //   //   console.log(position)
    //   this.$emit("scroll", position)
    // })
    // this.scroll.refresh()
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },

    refresh() {
      // console.log("---------")
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>