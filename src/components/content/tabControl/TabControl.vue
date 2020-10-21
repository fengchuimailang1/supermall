<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" class="tab-control-item" 
        :class="{active:index == currentCount}" 
        @click="changeItem(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"TabControl",
        data(){
            return{
                currentCount:0
            }
        },
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            changeItem(index){
                this.currentCount = index;
                this.$emit("tabClick",index)
            }
        }
    }
</script>

<style>
    .tab-control{
        display:flex;
        height:40px;
        line-height:40px;
        text-align: center;
        background-color: #fff;
    }
    .tab-control-item{
        flex:1;
    }
    .tab-control-item span{
        padding:0 5px 5px;
    }
    .active{
        color:var(--color-high-text);
    }
    .active span{
        border-bottom:3px solid var(--color-tint)
    }
</style>