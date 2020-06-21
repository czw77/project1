<template>
    <el-carousel class="banner" >
        <el-carousel-item v-for="(item,index) in banner" :key="index">
             <img :src="item.images.large" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>


export default {
    data(){
        return {
            banner:[
                // require("@/assets/images/img1.jpg"),
                // require("@/assets/images/img2.jpg"),
                // require("@/assets/images/img3.jpg"),
                // require("@/assets/images/img4.jpg"),
            ]
        }
    },
    mounted(){

        // this.$axios({
        //     url:"/gateway?type=2&cityId=110100&k=2082246",
        //     method:"GET",
        //     headers:{
        //         "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"15725877173487513444945"}',
        //         "X-Host": "mall.cfg.common-banner"
        //     }
        // }).then(result=>{
        //     console.log(result);
            
        // })


        this.$axios.get("/vue/movie",{
            params:{
                limit:4
            }
        }).then(res=>{
            this.banner = res.data.result
        })
    },
    props:[
        
    ]
}
</script>

<style scoped>
.banner, img{
    width:100%;
    /* height:240px; */
}
</style>
