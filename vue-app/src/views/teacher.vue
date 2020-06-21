<template>
    <div class="teacher">
        <Head :username="teacherInfo.username" :flag="true"></Head>
        <div class="content">
             <StuNav :list="tea_router" :current="current"></StuNav>
             <div class="right">
                 <router-view :key="$route.fullPath" class="sub-box"></router-view>
             </div>
        </div>
    </div>
</template>


<script>
import {tea_router} from "@/utils";
export default {
    data(){
        return {
            teacherInfo:{},
            current:"0",
            tea_router
        }
    },
    watch:{
        '$route':function(to,from){
            this.tea_router.forEach((item,index)=>{
                if(item.name == to.name){
                    this.current = index+"";
                }
            })  
        }
    },
    created(){
        var name = this.$route.name;
        console.log(name);
        this.tea_router.forEach((item,index)=>{
            if(item.name == name){
                this.current = index+"";
            }
        })
    },
    mounted(){
        this.$axios.get("/vue/teacher/getinfo",{
            params:{
                sno:sessionStorage.sno
            }
        }).then(res=>{
            this.teacherInfo = res.data.result;
        })
    }
}
</script>
