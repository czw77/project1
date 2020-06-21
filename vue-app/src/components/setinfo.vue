<template>
    <div>
        <h3 :style="{color:'#67C23A',fontSize:'24px',margin:'10px'}" >修改信息  --- {{common.name}}</h3>
        <el-row>
            <el-col :span="8" >
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名" >
                        <el-input v-model="form.username" disabled ></el-input>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="form.banji" placeholder="请选择班级">
                            <el-option 
                            v-for="(banji,index) in common.banList" 
                            :label="banji.banji_text" 
                            :key="index"
                            :value="banji.banji_code"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.md" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="change" class="login-btn" type="warning" size="medium" >立即修改个人信息</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
    data(){
        return {
            // form:{
                
            // },
            banjiList:[]
        }
    },
    computed:{
        ...mapState({
            form:'stuInfo',
        }),
        ...mapState([
            'common',
        ])
    },
    mounted(){
        // this.form.username = JSON.parse(sessionStorage.stuInfo).username;
        // this.form.banji = JSON.parse(sessionStorage.stuInfo)
        // this.form = JSON.parse(sessionStorage.stuInfo)
        // this.$axios.get("/vue/banjilist").then(res=>{
        //     this.banjiList = res.data.result;
        // })
        if(!this.common.banList.length>0){
            this.getBanList({url:"/vue/banjilist"})
        }
    },
    methods:{
        ...mapActions([
            'getBanList'
        ]),
        change(){
            this.$axios.post("/vue/changestuinfo",this.form)
            .then(res=>{
                
            })
        }
    }
}
</script>
