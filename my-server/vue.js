

var express = require("express");
var router = express.Router();



const {Movie,Uid,Teacher,Student,Banji,Tlist,Reason,Weiji} = require("./utils/schema")
const {aesEncrypt,keys}  = require("./utils");
const axios  = require('axios');


router.get("/index",(req,res)=>{
    res.json({
        msg:"这是 vue 项目 后台接口文件",
        body:null,
        code:200
    })
})

router.post("/submit",(req,res)=>{
    res.json({
        msg:"这是一个POST 请求接口",
        body:req.body
    })
})

router.get("/movie",(req,res)=>{
    var limit = req.query.limit * 1 || 0;
    Movie.find({},{}).sort({_id:-1}).limit(limit)
    .then(result=>{
        res.json({
            result,
            code:200,
            msg:"电影数据获取成功"
        })
    })
})


router.post("/zhuce",(req,res)=>{
    var body = req.body;
    console.log(body);

    var flag =  !!body.type;

    flag?insertData(Teacher,"teacher"):insertData(Student,"student");

    function insertData(coll,collName){
        coll.findOne({
            mobile:body.mobile * 1,
        }).then(result=>{
            if(result){
                res.json({
                    msg:"账号或者手机号已经被注册,请重新注册",
                    code:200,
                    flag:0, 
                    result:"注册失败"
                })
            }else{
                // 插入 
                Uid.updateOne({
                    name:collName
                },{
                    $inc:{
                        id:1
                    }
                }).then(result=>{
                    Uid.findOne({
                        name:collName
                    }).then(result=>{
                        body.sno = result.id;
                        body.flag = flag;
                        coll.insertMany(body).then(result=>{
                            res.json({
                                msg:"注册成功...",
                                code:200,
                                flag:1,
                                result:""
                            })
                        })
                    })
                })
            }
        })
    }
})


// 登录

router.post("/login",(req,res)=>{
    var body = req.body;
    console.log(body);
    var flag = !!body.type;
    flag?findData(Teacher):findData(Student);

    function findData(coll){
        coll.findOne({
            mobile:body.mobile* 1
        }).then(result=>{
            if(result){
                if(result.password == body.password){

                    req.session.mobile = result.mobile;
                    req.session.username = result.username;
                    req.session.flag = result.flag;  
                    req.session.token = aesEncrypt(body.mobile+new Date().getTime(),keys);
                    req.session.sno = result.sno;

                    res.json({
                        msg:"验证通过,登录成功",
                        code:200,
                        flag:1,
                        result,
                        token:req.session.token
                    });

                }else{
                    res.json({
                        msg:"账号或者密码错误,请重新登录",
                        code:200,
                        flag:0
                    })
                }
            }else{
                res.json({
                    msg:"账号不存在,请重新登录",
                    code:200,
                    flag:0
                })
            }
        })
    }
  
})



// 学生接口


// 根据学生 mobile 获取 所有信息 
router.get("/stugetinfo",(req,res)=>{
    // var  mobile = req.query.mobile * 1 ;
    console.log(req.headers);
    Student.findOne({
        mobile : req.session.mobile
    }).then(result=>{
        res.json({
            msg:"获取学生基本信息成功",
            result,
            code:200
        })
    })
})

// 修改密码
router.post("/stuchangepwd",(req,res)=>{
    var body = req.body ;
    console.log(body);

    Student.findOne({
        sno:body.sno
    }).then(result=>{
        if(result){
            console.log(result);
            if(result.password == body.oldValue){
                Student.updateOne({
                    sno:body.sno
                },{
                    $set:{
                        password:body.newValue
                    }
                }).then(result=>{
                    res.json({
                        code:200,
                        msg:"密码修改成功...",
                        flag:1
                    })
                })
            }else{
                res.json({
                    code:200,
                    msg:"原始密码错误",
                    flag:0
                })
            }

        }else{
            res.json({
                code:200,
                msg:"数据未查询到",
                flag:0
            })
        }
    })
})


// 获取班级列表 
router.get("/banjilist",(req,res)=>{
    Banji.find({},{}).then(result=>{
        res.json({
            code:200,
            msg:"获取班级列表成功",
            result
        })
    })
})


// 修改学生个人信息  添加 班级  和分数 
router.post("/changestuinfo",(req,res)=>{
    var body = req.body;
    console.log(body);
    
    Banji.findOne({
        banji_code:body.banji
    }).then(data=>{
        Student.updateOne({
            mobile:req.session.mobile,
            sno:req.session.sno
        },{
            $set:{
                banji:body.banji,  // 
                btext:data.banji_text,
                email:body.email,  
                md:body.md,
                score:100
            }
        }).then(result=>{
            console.log(result);
            res.json({
                code:200,
                result,
                msg:"修改学生个人信息成功",
                flag:1
            })
        })
    })
})

// 获取卖座电影的数据接口   error 
router.get("/maizuo/list",(req,res)=>{
    axios({
        url:"https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=7350733",
        method:"GET",
        headers:{
            "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"15725877173487513444945"}',
            "X-Host": "mall.film-ticket.film.list"
        }
    }).then(result=>{
        console.log(result);
        res.json({
            code:200,
            msg:"获取卖座电影的数据成功",
            result
        })
    })
})




// 根据 班级 code 获取所有的学员信息
router.get("/getstulist",(req,res)=>{
    var banjicode = req.query.banji;
    var keyword = req.query.keyword;
    var obj = {};
    if(keyword){
        obj={
            banji:banjicode,
            username:new RegExp(keyword)
        }
    }else{
        obj = {banji:banjicode};
    }
    Student.find(obj).then(result=>{
        res.json({
            code:200,
            msg:"获取当前班级学员信息成功",
            result
        })
    })
})


// 教师接口
router.get("/teacher/getinfo",(req,res)=>{
    var  sno = req.query.sno * 1 ;
    Teacher.findOne({
        sno : sno 
    }).then(result=>{
        res.json({
            msg:"获取教师基本信息成功",
            result,
            code:200
        })
    })
})


// 根据教师 sno 获取 当前的班级列表 
router.get("/getbanjilist",(req,res)=>{
    var sno = req.query.sno * 1;
    Tlist.find({tno:req.session.sno}).sort({bcode:1}).then(result=>{
        res.json({
            code:200,
            result,
            msg:"获取教师班级列表成功"
        })
    })
})


// 根据讲师 sno 添加 班级列表 
router.get("/addteabanji",(req,res)=>{
    var sno = req.query.sno * 1;
    var bcode = req.query.bcode;
    Banji.findOne({
        banji_code:bcode
    }).then(data=>{
        Tlist.findOne({
            tno:sno,
            bcode
        }).then(result=>{
            if(result){
                res.json({
                    msg:"班级已经添加,请勿重复操作",
                    code:200
                })
            }else{
                Tlist.insertMany({
                    tno:sno,
                    bcode:data.banji_code,
                    btext:data.banji_text,
                    tname:req.query.tname
                }).then(result=>{
                    Tlist.find({
                        tno:sno
                    }).sort({bcode:1}).then(result=>{
                        res.json({
                            msg:"班级添加成功",
                            code:200,
                            result
                        })
                    })
                })
            }
        })
    })
})

// 删除  根据_id 
router.get("/delteabanji",(req,res)=>{
    var _id = req.query._id;
    Tlist.deleteOne({
        _id:_id
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"删除班级信息成功...",
            flag:1
        })
    })
})


// 获取违纪分类
router.get("/getwejitype",(req,res)=>{
    Reason.find().then(result=>{
        res.json({
            msg:"获取违纪分类成功.",
            code:200,
            result
        })
    })
})

// 添加学员违纪 
router.post("/addstudweiji",(req,res)=>{
    var body = req.body;
    console.log('添加违纪');
    Teacher.findOne({
        sno:req.session.sno
    }).then(tea=>{
        Reason.findOne({
            type:body.type
        }).then(result=>{
            Student.updateOne({
                sno:body.stu_no * 1,
            },{
                $inc:{
                    score:-result.count
                }
            }).then(stu=>{
                Weiji.insertMany({
                    sno:body.stu_no,
                    sname:body.stu_name,
                    tno:tea.sno,
                    tname:tea.username,
                    reason:result,
                    time:body.time,
                    md:body.md
                }).then(last=>{
                    res.json({
                        code:200,
                        msg:"违纪添加成功",
                        result
                    });
                })
            })
        })
    })
})


router.get("/onestubadlist",(req,res)=>{
    console.log(req.query);
    Weiji.find({
        sno:req.query.sno * 1
    }).then(result=>{
        res.json({
            code:200,
            msg:"获取当前学生违纪列表成功",
            result
        })
    })
})

router.post("/getmybaylist",(req,res)=>{
    Weiji.find({
        sno:req.session.sno 
    }).then(result=>{
        res.json({
            code:200,
            msg:"获取我违纪列表成功",
            result
        })
    })
})


router.post("/addshensu",(req,res)=>{
    var body = req.body;
    Weiji.updateOne({
        _id:body._id
    },{
        $set:{
            step:body.step,
            shentext:body.text
        }
    }).then(result=>{

        res.json({
            code:200,
            msg:"提交申请成功,等待审批",
            result
        })
    })
})

// 获取 当前班级的 违纪学员
router.get("/getbadstulist",(req,res)=>{
    var keyword = req.query.keyword;
    var obj = {};
    if(keyword){
        obj={
            tno:req.session.sno,
            sname:new RegExp(keyword)
        }
    }else{
        obj = {tno:req.session.sno};
    }
    Weiji.find(obj).then(result=>{
        res.json({
            code:200,
            msg:"获取当前讲师违纪学员成功",
            result
        })
    })
})

// 处理当前学生的申诉

router.post("/checkstushensu",(req,res)=>{
    var body = req.body;
    console.log(body);
    Weiji.updateOne({
        _id:body._id
    },{
        $set:{
            step:body.step,
            md:body.md
        }
    }).then(result=>{
        Student.updateOne({
            sno:body.sno,
        },{
            $inc:{
                score:body.flag?body.count:0
            }
        }).then(result=>{
            res.json({
                code:200,
                msg:"违纪学员审批成功",
                result
            })
        })
        
    })
})





// 上上传头像  
var multer = require("multer");
var storage = multer.diskStorage({   // 操作硬盘 
    destination: function (req, file, cb) {
      cb(null, './public/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'wh1909'+file.originalname); // 123412123231221wh19092.jpg
    }
});

// 创建上传对象   
var upload = multer({ storage: storage }).any();

router.post("/uploadpic",upload,(req,res)=>{

    var path = req.files[0].path;
    req.query.flag == "true" ? update(Teacher) : update(Student);
    console.log(req.files)
    function update(coll){
        coll.updateOne({
            sno:req.session.sno
        },{
            $set:{
                pic:path
            }
        }).then(result=>{
            res.json({
                msg:"头像上传成功...",
                pic:path,
                result,
            })
        })
    }
})

// 获取头像
router.post("/getavatar",(req,res)=>{
    var body = req.body; 

    body.flag ? findSome(Teacher) : findSome(Student)
    function findSome(coll){
        coll.findOne({
            sno:req.session.sno
        }).then(result=>{
            if(result.pic){
                res.json({
                    code:200,
                    msg:"获取头像成功",
                    result,
                    flag:1
                })
            }else{
                res.json({
                    code:200,
                    msg:"获取头像失败",
                    flag:0
                })
            }
        })
    }
})






module.exports = router;