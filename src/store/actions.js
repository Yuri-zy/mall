import { ADD_COUNTER, ADD_IN_CART } from "./mutation-types"

export default {
    addTooCart(context, payload) {
        return new Promise((resolve, reject) => {
            // payload新添加的商品
            // for 方法判断是否商品是否已存在, 若存在则会走下方的if路线, 若不存在则会走else路线
            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }

            // 另一种方法 查找之前数组cartList中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 判断oldProduct
            // 新加入的商品一定会走else, 因此定义了count=1
            if (oldProduct) {
                // 抽到mutations里了
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_IN_CART, payload)
                resolve('添加了新的商品')
            }
            // state.cartList.push(payload)
        })
    },

}