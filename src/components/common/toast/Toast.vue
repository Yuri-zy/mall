<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  //   props: {
  //     message: {
  //       type: String,
  //       default: ""
  //     },
  //     show: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message = "默认文字", duration = 1500) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ""
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  padding: 30px 20px;
  border-radius: 3px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  text-align: center;
}
</style>