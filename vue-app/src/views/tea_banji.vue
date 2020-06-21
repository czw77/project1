<template>
    <div class="box">
        <h2 class="title">教师班级管理</h2>
        <div class="section" >
            <el-tabs  type="border-card" v-model="activeName" >
                <el-tab-pane label="我的班级" name="first">
                    <TeaInfo :teainfo="teacherInfo"></TeaInfo>
                </el-tab-pane>
                <el-tab-pane label="班级修改" name="second">
                    <TeachBanji :teainfo="teacherInfo" ></TeachBanji>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    修改密码
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import TeaInfo from "@/components/teainfo.vue";
import TeachBanji from "@/components/teachbanji.vue";

export default {
    data(){
        return {
            activeName:'first',
            teacherInfo:{}
        }
    },
    mounted(){
        this.activeName = this.$route.query.type ?  this.$route.query.type :'first';


        this.$axios.get("/vue/teacher/getinfo",{
            params:{
                sno:sessionStorage.sno
            }
        }).then(res=>{
            this.teacherInfo = res.data.result;
        })
    },
    components:{
        TeaInfo,
        TeachBanji
    }
}
</script>


<style scoped>
.title{
    color:#E6A23C;
    font-size:36px;
}
</style>
