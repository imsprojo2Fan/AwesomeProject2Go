package models

type Wechat struct {
	ToUserName string
	FromUserName string
	CreateTime int64
	MsgType string
	Content string
	MsgId int64
}

