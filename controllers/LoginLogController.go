package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeProject2Go/models/other"
	"AwesomeProject2Go/enums"
	"AwesomeProject2Go/utils"
	"AwesomeProject2Go/models"
	"net/http"
)

type LoginLogController struct {
	beego.Controller
}

func(this *LoginLogController)OperateType()  {

	oType := this.GetString("type")
	if oType==""{
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	this.Data["_xsrf"] = this.XSRFToken()
	user := session.Get("user").(*models.User)
	if oType=="listByPage"{
		ListByPage(this,user)
	}


}

func ListByPage(this *LoginLogController,user *models.User)  {

	pageSize,err := this.GetInt64("rows")
	pageNow,err2 := this.GetInt64("page")

	if err!=nil || err2!=nil{
		this.jsonResult(http.StatusOK,-1, "rows or page should be number", nil)
	}
	var SortCol string
	var SortType string
	sortCol := this.GetString("sidx")
	sortType := this.GetString("sord")
	if sortType =="asc"{
		SortType = "ASC"
	}else if sortType=="desc"{
		SortType = "DESC"
	}else{
		SortType = ""
	}
	if sortCol=="CreateTime"{
		SortCol = "create_time"
	}else{
		SortCol = ""
	}

	pageNow = (pageNow-1)*pageSize

	login := new(models.LoginLog)
	var logins []models.LoginLog

	//获取总记录数
	records := login.Count(user.Uid)
	total :=(records + pageSize-1) / pageSize;
	login.ReadByPage(user.Uid,pageNow,pageSize,SortCol,SortType,&logins)

	this.jsonDataResult(http.StatusOK,total,records,logins)

}

func (c *LoginLogController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}

func (c *LoginLogController) jsonDataResult(status enums.JsonResultCode,total int64, records int64, rows interface{}) {
	r := &other.JsonDataResult{status,total, records, rows}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}
