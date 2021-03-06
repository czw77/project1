


var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var student_schema  = new Schema({
    mobile:Number,
    username:String,
    password:String,
    dbpwd:String,
    sno:Number,  // 学生编号 序号 
    bno:Number,  // 学生班级编号  
    flag:Boolean,
    banji:String,  // 
    btext:String,
    email:String,  
    md:String,
    score:Number,
    badList:Array,
    pic:String, // 头像
})

exports.Student = mongoose.model("student",student_schema);

var weiji_schema  = new Schema({
    id:Number,
    sno:Number,
    sname:String,
    tno:Number,
    tname:String,
    reason:Object,
    time:Date,
    md:String,
    shen:Object,
    shentext:String,
    step:Number,
})

exports.Weiji = mongoose.model("weiji",weiji_schema);

var shensu_schema  = new Schema({
    id:Number,
    stuno:Number,
    stuname:String,
    teano:Number,
    teaname:String,
    shen:Object,
    liyou:Object,
    title:String,
    content:String
})

exports.Shensu = mongoose.model("shensu",shensu_schema);



var uid_schema  = new Schema({
    name:String,
    id:Number
})

exports.Uid = mongoose.model("uid",uid_schema)


var teacher_schema  = new Schema({
    mobile:Number,
    username:String,
    password:String,
    dbpwd:String,
    sno:Number,
    current_bj:String,
    flag:Boolean,
    pic:String, // 头像
})

exports.Teacher = mongoose.model("teacher",teacher_schema);

var banji_schema = new Schema({
    banji_text:String,
    banji_code:String
})

exports.Banji = mongoose.model("banji",banji_schema);

// 当前教师的班级列表 
var tlist_schema = new Schema({
    id:Number,
    tno:Number,
    tname:String,
    bcode:String,
    btext:String,
    tbanji:Array
})

exports.Tlist = mongoose.model("tlist",tlist_schema);

var stuinfo_schema = new Schema({
    stuno:Number,
    stuname:String,
    stumobile:Number,
    stubanjicode:String,
    stubanjitext:String,
    stuscore:Number,
});

exports.Stuinfo = mongoose.model("stuinfo",stuinfo_schema);


var reason_schema = new Schema({
    reason:String,
    count:Number,
    type:String
});

exports.Reason = mongoose.model("reason",reason_schema);




var movie_schema = new Schema({
    rating:Object,
    genres:Array,
    title:String,
    year:String,
    images:Object,
    id:String
});

exports.Movie = mongoose.model("movie",movie_schema);

