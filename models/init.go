package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

//初始化
func init() {
	orm.RegisterModel(new(User),new(Admin),new(DemandSYS),new(IPList),new(SurveySYS),new(LoginLog))
}

//下面是统一的表名管理
func TableName(name string) string {
	prefix := beego.AppConfig.String("db_dt_prefix")
	return prefix + name
}

//获取 User 对应的表名称
func UserTBName() string {
	return TableName("user")
}

//获取 Admin 对应的表名称
func AdminTBName() string {
	return TableName("admin")
}

//获取 DemandSYS 对应的表名称
func DemandSYSTBName() string {
	return TableName("demand_sys")
}

//获取 IPList 对应的表名称
func IPListTBName() string {
	return TableName("ip_list")
}

//获取 SurveySYS 对应的表名称
func SurveySYSTBName() string {
	return TableName("survey_sys")
}

//获取 LoginLog 对应的表名称
func LoginLogTBName() string {
	return TableName("login_log")
}

