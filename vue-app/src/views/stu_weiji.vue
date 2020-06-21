<template>
    <div class="box">
        <h2>我的违纪</h2>
         <div class="section">
             <el-row>
                <el-table
                :data="common.myBadList"
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
                    width="160">
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
                <el-table-column
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="opendialog(scope.row)"
                    :disabled="scope.row.step>=1"
                    >申诉</el-button>
                </template>
                </el-table-column>
            </el-table>
             </el-row>
         </div>

        <el-dialog
            title="提交申诉"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form"  label-width="80px" size="mini">
                <el-form-item label="审批人" class="m-box">
                    <el-input  v-model="obj.tname" disabled ></el-input>
                </el-form-item>
                <el-form-item label="申诉理由" class="m-box">
                    <el-input  v-model="obj.text"  ></el-input>
                </el-form-item>
                 <el-form-item label="申诉图片" class="m-box">
                    <el-input  v-model="obj.pic"  ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addshensu">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
    data(){
        return {
            myBadList:[],
            dialogVisible:false,
            obj:{}
        }
    },
    computed:{
        ...mapState(['common'])  
    },
    methods:{
        ...mapActions(['getMyBadList']),
        opendialog(row){
            this.dialogVisible = true;
            this.obj = row;
        },
        addshensu(){
            this.$axios.post("/vue/addshensu",{
                _id:this.obj._id,
                text:this.obj.text,
                pic:this.obj.pic,
                step:1
            }).then(res=>{
                this.dialogVisible = false;
                this.$axios.post("/vue/getmybaylist").then(res=>{
                    this.myBadList = res.data.result;
                })
            })
        },
        handleClose(){
            this.dialogVisible = false;
        }
    },
    mounted(){
        // this.$axios.post("/vue/getmybaylist").then(res=>{
        //     this.myBadList = res.data.result;
        // })
        if(!this.common.myBadList.length>0){
            this.getMyBadList({url:"/vue/getmybaylist"});
        }
    }
}
</script>
