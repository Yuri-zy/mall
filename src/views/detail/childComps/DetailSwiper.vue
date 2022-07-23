<template>
  <div class="detail-swiper">
    <swiper class="swiper-i">
      <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-i {
  height: 300px;
  overflow: hidden;
}

/* .swiper-item {
  height: 300px;
  overflow: hidden;
} */
</style>