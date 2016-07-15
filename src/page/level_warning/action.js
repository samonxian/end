import { REQUESTURL } from 'libs/common'
import Fetch from 'libs/fetch2'
export const LEVEL_WARNING_HALFHOUR_REQUEST = 'LEVEL_WARNING_HALFHOUR_REQUEST'
export const LEVEL_WARNING_DAY_REQUEST = 'LEVEL_WARNING_DAY_REQUEST'

export function levelWarningHalfHourReq({},json){
	return {
		type : LEVEL_WARNING_HALFHOUR_REQUEST,
		param : json
	}
}

export function levelWarningDayReq({},json){
	return {
		type : LEVEL_WARNING_DAY_REQUEST,
		param : json
	}
}

export function levelWarningHalfHourFetch(){
	var url = 'http://120.26.74.53/v1/diagram/alert_times/halfhour';
    return dispatch => {
       r3fetch({
          urls:[url],
          method: 'GET'
       }).fetch(dispatch,levelWarningHalfHourReq,{},null);
    }
}

export function levelWarningDayFetch(){
	var url = 'http://120.26.74.53/v1/diagram/alert_times/daily';
    return dispatch => {
       r3fetch({
          urls:[url],
          method: 'GET'
       }).fetch(dispatch,levelWarningDayReq,{},null);
    }
}