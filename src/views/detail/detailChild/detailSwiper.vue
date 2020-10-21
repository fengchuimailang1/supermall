<template>
    <div class="detail-swiper">
        <Swiper class="swiper-wrapper">
            <Swiper-item v-for="item in images">
                <img :src="item" alt="">
            </Swiper-item>
        </Swiper>
    </div>
</template>

<script>
    import {Swiper,SwiperItem} from "components/common/swiper/index"
    export default {
        name:"detailSwiper",
        props:{
            images:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>
    .swiper-wrapper{
        height:300px;
    }
</style>