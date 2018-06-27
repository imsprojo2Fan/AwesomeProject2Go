package controllers

import (
	"github.com/astaxie/beego"
	"AwesomeProject2Go/enums"
	"fmt"
	"encoding/xml"
	"AwesomeProject2Go/models/other"
	"AwesomeProject2Go/models"
	"strings"
	"io/ioutil"
	"time"
	"strconv"
)

type WechatController struct {
	beego.Controller
}

func (a *WechatController) Prepare() {
	a.EnableXSRF = false
}

func(this WechatController) Token(){

	//signature := this.GetString("signature")
	//timestamp := this.GetString("timestamp")
	//noce := this.GetString("noce")
	echostr := this.GetString("echostr")
	fmt.Println(echostr)
	this.Ctx.WriteString(echostr)//用于验证token
	this.StopRun()
}

func (this WechatController)Operate()  {
	wechat := new(models.Wechat)
	data, err := ioutil.ReadAll(this.Ctx.Request.Body)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	err = xml.Unmarshal([]byte(data),&wechat)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}
	sendFrom := wechat.ToUserName
	sendTo := wechat.FromUserName
	wechat.FromUserName = sendFrom
	wechat.ToUserName = sendTo
	wechat.CreateTime = time.Now().Unix()

	//微信返回数据大坑--------只要按格式返回string类型数据就可以了！！！
	xmlTxt :=  "<xml><ToUserName><![CDATA["+wechat.ToUserName+"]]></ToUserName><FromUserName><![CDATA["+wechat.FromUserName+"]]></FromUserName><CreateTime>"+strconv.FormatInt(wechat.CreateTime,10) +"</CreateTime><MsgType><![CDATA["+wechat.MsgType+"]]></MsgType><Content><![CDATA["+wechat.Content+"]]></Content></xml>"
	fmt.Println(xmlTxt)
	this.Ctx.WriteString(xmlTxt)
}

/*
//结构体转成xml格式化的格式
*/
func Struct2XML(wechat models.Wechat){
	var strData string
	if xmlIndentByteData, err2 := xml.MarshalIndent(wechat, "", "  "); err2==nil{
		strData = string(xmlIndentByteData)
		strData = strings.Replace(strData,"Wechat","xml",-1)
		fmt.Println(strData)
	}
}

func (c *WechatController) jsonResult(status enums.JsonResultCode,code int, msg string, data interface{}) {
	r := &other.JsonResult{status, code, msg,data}
	c.Data["json"] = r
	c.ServeJSON()
	c.StopRun()
	return
}