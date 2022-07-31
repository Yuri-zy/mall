import { ADD_COUNTER, ADD_IN_CART } from "./mutation-types"

// 未封装常量的版本
// export default {
//     addCounter(state, payload) {
//         payload.count++
//     },
//     addInCart(state, payload) {
//         state.cartList.push(payload)
//     }
// }
export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_IN_CART](state, payload) {
        // 选中商品
        payload.checked = true
        // 添加进购物车
        state.cartList.push(payload)
    }
}