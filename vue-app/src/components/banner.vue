<template>
    <MySwipe id="one" :swiperOptions="swiperOptions" >
        <MySwipeItem v-for="(l,i) in list " :key="i">
             <img class="my-img" :src="l.imgUrl" alt="">
        </MySwipeItem>
    </MySwipe>
</template>




<script>
export default {
    data(){
        return {
            list:[
                require("@/assets/images/img1.jpg"),
                require("@/assets/images/img2.jpg"),
                require("@/assets/images/img3.jpg"),
                require("@/assets/images/img4.jpg"),
            ],
            swiperOptions:{
                loop:true,
                speed:1500,
                atuoplay:true,
            }
        }
    },
    created(){
        this.$axios({
            url:"/gateway?type=2&cityId=110100&k=7559742",
            method:"GET",
            headers:{
                'X-Client-Info':' {"a":"3000","ch":"1002","v":"5.0.4","e":"15725877173487513444945"}',
                'X-Host': 'mall.cfg.common-banner'
            }
        }).then(res=>{
           
        // setTimeout 
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新    
           this.$nextTick(()=>{
               this.list = res.data.data;
               console.log(this.list);
           })
        })
    }
}
</script>

<style lang="scss" scoped>
#one{
    width:400px;
    height:300px;
    .my-img{
        width:400px;
        height:300px;
    }
}
</style>

