import {debounce} from "./utils"
import backTop from "components/content/backTop/BackTop"
/*
  因为Home和Detail公用组件GoodsListItem，并监听图片的加载，用事件总线进行刷新，为了切断Detail的图片加载，
  影响Home的刷新，我们引入了混入mixin，并切断中间的联系
*/ 
export const itemImgListenerMixin = {
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,200);
        this.itemImgListener = () => {
            this.$refs.scroll.refresh()
            refresh()
        };
        this.$bus.$on("itemImageLoad",this.itemImgListener);
        // console.log("我是混入");
    }
}
/*
  返回顶部的混入抽取
*/ 
export const backTopMixIn = {
    data(){
        return {
            isBackTop: false
        }
    },
    components:{
        backTop
    },
    methods:{
        backClick() {
            // console.log("监听事件");
            // console.log(this.$refs.scroll);
            this.$refs.scroll.scrollTo(0, 0)
        }
    }
}