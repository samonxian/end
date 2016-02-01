export function getConfigType(type){
	var t_type = type;
	switch(parseInt(type,10)){
		case 0:
			t_type = "私有";
			break;
		case 1:
			t_type = "私有广播";
			break;
		case 2:
			t_type = "公众";
			break;
		case 3:
			t_type = "私有录像";
			break;
		case 4:
			t_type = "公众录像";
			break;
	}
	return t_type;
}

export function getCameraState(type){
	var t_type = type;
	switch(parseInt(type,10)){
		case 0:
			t_type = "异常或离线";
			break;
		case 1:
			t_type = "就绪";
			break;
		case 2:
			t_type = "获取转发中";
			break;
		case 3:
			t_type = "连接转发中";
			break;
		case 4:
			t_type = "推流中";
			break;
		case 5:
			t_type = "断开转发中";
			break;
	}
	return t_type;
}

export function getType(type){
	switch(type){
		case 'camera_debug':
			type = 'rtmp_device';
		case 'camera_time':
			type = 'rtmp_device';
		case 'mobile_debug':
			type = 'rtmp_device';
		case 'camera_time_last':
			type = 'rtmp_device';
		case 'camera_debug_last':
			type = 'rtmp_device';
	}
	return type;
}

