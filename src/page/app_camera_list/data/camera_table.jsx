export const renderContent = function(value, row, index) {
  let obj = {
    children: value,
    props: {}
  }
  return obj
}

export const CAMERA_HEADER = [
    {
		title : "CID",
		dataIndex : "cid",
		render : renderContent
	},
	{
		title : "哈希ID",
		dataIndex : "hashId",
		render : renderContent
	},
	{
		title : "SN",
		dataIndex : "sn",
		render : renderContent
	},
	{
		title : "绑定用户",
		dataIndex : "bindUser",
		render : renderContent
	},
	{
		title : "类型",
		dataIndex : "type",
		render : renderContent
	},
	{
		title : "调度IP",
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
		title : "封面截图时间",
		dataIndex : "screenTime",
		render : renderContent
	}
]
