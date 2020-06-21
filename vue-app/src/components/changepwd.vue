<template>
    <div>
        <h3 :style="{color:'#67C23A',fontSize:'24px'}">修改密码</h3>
        <el-form :inline="true" :model="password" class="demo-form-inline">
            <el-form-item label="原密码:">
                <el-input v-model="password.oldValue" show-password placeholder="原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码:">
                <el-input v-model="password.newValue" show-password placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="!disabled" type="primary" @click="todoChange">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            password:{

            }
        }
    },
    methods:{
        todoChange(){
            console.log("todo");
            this.$axios.post("/vue/stuchangepwd",{
                oldValue:this.password.oldValue,
                newValue:this.password.newValue,
                sno:sessionStorage.sno
            }).then(res=>{
                if(!!res.data.flag){
                    this.$router.push({
                        name:'login'
                    })
                }
            })
        }
    },
    computed:{
        disabled:{
            get(){
                var flag = false;
                if(this.password.oldValue&&this.password.newValue){
                    flag = true;
                }
                return flag;
            }
        }
    }
}
</script>
