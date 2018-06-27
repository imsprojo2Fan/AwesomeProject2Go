package models

import (
	"time"
	"github.com/astaxie/beego/orm"
	"fmt"
)

type SurveySYS struct {
	Id int
	Ip string
	Survey01 string
	Survey02 string
	Survey03 string
	Survey04 int
	Survey05 int
	Survey06 int
	Survey07 int
	Survey08 int
	Survey09 int
	Survey10 int
	Survey11 int
	Survey12 int
	Survey13 int
	Survey14 int
	Survey15 int
	Survey16 int
	Survey17 int
	Survey18 int
	Survey19 int
	Demand string
	Mail string
	CreateTime time.Time `orm:"auto_now_add;type(datetime)"`
}

func (a *SurveySYS) TableName() string {
	return SurveySYSTBName()
}

func(this *SurveySYS) Insert(SurveySYS *SurveySYS,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Insert(SurveySYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *SurveySYS) Update(SurveySYS *SurveySYS,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Update(SurveySYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}


func(this *SurveySYS) Delete(SurveySYS *SurveySYS,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	_,err := o.Delete(SurveySYS)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *SurveySYS) Read(SurveySYS *SurveySYS) bool {

	o := orm.NewOrm()
	err := o.Read(SurveySYS)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		//fmt.Println(SurveySYS.Id, SurveySYS.Name)
		return true
	}
}

func(this *SurveySYS) Count() int64 {

	o := orm.NewOrm()
	cnt, err := o.QueryTable("survey_sys").Count() // SELECT COUNT(*) FROM USER
	if err!=nil{
		return 0
	}
	return cnt

}


