<template>
    <div class="goods-list-item" @click="itemClick">
        <!-- 图片懒加载，除了安装插件以外，把要用懒加载的图片的src改成v-lazy -->
        <img v-lazy="showImage" alt="" @load="imageLoad">
        <div class="goods-info">
            <p class="info">{{item.title}}</p>
            <span class="price">{{item.price}}</span>
            <span class="collect">{{item.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default{
        name:"GoodsListItem",
        props:{
            item:Object,
            default(){
                return {}
            }
        },
        computed:{
            showImage(){
                return this.item.image || this.item.show.img || this.item.img
            }
        },
        methods:{
            // 监视图片的加载，解决滚动区域问题
            imageLoad(){
                // console.log("img");
                // 应用事件总线
                this.$bus.$emit("itemImageLoad")
            },
            itemClick(){
                // console.log("商品点击");
                this.$router.push("/detail/" + this.item.iid)
            }
        }
    }
</script>

<style scoped>
    .goods-list-item{
        position:relative;
        padding-bottom:40px;
        width:48%;
    }
    .goods-list-item img{
        width:100%;
        border-radius: 5px 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom:5px;
        left:0px;
        right:0px;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color:var(--color-high-text);
        margin-right:20px;
    }
    .goods-info .collect {
        position:relative;
    }
    .goods-info .collect::before{
        content:"";
        position:absolute;
        left:-15px;
        top:-1px;
        width:14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>