<template>
    <div class="check-button" :class="{check:isActive}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name:"checkButton",
        props:{
            isActive:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>
    .check-button {
        border-radius: 50%;
        border:2px solid #aaa;
    }
    .check{
        background-color: red;
        border-color:red;
    }
</style>