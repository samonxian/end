import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu,Icon } from 'antd'
import { Row,Col } from 'antd'
import * as fn from 'function'
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
require('css/main.css')

class Layout extends React.Component {
	componentDidMount(){

	}
	
    handleClick(e) {
        console.debug('click ', e);
		switch(e.key){
			case 'fullScreen':
				fn.fullScreen(document.getElementById('contents'))
				break;
		}
    }

    render() {
		const { current, theme } = this.props;
		//console.log("Layout",this.props);
        return (
        	<Row className="flex_con">
	        	<Row className="flex_nav" type="flex" justify="start">
					<Menu onClick={this.handleClick} selectedKeys={[current]} theme={theme} mode="horizontal">
						<MenuItem key="logo" className="title_logo">
							<div className="logo fl"></div>
							<h2>
								羚羊视频云管理后台
							</h2>
						</MenuItem>
						<MenuItem className="full_screen" key="fullScreen">
							<Icon className="icon_scan" type="scan" />
						</MenuItem>
					</Menu>
	        	</Row>
				<Row className="flex_content" type="flex" justify="start">
					<Col className="sidebar-left">
						<Menu theme={theme}>
							<MenuItem>
								<Link to="/get_camera_info">调度信息查询</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/new_index_disk">新版本索引</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/user_log_query">用户操作日志</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/rtmp_tracker">RTMP地理监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/udp_tracker">UDP地理监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/get_camera_stat">公众直播情况</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/area_memory">区域存储情况</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/rtmp_relay">RTMP转发监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/memory_service_monitor">存储服务监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/asset_mananger">后台资产管理</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/enterprise_manager_authenticate">企业管理</Link>
							</MenuItem>
						</Menu>
							
					</Col>	
					<Col className="contents b" id="contents">
					{ this.props.contents || "" }
					</Col>
				</Row>
			</Row>
        )

    }
}

function mapStateToProps(state){
	return {
		current : 'mail',
		theme : 'dark'
	};
}
export default connect(mapStateToProps)(Layout)
