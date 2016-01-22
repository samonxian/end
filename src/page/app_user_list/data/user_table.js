export const renderContent = function(value, row, index) {
  let obj = {
    children: value,
    props: {}
  }
  return obj
}

export const USER_LIST = [
    {
		title : "UID",
		dataIndex : "UID",
		render : renderContent
	},
	{
		title : "用户名",
		dataIndex : "userName",
		render : renderContent
	},
	{
		title : "APP ID",
		dataIndex : "appId",
		render : renderContent
	},
	{
		title : "调度 IP",
		dataIndex : "dispatchIp",
		render : renderContent
	},
	{
		title : "权限串",
		dataIndex : "privateConnect",
		render : renderContent
	},
	{
		title : "云服务过期",
		dataIndex : "expiredTime",
		render : renderContent
	},
	{
		title : "创建时间",
		dataIndex : "createTime",
		render : renderContent
	},
	{
		title : "更新时间",
		dataIndex : "updateTime",
		render : renderContent
	}
]