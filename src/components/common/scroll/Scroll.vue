<template>
    <!-- 子组件的属性ref -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        name:'Scroll',
        data(){
            return {
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            this.scroll = new BScroll(this.$refs.wrapper,{
                // movable: true,
                zoom: true,
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            });
            // 监听滚动事件
            this.scroll.on('scroll',(position) => {
                // console.log(position);
                // 把滚动自定义事件发出去
                this.$emit("scroll",position)
            });
            // 监听上拉加载事件
            this.scroll.on("pullingUp",() => {
                // console.log("上拉加载更多");
                this.$emit("pullingUp")
            });
            // console.log(this.scroll);
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll && this.scroll.scrollTo(x,y,time);
            },
            finishPullUp(){
                this.scroll && this.scroll.finishPullUp()
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            },
            getScrollY(){
                // return this.scroll ? this.scroll.y : 0
                return this.scroll.y
            }
        }
    }
</script>

<style>

</style>