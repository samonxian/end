webpackJsonp([2],{368:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e){return{routing:e.routing}}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();Object.defineProperty(t,"__esModule",{value:!0});var c=n(1),u=e(c),s=n(154),f=n(240),p=n(222),m=f.Tabs.TabPane,d=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),i(t,[{key:"callback",value:function(e){e=parseInt(e,10);var t=this.props.dispatch;switch(e){case 1:t((0,p.pushPath)("/get_camera_info"));break;case 2:t((0,p.pushPath)("/get_mobile_info"));break;case 3:t((0,p.pushPath)("/get_relay_info"))}}},{key:"render",value:function(){var e=this.props.routing.path,t=1;return-1!=e.indexOf("get_camera_info")&&(t=1),-1!=e.indexOf("get_mobile_info")&&(t=2),-1!=e.indexOf("get_relay_info")&&(t=3),u["default"].createElement("div",null,u["default"].createElement(f.Tabs,{defaultActiveKey:t.toString(),onChange:this.callback.bind(this),type:"card"},u["default"].createElement(m,{tab:"摄像头信息",key:"1"},-1!=e.indexOf("get_camera_info")&&this.props.children),u["default"].createElement(m,{tab:"手机信息",key:"2"},-1!=e.indexOf("get_mobile_info")&&this.props.children),u["default"].createElement(m,{tab:"转发服务信息",key:"3"},-1!=e.indexOf("get_relay_info")&&this.props.children)))}}]),t}(u["default"].Component);t["default"]=(0,s.connect)(r)(d)}).call(this)}finally{}},370:function(e,t,n){try{(function(){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function r(e){return{get_mobile_info:e.get_mobile_info,routing:e.routing}}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=n(1),u=t(c),s=n(154),f=(n(222),n(234)),p=n(240),m=n(368),d=t(m),h=p.Form.Item,b=[{title:"姓名",dataIndex:"column1",key:"column1"},{title:"年龄",dataIndex:"column2",key:"column2",className:"camera_info_column2",render:function(e,t){return u["default"].createElement("pre",null,e)}},{title:"住址",dataIndex:"column3",key:"column3"},{title:"住址",dataIndex:"column4",key:"column4"}],_=[],y=[],k=function(e){function t(){o(this,t);var e=a(this,Object.getPrototypeOf(t).call(this));return e.show_flag=!1,e}return l(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this.props,t=(e.get_mobile_info,e.location),n=e.dispatch;t.query.uid&&n((0,f.fetchData)(t.query.uid))}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.dispatch((0,f.fetchData)(this.props.get_mobile_info.id))}},{key:"setValue",value:function(e){this.props.dispatch((0,f.inputValue)(e.target.value))}},{key:"showTable2",value:function(e){this.props.dispatch((0,f.displayTable2)(!this.show_flag)),this.show_flag=!this.show_flag}},{key:"render",value:function(){var e=this.props,t=e.get_mobile_info,n=e.location;if(t.posts&&0==t.posts.result_code){var o=t.posts.center_data,a=t.posts.tracker_data,l="";a.last_relay.map(function(e){l+=e.ip+":"+e.port+"\n"}),_=[{key:"1",column1:"tracker_ip",column2:a.tracker_ip,column3:"",column4:""},{key:"2",column1:"摄像头ID",column2:t.id,column3:"ip_tag",column4:a.info.ip_tag},{key:"3",column1:"公网ip",column2:a.info.public_ip.ip+":"+a.info.public_ip.port,column3:"内网ip",column4:a.info.local_ip.ip+":"+a.info.local_ip.port},{key:"4",column1:"最后更新时间",column2:a.info.last_heartbeat,column3:"msg_seq",column4:a.info.msg_seq},{key:"5",column1:"状态",column2:a.status,column3:"上次获取转发时间",column4:a.last_relay_time},{key:"6",column1:"上次获取转发列表",column2:l,column3:"",column4:""}];var r=void 0,i=void 0;switch(o.state){case 0:r="异常或离线";break;case 1:r="就绪";break;case 2:r="获取转发中";break;case 3:r="链接转发中";break;case 4:r="推流中";break;case 5:r="断开转发中"}switch(o.config_type){case 0:i="私有";break;case 1:i="私有广播";break;case 2:i="公众";break;case 3:i="私有录像";break;case 4:i="公众录像"}y=[{key:"1",column1:"tracker_ip",column2:o.tracker_ip,column3:"",column4:""},{key:"2",column1:"摄像头ID",column2:t.id,column3:"appid",column4:o.app_id},{key:"3",column1:"公网ip",column2:o.public_ip+":"+o.public_port,column3:"内网ip",column4:o.local_ip+":"+o.local_port},{key:"4",column1:"最后更新时间",column2:o.updated,column3:"",column4:""},{key:"5",column1:"设备状态",column2:r,column3:"设备配置类型",column4:i},{key:"6",column1:"源转发ip",column2:o.relay_ip+":"+o.relay_port,column3:"",column4:""}]}var c="plus";c=t.show_flag?"minus":"plus";var s=void 0;return t.id?s=t.id:n.query.id&&(s=n.query.id),u["default"].createElement(d["default"],null,u["default"].createElement(p.Form,{inline:!0,onSubmit:this.handleSubmit.bind(this)},u["default"].createElement(h,{id:"userName"},u["default"].createElement(p.Input,{size:"large",placeholder:"请输入手机ID",onChange:this.setValue.bind(this),name:"camera_info",value:s})),u["default"].createElement(p.Button,{type:"primary",htmlType:"submit"},"提交")),t.fetched&&u["default"].createElement("div",null,u["default"].createElement("h2",null,"Tracker来源"),u["default"].createElement(p.Table,{className:"camera_info_table1",columns:b,dataSource:_,pagination:!1,bordered:!0})),t.fetched&&u["default"].createElement("div",null,u["default"].createElement("div",{className:"clearfix"},u["default"].createElement("h2",{className:"center-title"},"Center来源"),u["default"].createElement(p.Icon,{onClick:this.showTable2.bind(this),type:c,className:"center-plus"})),t.show_flag&&u["default"].createElement(p.Table,{className:"camera_info_table2",columns:b,dataSource:y,pagination:!1,bordered:!0})))}}]),t}(u["default"].Component);e.exports=(0,s.connect)(r)(k)}).call(this)}finally{}}});
//# sourceMappingURL=2.chunk.js.map