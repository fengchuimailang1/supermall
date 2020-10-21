export default {
    /*
      mutations唯一的目的就是修改state中的状态
      mutations中的每一个方法尽可能完成的事件比较单一
    */
    addCounter(state, oldProduct) {
        oldProduct.count += 1
    },
    addToCart(state, payLoad) {
        payLoad.check = true;
        state.cartList.push(payLoad)
    }
}