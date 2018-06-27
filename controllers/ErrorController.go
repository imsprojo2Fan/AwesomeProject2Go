package controllers

import (
	"github.com/astaxie/beego"
)

type ErrorController struct {
	beego.Controller
}

func (c *ErrorController) Error403() {
	c.Data["content"] = "Forbidden"
	c.TplName = "tip/403.html"
}

func (c *ErrorController) Error404() {
	c.Data["content"] = "page not found"
	c.TplName = "tip/404.html"
}

func (c *ErrorController) Error500() {
	c.Data["content"] = "server error"
	c.TplName = "tip/500.html"
}

func (c *ErrorController) ErrorDb() {
	c.Data["content"] = "database is now down"
	c.TplName = "tip/dberror.html"
}
