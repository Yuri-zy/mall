<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :goods-item="item" :key="index" />
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem.vue"

export default {
  name: "GoodList",
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>