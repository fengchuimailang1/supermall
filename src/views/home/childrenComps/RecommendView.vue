<template>
    <div class="recommend">
        <div v-for="item in recommend" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name:"RecommendView",
        props:{
            recommend:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style>
    .recommend{
        display: flex;
        text-align: center;
        padding-bottom:30px;
        border-bottom:8px solid #eee;
    }
    .recommend-item{
        flex:1;
    }
    .recommend-item img{
        width:80px;
        height:80px;
        margin:10px 0 11px;
    }
    .recommend-item div{
        font-size: 14px;
    }
</style>
