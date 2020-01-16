package main

import (
	_ "AwesomeProject2Go/routers"
	"github.com/astaxie/beego"
	_"AwesomeProject2Go/sysinit"
	"github.com/astaxie/beego/context"
	"AwesomeProject2Go/utils"
)



func init()  {

	//beego.BeeLogger.DelLogger("console")//禁止日志输出到控制台

	//session 是否开启，默认是 false。
	/*beego.BConfig.WebConfig.Session.SessionOn = true
	//session 过期时间，默认值是 3600 秒。
	beego.BConfig.WebConfig.Session.SessionGCMaxLifetime = 3600
	//session 默认存在客户端的 cookie 的时间，默认值是 3600 秒。
	beego.BConfig.WebConfig.Session.SessionCookieLifeTime = 3600*/

	//是否开启 XSRF，默认为 false，不开启  防跨站
	beego.BConfig.WebConfig.EnableXSRF = true
	beego.BConfig.WebConfig.XSRFExpire = 3600  //过期时间，默认1小时
	beego.BConfig.WebConfig.XSRFKey = "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o"
	//是否开启热升级，默认是 false，关闭热升级。
	beego.BConfig.Listen.Graceful=false
	beego.SetStaticPath("/file", "./file")

	//判断用户是否登录
	var FilterUser = func(ctx *context.Context) {
		session,_ := utils.GlobalSessions.SessionStart(ctx.ResponseWriter, ctx.Request)
		_, ok := session.Get("id").(int)
		//fmt.Println("-------id:",id)
		if !ok {
			ctx.Redirect(302, "/timeout")
		}
	}
	beego.InsertFilter("/user/*",beego.BeforeRouter,FilterUser,false)

}

func main() {
	beego.Run()
}







