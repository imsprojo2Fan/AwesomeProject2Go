package routers

import (
	"AwesomeProject2Go/controllers"
	"github.com/astaxie/beego"
	"net/http"
	"html/template"
)

func init() {

	beego.ErrorHandler("403",page_403)
	beego.Router("/", &controllers.IndexController{},"*:Index")
	beego.Router("/index", &controllers.IndexController{},"POST:IndexOperate")
	beego.Router("/index/operate", &controllers.IndexController{},"GET:InterestOperate")
	beego.Router("/index/survey", &controllers.IndexController{},"POST:Survey")
	beego.Router("/login", &controllers.LoginController{},"*:LoginIndex")
	beego.Router("/timeout", &controllers.LoginController{},"*:Timeout")
	beego.Router("/login/operate", &controllers.LoginController{},"POST:LoginOperate")
	beego.Router("/login/operate", &controllers.LoginController{},"GET:Operate")
    beego.Router("/user",&controllers.UserController{},"GET:Main")
	beego.Router("/user/redirect",&controllers.UserController{},"*:Redirect")
	beego.Router("/user/loginlog",&controllers.LoginLogController{},"*:OperateType")
	beego.Router("/user/userInfo",&controllers.UserController{},"POST:UserOperate")
	beego.Router("/service", &controllers.ServiceController{},"*:Redirect")
	beego.Router("/wechat/token", &controllers.WechatController{},"*:Token")

	//定制错误页
	beego.ErrorController(&controllers.ErrorController{})

}

func page_403(rw http.ResponseWriter, r *http.Request){
	t,_:= template.New("403.html").ParseFiles(beego.BConfig.WebConfig.ViewsPath+"tip/403.html")
	data :=make(map[string]interface{})
	data["content"] = "page not found"
	t.Execute(rw, data)
}

