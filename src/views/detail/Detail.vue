<template>
    <div class="detail">
        <detail-nav class="detail-nav" @navClick="navClick" ref="nav"></detail-nav>
        <scroll class="content" :pullUpLoad="true" ref="scroll" :probeType="3" @scroll="contentTo">
            <detail-swiper :images="topImage"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <!-- 子传父发送的事件，用@监听 -->
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" ref=""></detail-goods-info>
            <detail-param-info :param-info="goodsParam" ref="param"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <GoodsList :goods="recommends" ref="recommend"></GoodsList>
        </scroll>
        <backTop @click.native="backClick" v-show="isBackTop"></backTop>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>
    import detailNav from "./detailChild/detailNav.vue"
    import detailSwiper from "./detailChild/detailSwiper.vue"
    import detailBaseInfo from "./detailChild/detailBaseInfo.vue"
    import detailShopInfo from "./detailChild/detailShopInfo.vue"
    import detailGoodsInfo from "./detailChild/detailGoodsInfo.vue"
    import detailParamInfo from "./detailChild/detailParamInfo.vue"
    import detailCommentInfo from "./detailChild/detailCommentInfo.vue"
    import detailBottomBar from "./detailChild/detailBottomBar.vue"

    import scroll from "components/common/scroll/Scroll"
    import GoodsList from "components/content/goods/GoodsList"
    // import toast from "components/common/toast/index"

    import {getDetailData,goodsInfo,shopInfo,goodsParam,getRecommends} from "network/detail"

    import {itemImgListenerMixin,backTopMixIn} from "common/mixins"

    import {mapActions} from "vuex"

    export default{
        name:"Detail",
        data(){
            return {
                topImage:[],
                goods:{},
                shop:{},
                detailInfo:{},
                goodsParam:{},
                commentInfo:{},
                recommends:[],
                themeOffsetTop:[],
                currentIndex:0,
                // message:"哈哈哈",
                // show:false
            }
        },
        props:['iid'],
        components:{
            detailNav,
            detailSwiper,
            detailBaseInfo,
            detailShopInfo,
            detailGoodsInfo,
            detailParamInfo,
            detailCommentInfo,
            scroll,
            detailBottomBar,
            GoodsList,
            // toast
        },
        mixins:[itemImgListenerMixin,backTopMixIn],
        created(){
            // 保存传入的iid
            // console.log(this.$route.params);
            this.iid = this.iid;
            // 根据传入的iid拿数据
            getDetailData(this.iid).then(res => {
                // console.log(res);
                const data = res.result;
                // 获取顶部轮播图
                this.topImage = data.itemInfo.topImages;
                // 获取商品信息
                this.goods = new goodsInfo(data.itemInfo,data.columns,data.shopInfo.services);
                // 获取商店信息
                this.shop = new shopInfo(data.shopInfo);
                // 直接获取商品展示的图片
                this.detailInfo = data.detailInfo;
                // 获取参数信息
                this.goodsParam = new goodsParam(data.itemParams.info, data.itemParams.rule);
                // 获取评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                };
            });
            // 获取推荐信息
            getRecommends().then(res => {
                // console.log(res);
                this.recommends = res.data.list
            })
        },
        methods:{
            ...mapActions(['addCart']),
            imgLoad(){
                this.$refs.scroll.refresh();
                // console.log(this.themeOffsetTop);
                this.themeOffsetTop.push(0);
                this.themeOffsetTop.push(this.$refs.param.$el.offsetTop);
                this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop);
                this.themeOffsetTop.push(this.$refs.recommend.$el.offsetTop);
                this.themeOffsetTop.push(Number.MAX_VALUE);
                // console.log(this.themeOffsetTop);
            },
            /*
              detail头部的联动
            */ 
            navClick(index){
                // console.log(index);
                this.$refs.scroll.scrollTo(0,-this.themeOffsetTop[index],200)
            },
            // 滚动内容显示相应的标题
            contentTo(position){
                // console.log(position);
                let length = this.themeOffsetTop.length;
                /*
                  数组中元素之间的区间与标题的数量是一致的，是产生联系的关键
                */ 
                // for(let i=0;i<this.themeOffsetTop.length;i++){
                //     // 为了防止调用以下判断太频繁，所以设置变量currentIndex，先做判断
                //     if(this.currentIndex !== i && (i < length-1 && -position.y >= this.themeOffsetTop[i] && -position.y < this.themeOffsetTop[i+1]) || (i == length-1 && -position.y >= this.themeOffsetTop[this.themeOffsetTop.length - 1])){
                //         this.currentIndex = i;
                //         console.log(this.currentIndex);
                //         this.$refs.nav.currentIndex = this.currentIndex
                //     }
                // }
                // 优化判断，往数组最后添加一个最大值Number.MAX_VALUE
                for(let i=0;i<this.themeOffsetTop.length-1;i++){
                    if(this.currentIndex !== i && (i < length-1 && -position.y >= this.themeOffsetTop[i] && -position.y < this.themeOffsetTop[i+1])){
                        this.currentIndex = i;
                        // console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex
                    }

                };
                // 判断是否显示返回顶部的图标
                this.isBackTop = (-position.y) > 1000;
            },
            addToCart(){
                // 获取购物车需要展示的信息
                const product = {};
                product.image = this.topImage[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                // 将商品添加到购物车里
                // this.$store.commit("addCart",product)
                // vuex-actions可以返回promise
                // this.$store.dispatch("addCart",product).then(res => {
                //     console.log(res);
                // })
                this.addCart(product).then(res => {
                    // console.log(res);
                    // 普通toast封装
                    // this.message = res;
                    // this.show = true;
                    // setTimeout(() => {
                    //     this.message = "";
                    //     this.show = false
                    // },2000)
                    // 以插件形式封装
                    // console.log(this.$toast);
                    this.$toast.show(res,2000)
                })
            }
        },
        // 这个页面没有缓存
        destroyed(){
            this.$bus.$off("itemImageLoad",this.itemImgListener)
        }
    }
</script>

<style scoped>
    .detail{
        position:relative;
        z-index: 9;
        background-color: #fff;
        height:100vh;
    }
    .detail-nav{
        position:relative;
        z-index:9;
        background-color: #fff;
    }
    .content{
        height:calc(100% - 44px - 49px);
        /* overflow: hidden;
        position:absolute;
        top:44px;
        bottom:0;
        left:0;
        right:0; */
    }
</style>