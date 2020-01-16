package controllers

import "github.com/astaxie/beego"

type ServiceController struct {
	beego.Controller
}

func (this *ServiceController) Redirect() {

	oType := this.GetString("type")
	if oType==""{
		this.TplName = "tip/404.html"
	}

	if oType=="service1st"{
		this.TplName = "service/service1st/amouse.html"
	}
}