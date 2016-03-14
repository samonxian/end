export const AREA_BG = ["rgba(102,102,102,0.3)","rgba(255,255,255,0)"]
export const THRITY_USER_TOTAL_COLOR = 'rgb(35, 140, 58)'
export const SEVEN_USER_TOTAL_COLOR = 'rgb(49, 181, 246)'
export const MEMORY_SERVICE_MONITOR_UNHEALTH = ''
export const MENORY_SERVICE_MONITOR_SUBHEALTH = ''
export const MENORY_SERVICE_MONITOR_SEVEN_NORMAL = 'rgb(47, 213, 238)'
export const MENORY_SERVICE_MONITOR_THRITY_NORMAL = 'rgb(21, 204, 61)'
export const MENORY_SERVICE_MONITOR_THRITY_BG = 'rgba(255, 255, 255, 0.5980392)'
export const MENORY_SERVICE_MONITOR_SEVEN_BG = "rgba(255, 255, 255, 0.2980392)"

export const renderContent = function(value, row, index) {
	 let obj = {
	    children: value,
	    props: {}
	 }
	 return obj
}

export const MEMORY_SERVICE_MONITOR_HEADER = [
    {
	 	title : "area",
		dataIndex : "区域",
		render : renderContent
	},
	{
		title : "GROUP_ID",
		dataIndex : "group_id",
		render : renderContent
	},
	{
		title : "CYCLE",
		dataIndex : "cycle",
		render : renderContent
	},
	{
		title : "CID",
		dataIndex : "cid",
		render : renderContent
	},
	{
		title : "查看详情",
		dataIndex : "",
		render : renderContent
	}
]