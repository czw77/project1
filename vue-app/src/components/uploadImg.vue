<template>
    <div>
        <el-tooltip class="item" effect="dark" content="点击切换头像" placement="top">
            <img class="pic" :src="pic" alt="" @click="posttouxing"   >
        </el-tooltip>
        <input type="file" @change="todoupload"  ref="upload" class="fileclass" >
     </div>
</template>

<script>
import pic from "@/assets/images/photo.png";
export default {
    data(){
        return {
            pic:""
        }
    },
    props:['flag'],
    mounted(){
        // if(localStorage.avatar){
        //     this.pic = localStorage.avatar;
        // }else{
            //  要去数据库查询  
            this.$axios.post("/vue/getavatar",{
                flag:this.flag
            }).then(res=>{
                console.log(res);
                if(!!res.data.flag){
                    this.pic = res.data.result.pic.replace("public","http://localhost:1909");
                }else{
                    this.pic = pic;
                }
            })
        // 
    },
    methods:{
        posttouxing(){
            this.$refs.upload.click();
        },
        todoupload(){
            console.log("开始上传....");
            var file = this.$refs.upload.files[0];  // 需要上传的文件 
            console.log(file);
            var data = new FormData(); // 转换为表单的形式提交到后台  
            data.append("avatar",file);
            this.$axios({
                url:"/vue/uploadpic",
                method:"POST",
                params:{
                    flag:this.flag
                },
                data
            }).then(res=>{
                console.log(res);
                // this.pic = res.data.pic.replace("public","http://localhost:1909");
                this.pic = res.data.pic.replace("public","");  // 反选代理 
                localStorage.avatar = this.pic;
            })
        }
    }
}
</script>

<style scoped>
.fileclass{
    display: none;
}
</style>

