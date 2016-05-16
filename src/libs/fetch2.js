import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import React from 'react'
/**
 * fetch封装 
 */
class Fetch1 {
	constructor(option={ }){
		this.option = option;
		if(!option.params){
			option.params = {}
		}
		this.fetchOption = {}
		switch(option.method){
			case 'POST':
				this.fetchOption = {
					method: "POST",
					body: JSON.stringify(option.params),
				}
				break;
			case 'GET':
				this.fetchOption = {
					method: "GET",
				}
				break;
			case 'PUT':
				this.fetchOption = {
					method: "PUT",
					body: JSON.stringify(option.params)
				}
				break;
			case 'DELETE':
				this.fetchOption = {
					method: "DELETE",
					body: JSON.stringify(option.params)
				}
				break;
			case 'PATCH':
			    this.fetchOption = {
					method: "PATCH",
					body: JSON.stringify(option.params)
				}
				break;
			default:
			    break;

		}
		if(option.headers){
			this.fetchOption.headers = option.headers;
		}else{
			this.fetchOption.headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			};
		}
		if(!option.nocredentials){
			//允许传跨域cookie
			this.fetchOption.credentials = "include";
		}
	}
	/**
	 * [fetch 获取接口数据]
	 * @param  {[Function]} dispatch        [redux dispatch]
	 * @param  {[Function]} request         [redux action 设置开始请求数据状态]
	 * @param  {[Function]} receive         [redux action 设置请求已完成数据状态]
	 * @param  {[Function]} nologin         [未登录或登录失效处理]
	 */
	fetch(dispatch,receive,param,nologin) {
		var _this = this;
		//dispatch(request())
		var urls = [],status = [];
		//console.debug(this.fetchOption)
		this.option.urls.forEach(function(v,k){
			var re = new Promise(function (resolve,reject) {
				fetch(v,_this.fetchOption).then(response => {
					status.push(response.status);
					// status = response.status;
					var a = response.json();
					// console.log('a',a)
					// a.then(d=>console.log('d',d));
					resolve(a);
				})
			});
			urls.push(re);
		})
		Promise.all(urls)
			.then(function(jsonArray){
				let msg = { };
				jsonArray.forEach(function(v,k){
					v.status = status[k];
				});
				if(jsonArray[0].status == 401){
					dispatch(push('/user_login'));
				}else if(jsonArray[0].status == 403){
					dispatch(push('/user_login'));
				}else{
					dispatch(receive(param,jsonArray[0]));
					//callback && callback(jsonArray);
				}
			}).catch(function(e){
				console.error(e)
				let msg = { };
				// if(!_this.option.errorMessage){
				// 	msg = {
				// 		title: '错误提示',
				// 		content: '发生了未知错误！',
				// 	}
				// }
				// Modal.error(msg);
			});
	}

}

module.exports = Fetch1; 
window.r3fetch = function(option){
	return new Fetch1(option)
};
