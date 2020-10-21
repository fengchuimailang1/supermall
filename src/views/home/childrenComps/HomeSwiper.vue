<template>
    <div>
        <Swiper>
            <Swiper-item v-for="item in banner">
                <a :href="item.image">
                    <img :src="item.image" alt="" @load="swiperLoad">
                </a>
            </Swiper-item>
        </Swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperItem } from "components/common/swiper"
    export default {
        name: "HomeSwiper",
        data() {
            return {
                isLoad: true
            }
        },
        props: {
            banner: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            swiperLoad() {
                // console.log("-----");
                // 解决访问服务器过多的问题
                if (this.isLoad) {
                    this.$emit("homeSwiperLoad");
                    this.isLoad = false
                }
            }
        }
    }
</script>

<style>

</style>