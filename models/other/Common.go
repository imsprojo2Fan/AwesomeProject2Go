package other

import "AwesomeProject2Go/enums"

type JsonResult struct {
	Status enums.JsonResultCode `json:"status"`
	Code int `json:"code"`
	Msg  string               `json:"msg"`
	Obj  interface{}          `json:"data"`
}

type JsonDataResult struct {
	Status enums.JsonResultCode `json:"status"`
	Total int64 `json:"total"`
	Records  int64 `json:"records"`
	Rows  interface{}  `json:"rows"`
}

type BaseQueryParam struct {
	Sort   string `json:"sort"`
	Order  string `json:"order"`
	Offset int64  `json:"offset"`
	Limit  int    `json:"limit"`
}
