<template>
    <div>
        <h3 @click="add">以下是你的个人信息-- Teacher  -- {{msg}} -- {{count}} </h3>
         <ul>
            <li>
                姓名: {{teainfo.username}}
            </li>
            <li>
                教师编码: {{teainfo.sno}}
            </li>
            <li>
                手机号: {{teainfo.mobile}}
            </li>
            <li>
                身份: {{teainfo.flag?'教师':'学生'}}
            </li>
            <li>
                <p>当前班级:</p>
                <p v-if="banList.length>0" >
                     <el-button v-for="(banji,i) in banList" :key="i" type="success">
                         {{banji.btext}}
                     </el-button>
                </p>
                <el-button v-else type="info">你还没有任何班级信息,请马上去添加</el-button> 
            </li>
        </ul>
    </div>
</template>

<script>
import {myMixin,mx} from "@/utils";
export default {
    mixins: [myMixin,mx],
    props:['teainfo'],
    data(){
        return {
            banList:[]
        }
    },
    // mounted(){
    //     console.log(this.teainfo);
    //     setTimeout(()=>{
    //         this.$axios.get("/vue/getbanjilist",{
    //                 params:{
    //                     sno:this.teainfo.sno
    //                 }
    //             }).then(res=>{
    //                 this.banList = res.data.result;
    //         })
    //     },1)
    // }
}
</script>





