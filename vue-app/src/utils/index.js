


export const stu_router = [
    {
        path:"",
        name:"mine",
        text:"个人主页",
        icon:"el-icon-location"
    },
    {
        path:"",
        name:"weiji",
        text:"我的违纪",
        icon:"el-icon-menu"
    },
    {
        path:"",
        name:"shenqing",
        text:"我的申请",
        icon:"el-icon-document"
    },
    {
        path:"",
        name:"changeinfo",
        text:"修改信息",
        icon:"el-icon-setting"
    },
    {
        path:"",
        name:"vuex",
        text:"vuex课程",
        icon:"el-icon-setting"
    }
]



export const tea_router = [
    {
        path:"",
        name:"teamine",
        text:"我的主页",
        icon:"el-icon-menu"
    },
    {
        path:"",
        name:"stuweiji",
        text:"学生违纪",
        icon:"el-icon-s-flag"
    },
    {
        path:"",
        name:"banguanli",
        text:"班级管理",
        icon:"el-icon-s-comment"
    }
]

export const color_list = [
    {type:""},
    {type:"primary"},
    {type:"success"},
    {type:"info"},
    {type:"warning"},
    {type:"danger"}
]




// 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项
// 定义一个混入对象
// 定义全局的共有函数方法 
export var myMixin = {
    data(){
        return {
            msg:"千锋管理系统...1909",
            count:1000
        }
    },
    created: function () {
        
    },
    methods: {
      hello: function () {
        console.log('hello from mixin!')
      },
      add(){
          this.count += 10;
      }
    }
}

export const mx = {
    data(){
        return {
            banList:[]
        }
    },
    mounted(){
        this.$axios.get("/vue/getbanjilist").then(res=>{
            console.log(res);
            this.banList = res.data.result;
        })
    }
}