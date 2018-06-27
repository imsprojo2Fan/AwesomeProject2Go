package models

import (
	"time"
	"github.com/astaxie/beego/orm"
	"fmt"
)

func (a *LoginLog) TableName() string {
	return LoginLogTBName()
}

type LoginLog struct {
	Id int
	Uid string
	Ip string `orm:null`
	Address string
	Type int
	CreateTime time.Time  `orm:"auto_now_add;type(datetime)"`
}

func(this *LoginLog) Insert(LoginLog *LoginLog,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Insert(LoginLog)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *LoginLog) Update(LoginLog *LoginLog,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Update(LoginLog)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *LoginLog) Delete(LoginLog *LoginLog,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Delete(LoginLog)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *LoginLog) Read(LoginLog *LoginLog) bool {

	o := orm.NewOrm()
	err := o.Read(LoginLog)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		//fmt.Println(LoginLog.Id, LoginLog.Name)
		return true
	}
}

func(this *LoginLog) ReadById(uid interface{},LoginLogs *[]LoginLog){

	o := orm.NewOrm()
	o.Raw("select * from login_log where uid=? ORDER BY id DESC LIMIT 0,3",uid).QueryRows(LoginLogs)

}

func(this *LoginLog) Count(uid interface{})int64{

	o := orm.NewOrm()
	cnt,_ := o.QueryTable("login_log").Filter("uid",uid).Count() // SELECT COUNT(*) FROM USER
	return cnt
}

func(this *LoginLog) ReadByPage(uid interface{},pageNow,pageNum int64,sortCol,sortType string,LoginLogs *[]LoginLog){

	o := orm.NewOrm()
	//qs := o.QueryTable("login_log")
	if sortCol==""{
		o.Raw("select * from login_log where uid=? order by id desc LIMIT ?,?",uid,pageNow,pageNum).QueryRows(LoginLogs)
	}else{
		orderSql := "ORDER BY create_time "+sortType
		o.Raw("select * from login_log where uid=? "+orderSql+" LIMIT ?,?",uid,pageNow,pageNum).QueryRows(LoginLogs)
	}


}

func(this *LoginLog) GetByIp(ip string,ips *[]LoginLog){
	res := new(LoginLog)
	o := orm.NewOrm()
	o.Raw("select * from login_log where ip=? AND (create_time BETWEEN CURDATE() AND CURDATE()+1) ORDER BY id DESC LIMIT 0,4",ip).RowsToStruct(res, "name", "value")
}
