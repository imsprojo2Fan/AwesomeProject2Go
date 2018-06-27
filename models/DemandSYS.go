package models

import (
	"time"
	"github.com/astaxie/beego/orm"
	"fmt"
)

func (a *DemandSYS) TableName() string {
	return DemandSYSTBName()
}

type DemandSYS struct {
	Id int
	Name string
	Phone string
	Mail string
	Address string
	SignFrom int
	Demand string
	Status int
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
}

func(this *DemandSYS) Insert(DemandSYS *DemandSYS,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}
	_,err := o.Insert(DemandSYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *DemandSYS) Update(DemandSYS *DemandSYS) bool {

	o := orm.NewOrm()
	_,err := o.Update(DemandSYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *DemandSYS) Delete(DemandSYS *DemandSYS) bool {

	o := orm.NewOrm()
	_,err := o.Delete(DemandSYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *DemandSYS) Read(DemandSYS *DemandSYS) bool {

	o := orm.NewOrm()
	err := o.Read(DemandSYS)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		//fmt.Println(DemandSYS.Id, DemandSYS.Name)
		return true
	}
}
