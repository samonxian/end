export function adapterType(str){
	var tempStr = "";
	switch(str){
		case "virtual":
		     tempStr = "虚拟机";
		     break;
		case "physical":
		     tempStr = "物理机";
		     break;
		default:
		     break;
	}
	return tempStr;
}

export function adapterISP(str){
	var tempStr = "";
	switch(str){
		case "CMCC":
		     tempStr = "移动";
		     break;
		case "CNC":
		     tempStr = "联通";
		     break;
		case "CTC":
		     tempStr = "电信";
		     break;
		case "TIANWEI":
		     tempStr = "天威";
		     break;
		case "Tencent":
		     tempStr = "腾讯云";
		     break;
		case "ALi":
		     tempStr = "阿里云";
		     break;
		case "Other":
		     tempStr = "其他";
		     break;
		default:
		     break;
	}
	return tempStr;
}