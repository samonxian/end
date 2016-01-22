import fetch from 'isomorphic-fetch'
import { CAMERA_LIST } from './data/camera_list'
export const APP_CAMERA_STATUS = 'APP_CAMERA_STATUS'

function appCameraReq(data){
	return {
		type : APP_CAMERA_STATUS,
		param : data
	}
}

function appCameraResponse(reddit,json){
	return {
		type : APP_CAMERA_STATUS,
		param : CAMERA_LIST
	}
}

export function appCameraFetch(reddit){
	return dispatch => {
        dispatch(appCameraResponse(reddit))
    }
}