<template>
    <div id="register">
        <el-row>
            <el-col :span="8" class="login-box">
                <h2 class="title">马上注册</h2>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="手机号">
                        <el-input v-model="form.mobile" type="mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.dbpwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="注册模式">
                        <el-radio-group v-model="form.type">
                        <el-radio   :label="0" >学生</el-radio>
                        <el-radio   :label="1" >教师</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item >
                        <p @click="gotoLogin" :style="{color:'#F56C6C',cursor: 'pointer'}">已有账号,立即登录</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click="autoZhuce" class="login-btn" type="warning" size="medium" >立即注册</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import router from "@/router"
export default {
    data(){
        return {
            form:{
                type:0
            }
        }
    },
    methods:{
        gotoLogin(){
            router.push({name:"login"})
        },
        autoZhuce(){
            console.log(this.form);
            const loading =  this.$loading({
                lock: false,
                text: '正在注册中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0)'
            });

            this.$http.post("http://localhost:1909/vue/zhuce",this.form)
            .then(res=>{
                console.log(res);
                loading.close();
                if(!!res.data.flag){
                    this.$router.push({name:"login",query:{mobile:this.form.mobile,type:this.form.type}})
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'success',
                        duration:1000
                    });
                }
                
            })
        }
    }
}
</script>

<style scoped>
#register{
    display: flex;
    justify-content: center;
    align-items: center;
}
.title {
    color:#67C23A;
    font-size:30px;
    width:100%;
    text-align: center;
    padding:10px 0;
    
}
.login-box{
    border:2px solid darkcyan;
    padding:10px;
    border-radius:10px;
    width:400px;
}

.login-btn{
    width:100%;
}
</style>
