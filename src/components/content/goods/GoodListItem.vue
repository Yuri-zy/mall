<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->
    <!-- 懒加载写法 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // console.log("imageLoad")
      this.$bus.$emit("itemImageLoad")

      // 阻止itemImageLoad监听全局导致加载完推荐数据后对首页界面进行刷新
      // 但是未实现
      // if (this.$route.path.indexOf("/home") !== -1) {
      //   this.$bus.$emit("homeItemImageLoad")
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailItemImageLoad")
      // }
    },
    itemClick() {
      // console.log("----")
      this.$router.push("/detail/" + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("@/assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>