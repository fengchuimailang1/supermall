export default {
    addCart(context, payLoad) {
        // 判断是否有这个商品,有数量加1，没有添加商品
        // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid == payLoad.iid){ 
        //         oldProduct = item;
        //     }
        // };
        return new Promise((resolve, reject) => {
            // 查找商品是否在该数组中
            let oldProduct = context.state.cartList.find(item => item.iid == payLoad.iid);
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit("addCounter", oldProduct);
                resolve("商品数量加1")
            } else {
                payLoad.count = 1;
                // state.cartList.push(payLoad)
                context.commit("addToCart", payLoad);
                resolve("商品添加完了")
            }
        })
    }
}