<template>
    <div class="cart-bottom-bar">
        <div class="check-part">
            <check-button class="check-button" :is-active="isSelectAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            <span>合计：{{totalPrice}}</span>
        </div>
        <div class="calculate">
            <span>去计算({{totalCount}})</span>
        </div>
    </div>
</template>

<script>
    import checkButton from "components/content/checkButton/checkButton"
    export default {
        name:"cartBottomBar",
        components:{
            checkButton
        },
        computed:{
            totalPrice(){
                return "￥" + this.$store.state.cartList.filter(item => {
                    return item.check
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0).toFixed(2)
            },
            totalCount(){
                return this.$store.state.cartList.filter(item => {
                    return item.check
                }).length
            },
            isSelectAll(){
                if(this.$store.state.cartList.length == 0) return false;
                // 用高阶函数filter
                // return !(this.$store.state.cartList.filter(item => !item.check).length)
                // 用高阶函数find
                return !this.$store.state.cartList.find(item => !item.check)
                // 用便利的方法
                // for(let item of this.$store.state.cartList){
                //     if(!item.check){
                //         return false
                //     }
                // }
                // return true
            }
        },
        methods:{
            checkClick(){
               if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.check = false);
               }else{
                this.$store.state.cartList.forEach(item => item.check = true);  
               }
            }
        }
    }
</script>

<style scoped>
    .cart-bottom-bar{
        height:40px;
        background-color: #eee;
        display: flex;
        line-height: 40px;
        position:absolute;
        bottom:49px;
        left:0;
        right:0;
    }
    .check-part{
        width:60px;
        height:40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .check-button{
        width:20px;
        height:20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .check-part span{
        font-size: 14px;
    }
    .price{
        flex:1;
        margin-left:30px;
    }
    .calculate{
        width:90px;
        background-color: red;
        color:white;
        text-align: center;
    }
</style>