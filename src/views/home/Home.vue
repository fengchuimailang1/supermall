<template>
    <div class="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
            <!-- <template #center>购物街</template> -->
        </nav-bar>
        <Tab-control class="tab-control fixed" :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl2" 
        v-show="isTabFixed"></Tab-control>
        <Scroll class="content" ref="scroll" 
        :probe-type="3" @scroll="contentScroll" 
        :pullUpLoad="true" @pullingUp="loadMore">
            <Home-swiper :banner="banner" @homeSwiperLoad="homeSwiperLoad"></Home-swiper>
            <Recommend-view :recommend="recommend"></Recommend-view>
            <Feature-view></Feature-view>
            <Tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"></Tab-control>
            <GoodsList :goods="showGoods"></GoodsList>
        </Scroll>
        <!-- 
            修饰符.native修饰什么是使用？
              在我们需要监听一个组件的原生事件时，必须给对应事件加上.native修饰符，才能进行事件监听
         -->
        <backTop @click.native="backClick" v-show="isBackTop"></backTop>
    </div>
</template>

<script>
    import navBar from "components/common/navbar/navBar"
    import TabControl from "components/content/tabControl/TabControl"
    import GoodsList from "components/content/goods/GoodsList"
    import Scroll from "components/common/scroll/Scroll"

    import HomeSwiper from "./childrenComps/HomeSwiper.vue"
    import RecommendView from "./childrenComps/RecommendView.vue"
    import FeatureView from "./childrenComps/FeatureView.vue"

    import { getHomeMultidata, getHomeData } from "network/home"
    import {debounce} from "common/utils"
    import {itemImgListenerMixin, backTopMixIn} from "common/mixins"

    export default {
        name: "Home",
        data() {
            return {
                banner: [],
                recommend: [],
                // result:{}
                goods: {
                    pop: { page: 0, list: [] },
                    new: { page: 0, list: [] },
                    sell: { page: 0, list: [] }
                },
                currentType: "pop",
                tabOffsetTop:null,
                isTabFixed:false,
                saveY:0
            }
        },
        components: {
            navBar,
            TabControl,
            GoodsList,
            Scroll,
            HomeSwiper,
            RecommendView,
            FeatureView
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        mixins:[itemImgListenerMixin, backTopMixIn],
        created() {
            this.getHomeMultidata();
            this.getHomeData('pop');
            this.getHomeData('new');
            this.getHomeData('sell');
           
        },
        deactivated(){
            this.$bus.$off("itemImageLoad",this.itemImgListener)
        },
        mounted(){
            // const refresh = debounce(this.$refs.scroll.refresh,200)
             // 组件创建完成，监听图片的加载
            //  this.$bus.$on("itemImageLoad",() => {
                // console.log("--------");
                // console.log(this.$refs.scroll.refresh());
                // this.$refs.scroll.refresh()
            //     refresh()
            // });
            // console.log(this.$refs.tabControl.$el.offsetTop);
        },
        // home离开时记录状态和位置
        activated(){
            // console.log(this.saveY);
            // 先刷新在滚动，会保持在记录的位置
            this.$refs.scroll.refresh();
            this.$refs.scroll.scrollTo(0,this.saveY,0);
        },
        deactivated(){
            // console.log(this.$refs.scroll.getScrollY());
            this.saveY = this.$refs.scroll.getScrollY()
        },
        methods: {
            /*
              数据请求的方法
            */
            getHomeMultidata() {
                return getHomeMultidata().then(res => {
                    // console.log(res);
                    this.banner = res.data.banner.list;
                    this.recommend = res.data.recommend.list;
                    // this.result = res
                })
            },
            //下拉加载更多 
            getHomeData(type) {
                const page = this.goods[type].page + 1;
                return getHomeData(type, page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;

                    // 上拉加载更多只能加载一次，为了多次加载
                    this.$refs.scroll.finishPullUp()
                })
            },
            /*
              监听点击事件的方法
            */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = "pop";
                        break;
                    case 1:
                        this.currentType = "new";
                        break;
                    case 2:
                        this.currentType = "sell";
                        break;
                };
                this.$refs.tabControl1.currentCount = index;
                this.$refs.tabControl2.currentCount = index;
            },
            contentScroll(position) {
                // console.log(position);
                // 判断是否显示返回顶部的图标
                this.isBackTop = (-position.y) > 1000;
                // 判断tab-control是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            loadMore(){
                // console.log("上拉加载更多");
                this.getHomeData(this.currentType)
            },
            // 获取tab-control距顶部的高度
            homeSwiperLoad(){
                // console.log(this.$refs.tabControl.$el.offsetTop);
                this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
            }
        }
    }
</script>

<style scoped>
    .home {
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: white;
        z-index: 9;
    }
    .fixed{
        position:relative;
        z-index: 9;
    }
    .content {
        /* height:500px; */
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /* .content{
        height:calc(100% - 93px);
        overflow:hidden;
    } */
</style>