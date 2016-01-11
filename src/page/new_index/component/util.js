const renderContent = function(value, row, index) {
  let obj = {
    children: value,
    props: {}
  }
  return obj
}

export const INDEX_HEAD = [
   {
	  title: '磁盘ID',
	  dataIndex: 'did',
	  render: renderContent
	},
    {
	  title: 'IP地址',
	  dataIndex: 'ip',
	  render: renderContent
	},
	{
	  title: '端口号',
	  dataIndex: 'port',
	  render: renderContent
	},
	{
	  title: '磁盘空间大小',
	  dataIndex: 'size_data',
	  render: renderContent
	},
	{
	  title: '但前偏移',
	  dataIndex: 'pos_data',
	  render: renderContent
	},
	{
	  title: '起始时间',
	  dataIndex: 'first',
	  render: renderContent
	},
	{
	  title: '终点时间',
	  dataIndex: 'last',
	  render: renderContent
	},
	{
	  title: '当前用户数',
	  dataIndex: 'user_count',
	  render: renderContent
	},
	{
	  title: '磁盘上行宽带',
	  dataIndex: 'upload_rate',
	  render: renderContent
	},
	{
	  title: '磁盘下行宽带',
	  dataIndex: 'download_rate',
	  render: renderContent
	},
	{
	  title: '在线状态',
	  dataIndex: 'keepalive_timelast',
	  render: renderContent
	},
	{
	  title: '操作',
	  render: renderContent
	}
]

export const INDEX_CAMERA = [
    {
	  title: '时间轴',
	  dataIndex: '',
	  render: renderContent
	},
	{
	  title: '分组号',
	  dataIndex: 'group',
	  render: renderContent
	},
	 {
	  title: '开始时间',
	  dataIndex: 'start_time',
	  render: renderContent
	},
	{
	  title: '结束时间',
	  dataIndex: 'end_time',
	  render: renderContent
	},
	{
	  title: '存储状况',
	  dataIndex: 'create_at',
	  render: renderContent
	}
]

export const INDEX_MONITOR = [
    {
	  title: '时间',
	  dataIndex: 'create_at',
	  render: renderContent
	},
	{
	  title: 'MongoDB 更新操作次数',
	  dataIndex: 'insert_op',
	  render: renderContent
	},
	{
	  title: 'MongoDB 查询操作次数',
	  dataIndex: 'query_op',
	  render: renderContent
	},
	{
	  title: '播放数据平均查询时间 (ms)',
	  dataIndex: 'playdata_query_time',
	  render: renderContent
	},
	{
	  title: 'MQ 处理的消息数',
	  dataIndex: '',
	  render: renderContent
	}
]

export function isEmptyObj(obj){
	if (typeof obj === Object){  
		for( obj in Object.hasOwnProperty(name)){
			return false;
		}
		return true;
    }
}