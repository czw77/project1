

//  vuex代码 

import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);    // 显示声明

// 每一个 Vuex 应用的核心就是 store（仓库）  
// store 容器   包含着你的应用中大部分的状态 (state)   this.$store.state  store.state 
// Vuex 的状态存储是响应式的 
// 你不能直接改变 store 中的状态(state)  改变 store 中的状态的唯一途径就是显式地提交 (commit)  mutations 

// vuex 所有的逻辑通过 store 实现 

import {http} from "@/utils/axios";
import {CHANGEWORD,CHANGEMVASYNC,changeNum} from "./mutation";

const common = {
    state:{
        banList:[],
        name:"共有数据",
        myBadList:[],
        stuList:[]
    },
    mutations:{
        getBanList(state,banList){
            state.banList = banList;
        },
        getMyBadList(state,myBadList){
            state.myBadList = myBadList;
        },
        getStuList(state,stuList){
            state.stuList = stuList;
        }
    },
    actions:{
        getBanList({commit},{url}){
            http.get(url).then(res=>{
                commit("getBanList",res.data.result);
            })
        },
        getMyBadList({commit},{url}){
            http.post(url).then(res=>{
                commit("getMyBadList",res.data.result);
            })
        },
        getStuList({commit},{url,params}){
            http.get(url,{params}).then(res=>{
                commit("getStuList",res.data.result);
            })
        }
    },
    getters:{
        myBadListNew(state){
            return state.myBadList.filter(item=>item.step);
        }
    }
}

const store =  new Vuex.Store({
    modules:{
        common:common
    },
    state:{      // 单一状态树   一个对象就包含了全部的应用层级状态
        count:1909,
        city:"大武汉",
        msg:"所有组件共享的数据保存store的state里面",
        word:"wh1909-daydayup!",
        mv:[],
        data:{
            number:1000
        },
        stuInfo:{},
        keyword:"wh1909"
    },
    actions:{   
        // Action 提交的是 mutation，而不是直接变更状态
        // Action 可以包含任意异步操作。  
        // 没有异步操作  可以不用action 
        changeWord(context,word){  //context.commit   
            context.commit(CHANGEWORD,word);    // this.$store.commit 
        },
        changeWordAsync({commit:commit}){  //  context = {commit:function(){}} = {commit:commit}
            http.get("/vue/index").then(res=>{
                commit("changeWordAsync",res.data.msg)
            })
        },
        getMvAsync({commit},{url,params,cb}){
            http.get(url,{params}).then(
                res=>{
                    
                    cb(res);
                    commit(CHANGEMVASYNC,res.data.result);
                }
            )
        },
        changeNum({commit},num){
            commit(changeNum,num);
        },
        getStuInfo({commit},{url}){
            http.get(url).then(res=>{
                commit("getStuInfo",res.data.result)
            })
        }   
    },
    mutations:{ // 改变 store 中的状态的唯一途径就是显式地提交 (commit)mutations
        // Mutation 需遵守 Vue 的响应规则  新对象替换老对象
        countadd(state){    // state = store.state   commit 
            state.count++;
        },
        countdesc(state){
            state.count--;
        },
        increment(state,payload){  // payload 参数
            state.count+=payload;
        },
        decrement(state,num){
            state.count -=num;
        },
        changeCity(state,city){
            state.city = city;
        },
        changeMsg(state,msg){
            state.msg = msg;
        },
        [CHANGEWORD](state,word){
            state.word  = word;
        },
        changeWordAsync(state,word){
            state.word = word
        },
        [CHANGEMVASYNC](state,mv){
            state.mv = mv;
        },
        [changeNum](state,num){
            // ... 展开运算  
            // Vue
            // Vue.set(state.data,'number',state.data.number+num);
            state.data = {...state.data,...{number:state.data.number+num}}; // 返回一个新的 对象 
        },
        getStuInfo(state,stuInfo){
            state.stuInfo = {...state.stuInfo,...stuInfo};
        },
        getKeyword(state,keyword){
            state.keyword = keyword;
        }
    },
    getters:{  // 对 state 的数据进行 派生 优化  返回新的state
        newCount(state){
            return state.count + 2000;
        },
        newMv(state){
            return state.mv.filter((item,index)=>index%2==0);
        }
    }
    
})

export default  store;
