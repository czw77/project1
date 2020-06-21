<template>
    <div>
        <h2 class="title">vuex 案例 === {{count}} </h2>
        <div class="section">
            <h1 @click="count1++">count=== {{count5}}  --- {{count4}} --- {{count3}} 、、 {{newCount}} </h1>
            <h2> city === {{city1}}  --- {{city2}} --- {{city}}</h2>
            <h2> msg === {{msg1}}  / {{msg}} </h2>
            <h2> word === {{word1}}  / {{word}}</h2>
            <h2>number == {{data.number}}</h2>

            <hr>
            <p>
                <el-button type="primary" @click="add">count add </el-button>
                <el-button type="info" @click="desc">count desc </el-button>
                <el-button type="danger" @click="increment(50)">count add 50  </el-button>
                <el-button type="warning" @click="decrement(80)">count desc 80  </el-button>
                <el-button type="warning" @click="changeCity('美丽可爱的大深圳....')">最想去哪个城市???  </el-button>
                <el-button type="success" @click="changeWord('天道酬勤--1909')">改变 word action  </el-button>
                <el-button type="success" @click="changeWordAsync">改变 word async   </el-button>
                <el-button type="info" @click="getMvAsync({url:'/vue/movie',params:{limit:10},cb(){}})">获取电影数据    </el-button>
                <el-button type="danger" @click="changeNum(50)">number + 10    </el-button>
            </p>
            <p :style="{width:'180px'}">
                <input type="text" placeholder="修改msg" @input="getMsg" />
                <input type="text" placeholder="v-model && vuex"  v-model="keyword" />
                {{keyword}}
            </p>

            <p v-for="(m,i) in mv" :key="i">
                {{m.title}} -- {{m.year}}
            </p>
            <hr>
            <!-- <p v-for="(item,k) in newMv" :key="k">
                {{item.title}} -- {{item.year}}
            </p> -->
        </div>

    </div>

</template>

<script>
import store from "@/store";
import {CHANGEWORD} from "@/store/mutation";
import {mapState,mapGetters,mapActions,mapMutations} from "vuex";

export default {
    data(){    
        return {
            count1:this.$store.state.count,
            count2:store.state.count,
            city1:this.$store.state.city,
        }
    },
    computed:{
        keyword:{
            get(){
                return this.$store.state.keyword;
            },
            set(val){
                console.log(val); 
                // this.getKeyword(val);
                this.$store.commit("getKeyword",val);
            }
        },
        ...mapState({
            count3:state=>state.count,
            count4:'count' ,  //  `state => state.count`
            count5(state){
                return state.count + 1000
            },
            city2:state=>state.city,
            msg1:state=>state.msg,
            word1:'word'
        }),
        ...mapState([
            // 'keyword',
            'count',  // count:'count'
            'city',
            'msg',
            'word',
            'mv',
            'data'
        ]),
        ...mapGetters(['newCount','newMv']),
        // count3(){    // get 
        //     return this.$store.state.count
        // },
        // city2(){
        //     return this.$store.state.city
        // },
        // msg1(){
        //     return this.$store.state.msg
        // },
        // word1(){
        //     return this.$store.state.word
        // },
        // newCount(){
        //     return this.$store.getters.newCount
        // },
        // mv:{
        //     get(){
        //         return this.$store.state.mv
        //     },
        //     set(val){

        //     }
        // },
        // data(){
        //     return this.$store.state.data;
        // }
    },
    methods:{
        ...mapMutations({
            add:'countadd',  // this.add = this.$store.commit("countadd");
            desc:'countdesc', // this.desc = this.$store.commit("countdesc")
        }),
        ...mapMutations([
            'increment',   // this.increment = this.$store.commit("increment");
            'decrement',
            'changeCity',
            'getKeyword',
            'changeMsg',  // this.changeMsg = this.$store.commit("changeMsg",e.target.value)
        ]),
        // add(){
        //     this.$store.commit("countadd"); // 提交 mutations 
        // },
        // desc(){
        //     this.$store.commit("countdesc");
        // },
        // increment(){
        //     this.$store.commit("increment",50)
        // },
        // decrement(n){
        //     this.$store.commit("decrement",n);
        // },
        // changeCity(city){
        //     this.$store.commit("changeCity",city);
        // },
        getMsg(e){
            // console.log(e.target.value);
            // this.$store.commit("changeMsg",e.target.value)
            this.changeMsg(e.target.value);
        },
        ...mapActions([
            'changeWord', // this.changeWord =  this.$store.dispatch('changeWord','Are  you OK????');
            'changeWordAsync',
            'getMvAsync',
            'changeNum',
        ]),
        // changeWord(){
        //     this.$store.dispatch('changeWord','Are  you OK????'); // store 派发 发送  action 
        // },
        // changeWordAsync(){
        //     this.$store.dispatch('changeWordAsync')
        // },
        // getMvAsync(){
        //     this.$store.dispatch("getMvAsync",{
        //         url:"/vue/movie",
        //         params:{
        //             limit:6
        //         },
        //         cb(){
        //             console.log("电影数据请求成功...")
        //         }
        //     })
        // },
        // changeNum(){
        //     this.$store.dispatch("changeNum",10);
        // }
    },
    mounted(){
        console.log(this.$store);
    }
}
</script>
