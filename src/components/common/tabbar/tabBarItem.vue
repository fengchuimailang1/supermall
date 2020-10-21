<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div class="item-text" :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabBarItem",
        data() {
            return {
                // isActive:true
            }
        },
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        computed: {
            // 动态改变tabBar颜色
            isActive() {
                return this.$route.path.indexOf(this.path) !== -1
            },
            // 可以自己设置字体颜色
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }

    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 2px;
        margin-bottom: 2px;
        vertical-align: middle;
    }

    .item-text {
        font-size: 12px;
        margin-top: 3px;
        color: #333;
    }

    /* .active{
        color:red;
    } */
</style>