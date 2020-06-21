<template>
    <div class="box">
        <h2>学生主页</h2>
        <div class="section">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <ElSwiper></ElSwiper>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <Banner></Banner>
                    </div>
                </el-col>
            </el-row>
            
            <el-row>
                <el-table
                    :data="common.stuList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                        label="姓名"
                        width="120">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.username }}</el-tag>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="sno"
                        label="学号"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="btext"
                        label="班级"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="score"
                        label="分数"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="120">
                         <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            >查看</el-button>
                        </template>

                    </el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>


<script>
import ElSwiper from "@/components/elSwipe.vue";
import Banner from "@/components/banner.vue";

import {mapState,mapActions} from "vuex";

export default {
    components:{
        ElSwiper,
        Banner
    },
    data(){
        return {
            stuList:[]
        }
    },
    computed:{
        ...mapState(['stuInfo','common'])
    },
    methods:{
        ...mapActions(['getStuList'])
    },
    mounted(){
        // var stuInfo = JSON.parse(sessionStorage.stuInfo);
        if(this.stuInfo.banji){
            if(!this.common.stuList.length>0){
                this.getStuList({
                    url:"/vue/getstulist",
                    params:{
                        banji:this.stuInfo.banji
                    }
                })
            }
            // 接口 
            // this.$axios.get("/vue/getstulist",{
            //     params:{
            //         banji:this.stuInfo.banji
            //     }
            // }).then(res=>{
            //     this.$nextTick(()=>{
            //         this.stuList = res.data.result;
            //     })
            // })
        }else{
            this.$alert('请务必先选择个人所在班级', '友好提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log(action);
                    if(action){
                        this.$router.push({name:'changeinfo',query:{type:'second'}})
                    }
                }
            })
        }
    }
}
</script>
