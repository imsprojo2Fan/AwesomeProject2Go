package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
	"time"
)

// Model Struct
type User struct {
	Id   int
	Uid  string
	Account string
	Password string
	Type int
	Name string `orm:"size(100)"`
	Gender int
	Birthday string
	Age int
	Phone string
	Mail string
	City string
	Address string
	Avatar string
	Signature string
	SignFrom int
	LastLoginTime time.Time
	LoginCount int
	IsActivate int
	Created time.Time `orm:"auto_now_add;type(datetime)"`
	Updated time.Time `orm:"auto_now;type(datetime)"`
}

func (a *User) TableName() string {
	return UserTBName()
}

func(this *User) Insert(user *User) int {

	o := orm.NewOrm()

	if user.Account !=""{
		o.Read(user,"account")
		if user.Id>0{
			return -2//账号已存在
		}
	}

	if user.Mail !=""{
		o.Read(user,"mail")
		if user.Id>0{
			return -2//邮箱已存在
		}
	}

	if user.Phone !=""{
		o.Read(user,"phone")
		if user.Id>0{
			return -2//手机号已存在
		}
	}
	_,err := o.Insert(user)
	if err!=nil{
		return -1
	}else{
		return 1
	}
}

func(this *User) Update(user *User) bool {

	o := orm.NewOrm()
	_, err := o.Update(user)
	if err == nil {
		return true
	}
	return false
}

func(this *User) UpdatePassword(user *User) bool {

	o := orm.NewOrm()
	_, err := o.Raw("UPDATE user SET password = ? WHERE uid =?", user.Password,user.Uid).Exec()
	if err == nil {
		return true
	}
	return false
}
func(this *User) UpdateLoginCount(user *User) bool {

	o := orm.NewOrm()
	_, err := o.Raw("UPDATE user SET login_count = login_count+1,last_login_time=NOW() WHERE id =?",user.Id).Exec()
	if err == nil {
		return true
	}
	return false
}

func(this *User) Delete(user *User) bool {

	o := orm.NewOrm()
	_,err := o.Delete(user)
	if err!=nil{
		return false
	}else{
		return true
	}
}

func(this *User) Read(user *User) bool {

	o := orm.NewOrm()
	err := o.Read(user)
	if err == orm.ErrNoRows {
		fmt.Println("查询不到")
		return false
	} else if err == orm.ErrMissPK {
		fmt.Println("找不到主键")
		return false
	} else {
		fmt.Println(user.Id, user.Name)
		return true
	}
}

func(this *User) Login(user *User) bool{

	o := orm.NewOrm()
	err := o.Raw("SELECT * FROM user WHERE account = ? OR phone = ? OR mail = ?", user.Account,user.Account,user.Account).QueryRow(&user)

	if err!=nil{
		return false
	}
	return true
}

func(this *User) ReadByMail(user *User) int {

	o := orm.NewOrm()
	o.Read(user,"mail")
	//o.Raw("SELECT id,is_activate  FROM user WHERE mail = ? AND is_activate=1", user.Mail).QueryRow(&user)
	if user.IsActivate==1{
		return -1//账号激活状态才属于已存在
	}
	// 三个返回参数依次为：是否新创建的，对象 Id 值，错误
	/*if created, _, err := o.ReadOrCreate(user, "mail"); err == nil {
		if created {
			return 0
		} else {
			return 1
		}
	}*/
	return 1

}

func(this *User) Activate(user *User) bool {

	o := orm.NewOrm()
	err := o.Raw("UPDATE user SET is_activate = 1 WHERE uid = ?", user.Uid)
	if err!=nil{
		return false
	}else{
		return true
	}
}

