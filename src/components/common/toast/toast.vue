<template>
    <div class="toast" v-show="isShow">
        <span>{{message}}</span>
    </div>
</template>

<script>
    export default {
        name:"toast",
        props:{
            // message:{
            //     type:String,
            //     default(){
            //         return ""
            //     }
            // },
            // show:{
            //     type:Boolean,
            //     default:false
            // }
        },
        data(){
            return {
                message:"",
                isShow:false
            }
        },
        methods:{
            show(message,duration){
                this.message = message;
                this.isShow = true;
                setTimeout(() => {
                    this.message = "";
                    this.isShow = false
                },duration)
            }
        }
    }
</script>

<style scoped>
    .toast{
        color:white;
        background-color: rgba(0,0,0,.7);
        padding:8px 10px;
        position:fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 9;
    }
</style>