<template>
    <div class="student">
        <Head :username="stuInfo.username" :flag="stuInfo.flag"></Head>
        <div class="content">
             <StuNav :list="stu_router" :current="current"></StuNav>
             <div class="right">
                 <router-view :key="$route.fullPath" class="sub-box"></router-view>
             </div>
        </div>
    </div>
</template>


<script>
import {stu_router} from "@/utils";
import {mapState,mapActions} from "vuex";

export default {
    data(){
        return {
            stu_router,
            current:"3",
            // stuInfo:{},
        }
    },
    computed:{
        ...mapState(['stuInfo'])
    },
    watch:{
        '$route':function(to,from){
            this.stu_router.forEach((item,index)=>{
                if(item.name == to.name){
                    this.current = index+"";
                }
            })  
        }
    },
    methods:{
        ...mapActions([
            'getStuInfo'
        ])
    },
    mounted(){
        // this.$axios.get("/vue/movie").then(res=>{
            
        // })

        // this.$axios.get("/vue/stugetinfo").then(res=>{
        //     this.stuInfo = res.data.result;
        //     // vuex 
        //     // sessionStorage 
        //     sessionStorage.stuInfo  = JSON.stringify(this.stuInfo);
        // });
        if(!this.stuInfo.length>0){
            this.getStuInfo({url:"/vue/stugetinfo"});
        }
        


        var name = this.$route.name;
        console.log(name);
        this.stu_router.forEach((item,index)=>{
            if(item.name == name){
                this.current = index+"";
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.content{
    width:100%;
    display:flex;
    .right{
        flex:1;
        background:#e4e4e4;
        padding:40px;
        box-sizing: border-box;        
    }
}
</style>
