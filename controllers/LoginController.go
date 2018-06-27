package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeProject2Go/models/other"
	"AwesomeProject2Go/enums"
	"AwesomeProject2Go/models"
	"AwesomeProject2Go/utils"
	"fmt"
	"net/smtp"
	"strings"
	"net/http"
	"time"
)

type LoginController struct {
	beego.Controller
}

func(this *LoginController) LoginIndex()  {
	this.Data["_xsrf"] = this.XSRFToken()
	this.TplName = "login/login.html"
}

func(this *LoginController) Timeout()  {
	if !this.IsAjax(){
		this.Data["_xsrf"] = this.XSRFToken()
		this.Data["timeout"]= time.Now()
		this.TplName = "login/login.html"
		return
	}
	//this.Abort("未登录或会话已过期，请重新登录！")
	//this.Ctx.Redirect(302,"/login")
	this.jsonResult(http.StatusOK,-999, "登录已超时，请重新登录！", nil)
}


func(this *LoginController) LoginOperate()  {

	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	oType := this.GetString("type")
	if oType== ""{
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}
	if oType=="login"{
		account := this.GetString("account")
		password := this.GetString("password")
		if account==""||password==""{
			this.jsonResult(http.StatusOK,-1, "账号或密码不能为空!", nil)
		}
		user := new(models.User)
		user.Account = account
		if !user.Login(user){
			this.jsonResult(http.StatusOK,-1, "账号不存在或未激活!", nil)
		}

		if user.Password != utils.String2md5(password){
			this.jsonResult(http.StatusOK,-1, "账号或密码不正确!", nil)
		}
		if user.IsActivate == 0{
			this.jsonResult(http.StatusOK,-1, "账号未激活!", nil)
		}
		session.Set("user",user)
		session.Set("id",user.Id)
		//this.Redirect("/user",http.StatusFound)
		//更新user表login_count
		user.UpdateLoginCount(user)
		//login_log表新增数据
		login := new(models.LoginLog)
		login.Uid = user.Uid
		login.Ip = this.GetString("ipObj[ip]")
		login.Type = 1
		login.Address = this.GetString("ipObj[city]")+"-"+this.GetString("ipObj[NetType]")
		login.Insert(login)
		session.Set("LoginLog",login)
		fmt.Println("Account:",user.Account)
		fmt.Println("Name:",user.Name)
		this.jsonResult(http.StatusOK,1, "账号验证登录成功!", nil)

	}else if oType=="sign"{
		mail := this.GetString("mail")
		password := this.GetString("password")
		if mail==""||password==""{
			this.jsonResult(http.StatusOK,-1, "邮箱或密码不能为空!", nil)
		}
		user := new(models.User)
		user.Mail = mail
		flag := user.ReadByMail(user)
		var msg string
		if flag==-1{
			msg = "邮箱已被注册!"
		}else {
			msg = "请前往邮箱激活账号!"
			go SendMail4Activate(mail)//发送邮件
			user.Password = utils.String2md5(password)
			user.Mail = mail
			session.Set(utils.String2md5(mail)+"sign",user)
			this.jsonResult(http.StatusOK,1, msg, nil)
		}
		this.jsonResult(http.StatusOK,-1, msg, nil)
	}else if oType=="resetMail"{//发送重置密码邮件
		mail := this.GetString("mail")
		if mail==""{
			this.jsonResult(http.StatusOK,-1, "邮箱地址不能为空!", nil)
		}

		user := new(models.User)
		user.Mail = mail
		if user.ReadByMail(user)==1{
			this.jsonResult(http.StatusOK,-1, "未找到该邮箱地址!", nil)
		}
		go SendMail4Reset(mail)//发送邮件
		session.Set(utils.String2md5(mail)+"reset",utils.String2md5(mail))
		this.jsonResult(http.StatusOK,1, "邮件已发送!", nil)
	}else if oType=="resetOperate"{
		md_mail := this.GetString("md")
		password := this.GetString("password")
		if password==""||md_mail==""{
			this.jsonResult(http.StatusOK,-1, "参数错误!", "重置密码失败")
		}
		user := new(models.User)
		user.Uid = md_mail
		user.Password = utils.String2md5(password)
		if !user.UpdatePassword(user){
			this.jsonResult(http.StatusOK,-1, "重置密码失败!", "请联系管理员")
		}else{
			this.jsonResult(http.StatusOK,1, "重置密码成功!", "3秒后跳转登录页")
		}
	}else if oType=="logout"{
		session.Set("id",nil)
		//this.Redirect("/login",302)
		//login_log表新增数据
		login := new(models.LoginLog)
		login.Uid = session.Get("user").(*models.User).Uid
		lModel := session.Get("LoginLog").(*models.LoginLog)
		login.Ip = lModel.Ip
		login.Type = 0
		login.Address = lModel.Address
		login.Insert(login)
		session.Set("LoginLog",nil)
		this.jsonResult(http.StatusOK,1, "退出成功!", nil)
	}
}

func(this *LoginController) Operate() {

	session,_ := utils.GlobalSessions.SessionStart(this.Ctx.ResponseWriter, this.Ctx.Request)
	oType := this.GetString("type")
	if oType== ""{
		this.jsonResult(http.StatusOK,-1, "type can`t be null", nil)
	}
	if oType=="activate"{//激活账号
		MD_mail := this.GetString("_c")
		sessionM := session.Get(MD_mail+"sign")
		uModel := sessionM.(*models.User)
		if MD_mail=="" || sessionM==nil || MD_mail!=utils.String2md5(uModel.Mail){
			//this.jsonResult(-1, "激活链接已过期!", "请重新注册")
			this.Data["code"] = -1
			this.Data["msg"] = "激活账号链接已过期!"
			this.Data["data"] = "3秒后将跳转注册页"
		}else{
			user := new(models.User)
			user.Mail = uModel.Mail
			user.Password = uModel.Password
			user.IsActivate = 1
			user.SignFrom = 1
			user.Uid = MD_mail
			flag := user.Insert(user)
			if flag==-2{
				//this.jsonResult(-1, "当前账号已激活过!", nil)
				this.Data["code"] = -1
				this.Data["msg"] = "当前账号已激活过!"
				this.Data["data"] = "3秒后将跳转登录页"
			}else if flag==-1{
				//this.jsonResult(-1, "账号激活失败!", "请联系管理员")
				this.Data["code"] = -1
				this.Data["msg"] = "账号激活失败!"
				this.Data["data"] = "请联系管理员"
			}else if flag==1{
				//this.jsonResult(1, "成功激活账号!", nil)
				this.Data["code"] = 1
				this.Data["msg"] = "成功激活账号!"
				this.Data["data"] = "3秒后将跳转登录页"
			}
		}
		this.TplName = "login/alert4activate.html"
	}else if oType=="resetRedirect"{//重置密码操作
		MD_mail := this.GetString("_c")
		sessionR := session.Get(MD_mail+"reset")
		if MD_mail=="" || sessionR==nil || MD_mail!=sessionR{
			//this.jsonResult(-1, "密码重置页已过期!", "3秒后将跳转登录页重置密码")
			this.Data["code"] = -1
			this.Data["msg"] = "密码重置页已过期!"
			this.Data["data"] = "3秒后将跳转登录页重置密码"
		}
		this.Data["_xsrf"] = this.XSRFToken()
		this.Data["md"] = MD_mail
		this.TplName = "login/alert4reset.html"
	}

}

func (c *LoginController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}

func SendMail4Activate(mail string)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "ZooORI.才华有限公司"
	user := "zooori@foxmail.com"
	subject := "用户操作-激活账号"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【账号邮箱】："+mail
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}

	if mail!=""{
		to[0] = mail
		body = "点击链接激活账号:\n http://www.zooori.cn/login/operate?type=activate&_a="+utils.RandomString(20)+"&_b="+utils.RandomString(10)+"&_c="+utils.String2md5(mail)
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	}
}

func SendMail4Reset(mail string)  {
	auth := smtp.PlainAuth("", "zooori@foxmail.com", "fznqfopwakggibej", "smtp.qq.com")
	to := []string{"imsprojo2fan@foxmail.com"}

	nickname := "ZooORI.才华有限公司"
	user := "zooori@foxmail.com"
	subject := "用户操作-重置密码"
	content_type := "Content-Type: text/plain; charset=UTF-8"

	body := "【账号邮箱】："+mail
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}

	if mail!=""{
		to[0] = mail
		body = "点击链接重置密码:\n http://www.zooori.cn/login/operate?type=resetRedirect&_a="+utils.RandomString(20)+"&_b="+utils.RandomString(10)+"&_c="+utils.String2md5(mail)
		msg = []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
			"<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
		smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	}
}

