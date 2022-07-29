import BackTop from '@/components/content/backTop/BackTop'


import { debounce } from "@/common/utils"

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
            refresh: null
        }
    },
    mounted() {
        // 1.图片加载完成的事件监听
        this.refresh = debounce(this.$refs.scroll.refresh, 200)

        this.itemImageListener = () => {
            // console.log("loaddddddd")
            // this.$refs.scroll && this.$refs.scroll.refresh()
            this.refresh()
        }

        this.$bus.$on("itemImageLoad", this.itemImageListener)

        // console.log('mixin')
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        }
    },
}