<template>
    <div class="box">
        <h2 class="title">教师主页-- teacher</h2>
        <div class="section">
            
        <el-row>
            <el-form ref="form"  label-width="80px" size="mini">
                <el-form-item label="班级选择">
                    <el-select v-model="banji"  placeholder="请选择查看班级">
                        <el-option 
                        v-for="(ban,index) in banList" 
                        :label="ban.btext" 
                        :key="index"
                        :value="ban.bcode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="搜索" class="m-box">
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
                    label="姓名"
                    width="120">
                    <template slot-scope="a">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ a.row.username }}</el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="sno"
                    label="学号"
                    width="50">
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
                    width="50">
                </el-table-column>
                <el-table-column
                    label="查看违纪"
                    width="120">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="success"
                        @click="openonedialog(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="120">
                        <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="opendialog(scope.row)"
                        >添加违纪</el-button>
                    </template>

                    </el-table-column>
                </el-table>
            </el-row>     
        </div>
        <el-dialog
            title="添加违纪"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form"  label-width="80px" size="mini">
                <el-form-item label="学生姓名" class="m-box">
                    <el-input  v-model="obj.username" disabled ></el-input>
                </el-form-item>
                <el-form-item label="学生编号" class="m-box">
                    <el-input  v-model="obj.sno" disabled ></el-input>
                </el-form-item>
                <el-form-item label="违纪选择">
                    <el-select v-model="obj.wjtype"  placeholder="请选择">
                        <el-option 
                        v-for="(we,index) in weijireason" 
                        :label="we.reason" 
                        :key="index"
                        :value="we.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" class="m-box">
                    <el-date-picker
                        v-model="obj.time"
                        type="date"
                        
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" class="m-box">
                    <el-input  v-model.lazy.trim="obj.shuoming" placeholder="请输入备注说明" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBadlist">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="学生违纪" 
            :visible.sync="oneVisible"
            width="30%"
            :before-close="oneClose">
            <el-table
                :data="stuBadList"
                stripe
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="50">
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
                    prop="reason.reason"
                    label="类型"
                    width="100">
                </el-table-column>
                 <el-table-column
                    label="进度"
                    width="100">
                     <template slot-scope="a">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium" :type=" a.row.step | stepcolor" >{{ a.row.step | stepText }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="oneVisible = false">取 消</el-button>
                <el-button type="primary" @click="oneVisible=false">确 定</el-button>
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
            stuList:[],
            keyword:'',
            dialogVisible:false,
            obj:{},
            weijireason:[],
            oneVisible:false,
            stuBadList:[]
        }
    },
    methods:{
        openonedialog(row){ 
            
            this.$axios.get("/vue/onestubadlist",{
                params:{
                     sno:row.sno
                }
            }).then(res=>{
                this.oneVisible  = true;
                this.stuBadList = res.data.result;
            })

        },
        oneClose(){
            this.oneVisible = false;
        },
        handleClose(){
            this.dialogVisible = false;
        },
        addBadlist(){
            
            this.$axios.post("/vue/addstudweiji",{
                stu_no:this.obj.sno,
                stu_name:this.obj.username,
                time:this.obj.time,
                md:this.obj.shuoming,
                type:this.obj.wjtype
            }).then(res=>{
                this.dialogVisible = false;
                this.$axios.get("/vue/getstulist",{
                    params:{
                        banji:this.banji
                    }
                }).then(res=>{
                    this.stuList = res.data.result;
                })
            })
        },
        opendialog(row){
            this.dialogVisible = true;
            this.obj = row; 
        }
    },
    watch:{
        banji(newVal){
            console.log(newVal);
            this.$axios.get("/vue/getstulist",{
                params:{
                    banji:newVal
                }
            }).then(res=>{
                this.stuList = res.data.result;
            })
        },
        keyword(newVal){
            if(this.banji!==""){
                this.$axios.get("/vue/getstulist",{
                    params:{
                        banji:this.banji,
                        keyword:newVal
                    }
                }).then(res=>{
                    this.stuList = res.data.result;
                })
            }else{
                alert("请先选择班级再搜索");
            }
        }
    },
    created(){
        this.$axios.get("/vue/getwejitype").then(res=>{
            this.weijireason = res.data.result
        })
    },
    mounted(){
        // 当前讲师的所带班级
        this.$axios.get("/vue/getbanjilist",{
            
        }).then(res=>{
            console.log(res);
            this.banList = res.data.result;
                if(this.banList.length<=0){
                    this.$alert('请讲师先添加个人班级', '友好提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            console.log(action);
                            if(action){
                                this.$router.push({name:'banguanli',query:{type:'second'}})
                            }
                        }
                    })
                }
        })
    }
}
</script>

<style scoped>
.m-box{
    width:280px;
}
</style>

