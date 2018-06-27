package models

import (
	"time"
	"github.com/astaxie/beego/orm"
	"fmt"
)

func (a *IPList) TableName() string {
	return IPListTBName()
}

type IPList struct {
	Id int
	AdminId int
	Ip string `orm:null`
	Created time.Time  `orm:"auto_now_add;type(datetime)"`
	Isvalid int `orm:null`
}

func(this *IPList) Insert(IPList *IPList,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Insert(IPList)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *IPList) Update(IPList *IPList,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Update(IPList)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *IPList) UpdateValid(IPList *IPList,oType int,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	var sqlTxt string
	if oType==1{
		sqlTxt = "UPDATE ip_list SET isvalid = 1 where admin_id=? and ip=? AND (created BETWEEN CURDATE() AND CURDATE()+1)"
	}else{
		sqlTxt = "UPDATE ip_list SET isvalid = 0 where admin_id=? and ip=? AND (created BETWEEN CURDATE() AND CURDATE()+1)"
	}
	res, err := o.Raw(sqlTxt,IPList.AdminId,IPList.Ip).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		if num>0{
			return true
		}
	}
	return false
}

func(this *IPList) Delete(IPList *IPList,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Delete(IPList)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *IPList) Read(IPList *IPList) bool {

	o := orm.NewOrm()
	err := o.Read(IPList)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		//fmt.Println(IPList.Id, IPList.Name)
		return true
	}
}

func(this *IPList) GetByIp(ip string,ips *[]IPList){

	o := orm.NewOrm()
	o.Raw("select * from ip_list where ip=? AND (created BETWEEN CURDATE() AND CURDATE()+1) ORDER BY id DESC LIMIT 0,4",ip).QueryRows(ips)
}
