<template>
    <!-- v-if 判断获取的goods是否有属性，没有就不显示 -->
    <div class="base-info" v-if="Object.keys(goods).length !== 0">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-columns">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-services">
            <span class="services-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"detailBaseInfo",
        props:{
            goods:Object,
            default(){
                return {}
            }
        }
    }
</script>

<style scoped>
    .base-info{
       background-color: white;
    }
    .info-title{
        font-size: 15px;
        font-weight: 600;
        color:rgb(42,42,42);
        padding:10px 10px;
    }
    .info-price{
        padding-left:10px;
    }
    .info-price .n-price{
        font-size: 20px;
        color:var(--color-high-text)
    }
    .info-price .o-price{
        font-size: 14px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .info-price .discount{
        font-size: 13px;
        background-color: var(--color-high-text);
        border-radius: 5px;
        color:white;
        margin-left:5px;
        position:relative;
        top:-8px;
    }
    .info-columns{
        font-size: 13px;
        padding:15px 0px;
        margin:0 10px;
        color:rgb(136, 135, 135);
        display:flex;
        justify-content: space-between;
        border-bottom:1px solid rgb(175, 175, 175) ;
    }
    .info-services{
        display: flex;
        padding:20px 10px;
        justify-content: space-between;
        border-bottom:5px solid rgb(207, 206, 206);
    }
    .services-item{
        font-size: 13px;
    }
    .services-item img{
        width:14px;
        height:14px;
        color:rgb(194, 194, 194)
    }
    .services-item span{
        color:#484848;
        font-weight: 600;
    }
</style>