<template>
    <div class="cart">
        <nav-bar class="cart-nav">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import navBar from "components/common/navbar/navBar"

    import cartList from "./childrenComps/cartList.vue"
    import cartBottomBar from "./childrenComps/cartBottomBar.vue"

    import { mapGetters } from "vuex"

    export default {
        name: "Cart",
        components: {
            navBar,
            cartList,
            cartBottomBar
        },
        computed: {
            // length(){
            //     return this.$store.getters.cartLength
            // }
            /*
              mapGetters是vuex的辅助函数，用于在计算属性取getters的方法，用前先导入
            */
            // ...mapGetters(['cartLength','cartList'])
            ...mapGetters({
                length:"cartLength"
            })    
        }
    }
</script>

<style scoped>
    .cart{
        height:100vh;
        position:relative;
    }
    .cart-nav  {
        background-color: var(--color-tint);
        color: white;
        position:relative;
        top:0;;
        z-index: 9;
    }
</style>