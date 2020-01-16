package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeProject2Go/enums"
	"AwesomeProject2Go/models/other"
	"AwesomeProject2Go/models"
	"net/http"
	"net"
	"github.com/astaxie/beego/orm"
	"net/smtp"
	"strings"
	"fmt"
)

type IndexController struct {
	beego.Controller
}

const (
	XForwardedFor = "X-Forwarded-For"
	XRealIP       = "X-Real-IP"
)

func (c *IndexController) Index() {

	//跳转页面及传递数据
	//c.Data["Website"] = "beego.me"
	//c.Data["Email"] = "astaxie@gmail.com"
	//设置token
	c.Data["_xsrf"] = c.XSRFToken()
	c.TplName = "amouse.html"

}

func (this *IndexController) IndexOperate() {

	var admins []models.Admin
	var ips []models.IPList
	o := orm.NewOrm()

	oType := this.GetString("type")

	if oType==""{
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}

	if oType=="getAdmin"{//获取管理员信息
		admin := new(models.Admin)
		admin.ReadAll(&admins)
		var backList []interface{}
		for _,v := range admins{
			backList = append(backList, v.ZanCount)
		}
		this.jsonResult(http.StatusOK,1, "success", backList)
	}else if oType=="getIPList"{//获取IP列表
		req := this.Ctx.Request
		addr := RemoteIp(req)
		ipList := new(models.IPList)
		ipList.GetByIp(addr,&ips)
		if len(ips)==0{
			o.Begin()
			for i:=0;i<4;i++{
				ipList := new(models.IPList)
				ipList.AdminId = i+1
				ipList.Ip = addr
				ipList.Isvalid = 0
				if !ipList.Insert(ipList,o){
					o.Rollback()
					this.jsonResult(http.StatusOK,-1, "add ip fail", nil)
				}
			}
			o.Commit()
		}
		this.jsonResult(http.StatusOK,1, "success", ips)
	}else if oType=="updateFabulou"{//更新点赞状态

		o.Begin()
		id,err := this.GetInt("id")
		isValid,err2 := this.GetInt("isValid")
		if err !=nil || err2 !=nil{
			this.jsonResult(http.StatusOK,-1, "数据错误", nil)
		}
		admin := new(models.Admin)
		admin.Id = id
		if isValid==1{//admin表zanCount+1否则-1
			if !admin.UpdateZanCount(admin,1,o){//更新admin表
				o.Rollback()
				this.jsonResult(http.StatusOK,-1, "update fail", nil)
			}
		}else{
			if !admin.UpdateZanCount(admin,-1,o){
				o.Rollback()
				this.jsonResult(http.StatusOK,-1, "update fail", nil)
			}
		}
		//更新iplist表
		ipList := new(models.IPList)
		req := this.Ctx.Request
		addr := RemoteIp(req)
		ipList.AdminId=id
		ipList.Ip =addr
		if !ipList.UpdateValid(ipList,isValid,o){
			o.Rollback()
			this.jsonResult(http.StatusOK,-1, "update fail", nil)
		}
		o.Commit()
		this.jsonResult(http.StatusOK,1, "update success", nil)

	}else if oType=="addDemand"{//新增需求

		name := this.GetString("name")
		phone := this.GetString("phone")
		mail := this.GetString("mail")
		demandTxt := this.GetString("demand")
		demand := new(models.DemandSYS)
		demand.Name = name
		demand.Phone = phone
		demand.Mail = mail
		demand.Demand = demandTxt
		if !demand.Insert(demand){
			this.jsonResult(http.StatusOK,-1, "add fail", nil)
		}
		go SendMail(name,phone,mail,demandTxt)
		this.jsonResult(http.StatusOK,1, "add success", nil)
	}

}

func (this *IndexController) InterestOperate() {
	page := this.Ctx.Input.Param(":page")
	if page=="survey"{
		this.Data["_xsrf"] = this.XSRFToken()
		this.TplName = "interesting/investigate.html"
	}
	this.TplName = "interesting/"+page+".html"

}

func(this *IndexController) Survey()  {

	mail := this.GetString("mail")
	if mail==""{
		this.jsonResult(http.StatusOK,-1,"邮箱地址不能为空！",nil)
	}

	survey := new(models.SurveySYS)
	survey.Mail = mail
	demand := this.GetString("demand")
	survey.Demand = demand
	survey.Survey01 = this.GetString("survey01")
	survey.Survey02 = this.GetString("survey02")
	survey.Survey03 = this.GetString("survey03")
	survey.Survey04,_ = this.GetInt("survey04")
	survey.Survey05,_ = this.GetInt("survey05")
	survey.Survey06,_ = this.GetInt("survey06")
	survey.Survey07,_ = this.GetInt("survey07")
	survey.Survey08,_ = this.GetInt("survey08")
	survey.Survey09,_ = this.GetInt("survey09")
	survey.Survey10,_ = this.GetInt("survey10")
	survey.Survey11,_ = this.GetInt("survey11")
	survey.Survey12,_ = this.GetInt("survey12")
	survey.Survey13,_ = this.GetInt("survey13")
	survey.Survey14,_ = this.GetInt("survey14")
	survey.Survey15,_ = this.GetInt("survey15")
	survey.Survey16,_ = this.GetInt("survey16")
	survey.Survey17,_ = this.GetInt("survey17")
	survey.Survey18,_ = this.GetInt("survey18")
	survey.Survey19,_ = this.GetInt("survey19")
	survey.Ip = RemoteIp(this.Ctx.Request)
	if !survey.Insert(survey){
		this.jsonResult(http.StatusOK,-1,"提交失败",nil)
	}
	go SendMail4Survey(mail,demand)
	this.jsonResult(http.StatusOK,1,"提交成功",survey.Count()+1024)

}

// RemoteIp 返回远程客户端的 IP，如 192.168.1.1
func RemoteIp(req *http.Request) string {
	remoteAddr := req.RemoteAddr
	if ip := req.Header.Get(XRealIP); ip != "" {
		remoteAddr = ip
	} else if ip = req.Header.Get(XForwardedFor); ip != "" {
		remoteAddr = ip
	} else {
		remoteAddr, _, _ = net.SplitHostPort(remoteAddr)
	}

	if remoteAddr == "::1" {
		remoteAddr = "127.0.0.1"
	}
	return remoteAddr
}

func (c *IndexController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}

func SendMail(name,phone,mail,demand string)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "ZooORI.才华有限公司"
	user := "zooori@foxmail.com"
	subject := "客户需求-邮箱反馈"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【客户姓名】："+name+"\n【联系方式】："+phone+"\n【邮箱地址】："+mail+"\n【用户需求】："+demand
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}

	if mail!=""{
		to[0] = mail
		body = "您的需求我们已收到，将尽快与您联系:)"
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	}
}


func SendMail4Survey(mail,demand string)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "ZooORI.才华有限公司"
	user := "zooori@foxmail.com"
	subject := "用户操作-不成熟调查"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【邮箱地址】："+mail+"\n【用户需求】："+demand
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}

	if mail!=""{
		to[0] = mail
		body = "感谢您参与我们的不成熟调查:)"
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	}
}

