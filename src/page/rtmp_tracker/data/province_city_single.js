import * as fn from 'function'
let column_dataIndexs = [ 
	'Name',
	'IP',
	'CurrentUpSpeed_1',
	'TotalUpSpeed',
	'CurrentDownSpeed_1',
	'TotalDownSpeed',
	'Connections',
]
export let columns = [
	{
		title: '名称',
	}, 
	{
		title: 'IP地址',
		className : '',
	},
	{
		title: '上传',
	},
	{
		title: '最大',
	},
	{
		title: '下载',
	},
	{
		title: '最大',
	},
	{
		title: '连接数',
	},
];

export function getData(data){
	let re = [];
	re = fn.fieldSort(data,column_dataIndexs,columns,function(key,data2){
		var t_data = data2[key]
		if(!t_data.CurrentUpSpeed_1){
			t_data.CurrentUpSpeed_1 = t_data.CurrentUpSpeed.toFixed(4);	
			t_data.CurrentDownSpeed_1 = t_data.CurrentDownSpeed.toFixed(4);	
		}
	})
	return re;
}
