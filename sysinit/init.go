package sysinit

import (
	"AwesomeProject2Go/utils"
)

type Init struct {}

func init()  {

	//启用Session
	//beego.BConfig.WebConfig.Session.SessionOn = true
	utils.InitSession()
	//初始化日志
	utils.InitLogs()
	//初始化缓存
	utils.InitCache()
	//初始化数据库
	InitDatabase()
}

