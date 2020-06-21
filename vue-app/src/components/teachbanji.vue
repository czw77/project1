<template>
    <div>
        <h3>班级管理</h3>
        <hr>      
        <div v-if="banList.length>0">
            <p v-for="(ban,index) in banList" :key="index">
                {{ban.btext}}
                <el-button  type="primary" @click="delById(ban._id,index)"  >
                    删除
                </el-button>
            </p>
        </div>
        <hr>
        <el-row>
                <el-select v-model="banji" placeholder="请选择班级">
                    <el-option 
                    v-for="(banji,index) in allBanlist" 
                    :label="banji.banji_text" 
                    :key="index"
                    :value="banji.banji_code"></el-option>
                </el-select>
            <el-button @click="addBanji" class="login-btn" type="warning" size="medium" >添加班级</el-button>
        </el-row>
    </div>
</template>

<script>
import {color_list} from "@/utils";
import {myMixin,mx} from "@/utils";

export default {
    mixins:[mx],
    data(){
        return {
             banList:[],
             color_list,
             allBanlist:[],
             banji:''
        }
    },
    methods:{
        addBanji(){
            console.log(this.banji);
            this.$axios.get("/vue/addteabanji",{
                params:{
                    sno:this.teainfo.sno,
                    tname:this.teainfo.username,
                    bcode:this.banji
                }
            }).then(res=>{
                this.banList  = res.data.result;
            })
        },
        delById(_id,index){
            this.$axios.get("/vue/delteabanji",{
                params:{
                    _id
                }
            }).then(res=>{
                this.banList.splice(index,1);
            })
        }
    },
    created(){
        this.$axios.get("/vue/banjilist").then(res=>{
            this.allBanlist = res.data.result;
        })
    },
    props:['teainfo'],
    // mounted(){
    //     this.$axios.get("/vue/getbanjilist",{
    //         params:{
    //             sno:this.teainfo.sno
    //         }
    //     }).then(res=>{
    //         console.log(res);
    //         this.banList = res.data.result;
    //     })
    // }
}
</script>





