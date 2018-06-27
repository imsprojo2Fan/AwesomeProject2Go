package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
)

func (a *Admin) TableName() string {
	return AdminTBName()
}

type Admin struct {
	Id int
	Account string
	Password string
	ZanCount int
}

func(this *Admin) Insert(admin *Admin,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}
	_,err := o.Insert(admin)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Admin) Update(admin *Admin,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}
	_,err := o.Update(admin)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Admin) UpdateZanCount(admin *Admin,oType int,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}

	var sqlTxt string
	if oType==1{
		sqlTxt = "UPDATE admin SET zan_count = zan_count+1 where id=?"
	}else{
		sqlTxt = "UPDATE admin SET zan_count = zan_count-1 where id=?"
	}
	res, err := o.Raw(sqlTxt,admin.Id).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		if num>0{
			return true
		}
	}
		return false
}

func(this *Admin) Delete(admin *Admin,tx...orm.Ormer) bool {

	var o orm.Ormer
	if len(tx)>0{
		o = tx[0]
	}else{
		o = orm.NewOrm()
	}
	_,err := o.Delete(admin)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *Admin) Read(admin *Admin) bool {

	o := orm.NewOrm()
	err := o.Read(admin)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		//fmt.Println(Admin.Id, Admin.Name)
		return true
	}
}

func(this *Admin) ReadAll(admins *[]Admin) {

	o := orm.NewOrm()
	o.Raw("SELECT * FROM admin ").QueryRows(admins)

}
