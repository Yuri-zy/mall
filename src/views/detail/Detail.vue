<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="detailNavBar" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- detailGoodsInfo 中第一种监听图片加载的方法 -->
      <!-- <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
      <!-- <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
      </ul> -->
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "@/components/common/scroll/Scroll.vue"
import GoodList from "@/components/content/goods/GoodList.vue"

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "@/network/detail"
// import { debounce } from "@/common/utils"
import { backTopMixin, itemListenerMixin } from "@/common/mixin"
import { debounce } from "@/common/utils"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // 这个也能使用混入(mixin)
      // itemImageListener: null
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // ①. 获取顶部的图片轮播数据
      // console.log(res)
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      // ②.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // ③.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // ④.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // ⑤. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // ⑥. 获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
      //   // 在外面获取值不对, 因为this.$refs.param.$el 没有渲染
      //   // 在此处获取值仍然不对, 因为图片没有计算在内
      //   // DOM已经渲染但是片没有加载完
      //   // offsetTop 值不对的时候, 都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(44)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(44)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 100)
  },
  methods: {
    // detailGoodsInfo 中第一种监听图片加载的方法
    // imageLoad() {
    //   // console.log(321)
    //   this.$refs.scroll.refresh()
    // }
    // detailGoodsInfo 中第二种监听图片加载的方法
    imgLoad() {
      this.refresh()
      // this.$refs.scroll.scroll.refresh()
      // this.themeTopYs = []
      // this.themeTopYs.push(44)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)

      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
    },
    contentScroll(position) {
      // console.log(position)
      const positionY = -position.y + 44

      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // 数组尾部添加一个最大值
        if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i
          console.log(i)
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }

        // i < this.themeTopYs.length 的情况
        // if (this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY < this.themeTopYs[i + 1] && positionY >= this.themeTopYs[i]) || (i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   // console.log(i)
        //   this.$refs.detailNavBar.currentIndex = this.currentIndex
        // }
      }

      this.isShowBackTop = -position.y > 1000
    }
  },
  mounted() {
    // 使用了混入(mixin)
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImageListener)
  },
  destroyed() {
    // console.log("destoyed")
    this.$bus.$off("itemImageLoad", this.itemImageListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);

  /* 也可以实现顶部的固定 */
  /* overflow: hidden; */
}
</style>