<template>
    <div id="login">
        <el-row>
            <el-col :span="8" class="login-box">
                <h2 class="title">立即登录</h2>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="手机号">
                        <el-input v-model="form.mobile" type="mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="登录模式">
                        <el-radio-group v-model="form.type">
                        <el-radio   :label="0">学生</el-radio>
                        <el-radio   :label="1">教师</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item >
                        <p @click="gotoZhuce" :style="{color:'#F56C6C',cursor: 'pointer'}">还未注册,立即注册!</p>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="todoLogin" class="login-btn" type="primary" size="medium" >立即登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script>

export default {
    data(){
        return {
            form:{
                type:0,
                mobile:"",
            }
        }
    },
    methods:{
        gotoZhuce(){
            this.$router.push({name:'register'})
        },
        todoLogin(){
            console.log(this.form);
            this.$axios.post("/vue/login",this.form)
            .then(res=>{
                if(!!res.data.flag){
                    var flag = res.data.result.flag;
                    this.$router.push({name:flag?'teamine':'changeinfo'});
                    // 数据缓存 sessionStorage   vuex
                    sessionStorage.token = res.data.token;
                    sessionStorage.mobile = res.data.result.mobile;
                    sessionStorage.sno = res.data.result.sno;
                }
            })
        }
    },
    created(){
        // if(this.$route.query){
        //     console.log(this.$route);
        //     this.form.mobile = this.$route.query.mobile;
        //     this.form.type = this.$route.query.type * 1;
        // }
        console.log(this.$route.query.mobile);
        this.form.mobile = this.$route.query.mobile ?  this.$route.query.mobile : '';
        this.form.type = this.$route.query.type ?  this.$route.query.type * 1 : 0;
    }
}
</script>

<style scoped>
#login{
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
