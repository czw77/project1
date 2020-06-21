
// vue 配置文件 修改必须重启 
module.exports = {
    publicPath:"",
    devServer:{
        host:"0.0.0.0",
        port:4200,
        open:true,  // 自动打开浏览器
        proxy:{    //  代理    不能axios 基路径共存 
            "/vue": {
                target:"http://localhost:1909",
                changeOrigin: true,
            },
            "/avatar": {
                target:"http://localhost:1909",
                changeOrigin: true,
            },
            "/gateway": {
                target:"https://m.maizuo.com",
                changeOrigin: true,
            },
           
        }  
    }
}