<template>
    <div class="cart-list">
        <scroll class="content" :pullUpLoad="true" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
        </scroll>
    </div>
</template>

<script>
    import cartListItem from "./cartListItem.vue"
    import scroll from "components/common/scroll/Scroll"

    import { mapGetters } from "vuex"

    export default {
        name: "cartList",
        components: {
            cartListItem,
            scroll
        },
        computed: {
            ...mapGetters(['cartList'])
        },
        activated(){
            // console.log("------");
            this.$refs.scroll.refresh();
        }
    }
</script>

<style scoped>
    .cart-list{
        height:calc(100% - 44px - 49px - 40px);
    }
    .content{
        height:100%;
    }
</style>