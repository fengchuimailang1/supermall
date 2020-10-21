<template>
    <div class="detailNav">
        <Nav-bar>
            <div class="left" slot="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div class="titles" slot="center">
                <div class="item" v-for="(item,index) in titles" :class="{active:currentIndex == index}"
                    @click="navClick(index)">{{item}}</div>
            </div>
        </Nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/navBar"
    export default {
        name: "detailNav",
        data() {
            return {
                titles: ["商品", "参数", "评论", "推荐"],
                currentIndex: 0
            }
        },
        components: {
            NavBar
        },
        methods: {
            navClick(index) {
                this.currentIndex = index;
                this.$emit("navClick",index)
            },
            backClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .titles {
        display: flex
    }

    .item {
        flex: 1;
        font-size: 14px;
    }

    .active {
        color: var(--color-tint)
    }
    .left {
        margin-top: 7px;
    }
</style>