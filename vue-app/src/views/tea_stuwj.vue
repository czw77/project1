<template>
    <div class="box">
        <h2 class="title">学生违纪申诉管理</h2>
        <div class="section">
            <el-row>
                <el-form ref="form"  label-width="80px" size="mini">
                    
                    <el-form-item label="搜索学生" class="m-box">
                        <el-input  v-model.lazy.trim="keyword" placeholder="请输入姓名或者学号" ></el-input>
                    </el-form-item>
                </el-form>
            </el-row>  
            <el-row>
            <el-table
                :data="stuList"
                stripe
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="学生姓名"
                    width="100">
                    <template slot-scope="a">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ a.row.sname }}</el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="sno"
                    label="学生学号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="reason.reason"
                    label="违纪"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="md"
                    label="备注(教师)"
                    width="140">
                </el-table-column>
               <el-table-column
                    label="时间"
                    width="150">
                     <template slot-scope="a">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ a.row.time | dateFormat }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="进度"
                    width="100">
                    <template slot-scope="a">
                        <div slot="reference" class="name-wrapper">
                            <el-tooltip class="item" effect="dark" :content="'学生申诉内容:'+(a.row.shentext?a.row.shentext:'学生未申诉')" placement="top-start">
                                <el-tag size="medium" :type=" a.row.step | stepcolor" >{{ a.row.step | stepText }}</el-tag>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="120">
                        <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        :disabled="!scope.row.step"
                        @click="opendialog(scope.row)"
                        >审批</el-button>
                    </template>

                    </el-table-column>
                </el-table>
            </el-row>     
        </div>
        <el-dialog
            title="学生申诉审批" 
            :visible.sync="oneVisible"
            width="30%"
            :before-close="oneClose">
                <el-card class="box-card">
                    <p>学生名字 : {{obj.sname}}</p>
                    <p v-if="obj.reason">学生违纪 : {{obj.reason.reason}}</p>
                    <p >学生申诉理由 : {{obj.shentext}}</p>
                    <hr>
                    <p>讲师备注 : <el-input v-model="obj.sptext" placeholder="审批备注"></el-input></p>
                    <p>
                        <el-button type="primary" @click="todocheck(true,obj)"> 同意申诉 </el-button>
                        <el-button type="info" @click="todocheck(false,obj)"> 驳回申诉 </el-button>
                    </p>
                </el-card>
            <span slot="footer" class="dialog-footer">
                
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            banji:"",
            banList:[],
            keyword:'',
            stuList:[],
            oneVisible:false,
            obj:{}
        }
    },
    methods:{
        oneClose(){
            this.oneVisible = false;
        },
        opendialog(row){
            this.oneVisible = true;
            this.obj = row;
        },
        todocheck(flag,obj){
            this.$axios.post("/vue/checkstushensu",{
                _id:obj._id,
                flag,
                step:2,
                sno:obj.sno,
                count:obj.reason.count
            }).then(res=>{
                this.oneVisible = false;
                this.$axios.get("/vue/getbadstulist").then(res=>{
                    this.stuList = res.data.result
                })
            })
        }
    },
    created(){
        this.$axios.get("/vue/getbadstulist").then(res=>{
            this.stuList = res.data.result
        })
    },
    watch:{
        keyword(newVal){
            this.$axios.get("/vue/getbadstulist",{
                params:{
                    keyword:newVal
                }
            }).then(res=>{
                this.stuList = res.data.result;
            })
        }
    },
    mounted(){
    }
}
</script>


<style scoped>
.m-box{
    width:280px;
}
</style>
