<template>
    <div>
        <h3>以下是你的个人信息</h3>
        <!-- <ul>
            <li v-for="(value,key,index) in stuInfo" :key="index"> 
                {{key}} : {{value}}
            </li>
        </ul> -->
        <ul>
            <li>
                姓名: {{stuInfo.username}}
            </li>
            <li>
                学号: {{stuInfo.sno}}
            </li>
                <li>
                班级: {{stuInfo.banji}}
            </li>
            <li>
                当前分数: {{stuInfo.score}}
            </li>
            <li>
                邮箱: {{stuInfo.email}}
            </li>
            <li>
                手机号: {{stuInfo.mobile}}
            </li>
                <li>
                身份: {{stuInfo.flag?'教师':'学生'}}
            </li>
                <li>
                备注: {{stuInfo.md}}
            </li>
                <li>
                姓名: {{stuInfo.username}}
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    data(){
        return {
            // stuInfo:{}
        }
    },
    computed:{
        ...mapState(['stuInfo'])
    },
    // mounted(){
    //     this.stuInfo = JSON.parse(sessionStorage.stuInfo);
    //     console.log(this.stuInfo);
    // }
}
</script>





