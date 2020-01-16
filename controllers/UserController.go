package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeProject2Go/models/other"
	"AwesomeProject2Go/enums"
	"AwesomeProject2Go/utils"
	"AwesomeProject2Go/models"
	"net/http"
	"net/smtp"
	"strings"
	"strconv"
	"time"
)

type UserController struct {
	beego.Controller
}

func(this *UserController)Main()  {

	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	this.Data["_xsrf"] = this.XSRFToken()
	user := session.Get("user").(*models.User)
	name := user.Name
	if name ==""{
		name = "Guest"
	}
	this.Data["name"] = name

	//获取最近三条登录登出数据
	login := new(models.LoginLog)
	var logins []models.LoginLog
	login.ReadById(user.Uid,&logins)
	this.Data["logins"] = logins
	this.TplName = "main/main.html"

}

func(this *UserController)Redirect()  {

	oType := this.GetString("type")
	if oType=="" {
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	this.Data["_xsrf"] = this.XSRFToken()
	if oType=="index"{
		this.TplName = "main/amouse.html"
	}
	if oType=="loginLog"{
		this.TplName = "main/loginLog.html"
	}
	if oType=="personalInfo"{
		this.Data["user"] = session.Get("user")
		this.TplName = "main/personalInfo.html"
	}
	if oType=="timeLine"{
		this.Data["user"] = session.Get("user")
		this.TplName = "main/timeLine.html"
	}
}

func(this *UserController)UserOperate()  {

	oType := this.GetString("type")
	if oType=="" {
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}
	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	sUser := session.Get("user").(*models.User)
	this.Data["_xsrf"] = this.XSRFToken()
	if oType=="validate"{//验证账号是否已被使用
		if this.GetString("account")==""{
			this.jsonResult(http.StatusOK,-1, "Parameter Error", nil)
		}
		user := new(models.User)
		user.Account = this.GetString("account")
		user.Read(user)
		if user.Id>0{
			this.jsonResult(http.StatusOK,-1,"账号已存在",nil)
		}else{
			this.jsonResult(http.StatusOK,1,"账号可使用",nil)
		}
	}else if oType=="updateInfo"{//更新用户信息
			account := this.GetString("account")
			if sUser.Account==""{
				sUser.Account = account
			}
			sUser.Name = this.GetString("name")
			gender,err := this.GetInt("gender")
			if err!=nil{
				this.jsonResult(http.StatusOK,-1,"Parameter Error",nil)
			}
			sUser.Gender = gender
			password := this.GetString("password")
			if sUser.Password!=password{
				sUser.Password = utils.String2md5(password)
			}
			sUser.Birthday = this.GetString("birthday")
			year,_ := this.GetInt("year")
			nYear:=time.Now().Year()
			sUser.Age = nYear-year
			sUser.City = this.GetString("city")
			sUser.Address = this.GetString("address")
			sUser.Signature = this.GetString("signature")
			sUser.Phone = this.GetString("phone")
			if !sUser.Update(sUser){
				this.jsonResult(http.StatusOK,-1,"更新信息失败！",nil)
			}else{
				this.jsonResult(http.StatusOK,1,"更新信息成功！",nil)
			}

	}else if oType=="mailCode"{//发送邮箱验证码
		mail := this.GetString("mail")
		if mail==""{
			this.jsonResult(http.StatusOK,-1,"邮箱地址不能为空！",nil)
		}
		//查询邮箱是否已存在
		user := new(models.User)
		user.Mail = mail
		user.ReadByMail(user)
		if user.Id>0{
			this.jsonResult(http.StatusOK,-1,"邮箱已被绑定！",nil)
		}
		code := utils.RandomNumber()
		go SendMail4MailCode(mail,code)
		session.Set("mail",mail)
		session.Set("mailCode",code)
		this.jsonResult(http.StatusOK,1,"验证码已发送！",nil)
	}else if oType=="updateMail"{//更新邮箱操作
		mail := this.GetString("mail")
		code,err := this.GetInt32("code")
		if err!=nil{
			this.jsonResult(http.StatusOK,-1,"验证码只能为数字！",nil)
		}
		if mail==""{
			this.jsonResult(http.StatusOK,-1,"邮箱地址不能为空！",nil)
		}

		sMail := session.Get("mail")
		sCode := session.Get("mailCode")
		if sMail ==""{
			this.jsonResult(http.StatusOK,-1,"验证码已过期，请重新获取！",nil)
		}
		if sMail!=mail{
			this.jsonResult(http.StatusOK,-1,"邮箱不一致！",nil)
		}
		if sCode!=code{
			this.jsonResult(http.StatusOK,-1,"验证码错误！",nil)
		}
		user := new(models.User)
		user.Mail = mail
		user.ReadByMail(user)
		if user.Id>0{
			this.jsonResult(http.StatusOK,-1,"邮箱已被绑定！",nil)
		}
		sUser.Mail = mail
		if !user.Update(sUser){
			this.jsonResult(http.StatusOK,-1,"邮箱更换失败！",nil)
		}else{
			this.jsonResult(http.StatusOK,1,"邮箱更新成功！",nil)
		}
	}

}

func (c *UserController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}

func SendMail4MailCode(mail string,code int32)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "ZooORI.才华有限公司"
	user := "zooori@foxmail.com"
	subject := "用户操作-更换邮箱"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【账号邮箱】："+mail
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)

	if mail!=""{
		to[0] = mail
		body = "您的验证码是【"+strconv.FormatInt(int64(code), 10)+"】"
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)

	}
}
