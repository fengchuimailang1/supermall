<template>
    <div class="goods-list">
        <Goods-list-item v-for="item in goods" :item="item"></Goods-list-item>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem.vue"
    export default{
        name:"GoodsList",
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            GoodsListItem
        }
    }
</script>

<style>
    .goods-list{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding:0 2px;
    }
</style>