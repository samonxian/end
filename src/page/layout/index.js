import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu,Icon } from 'antd_c'
import { Row,Col } from 'antd_c'
require('antd/lib/index.css');
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

class Layout extends React.Component {
	componentDidMount(){

	}
	
    handleClick(e) {
        console.log('click ', e);
    }

    render() {
		const { current, theme } = this.props;
		//console.log("Layout",this.props);
        return (
			<Row type="flex" justify="start">
				<Col className="sidebar-left">
					<Menu onClick={this.handleClick} selectedKeys={[current]} theme={theme} mode="horizontal">
						<MenuItem key="title">
							<div className="logo fl"></div>
							<h2>
								<Link to="/">羚羊管理后台</Link>
							</h2>
						</MenuItem>
						
					</Menu>
					<Menu  theme={theme}>
						<MenuItem>
							<Link to="/get_camera_info">tracker信息查询</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/new_index_disk">新版本索引</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/user_log/start_service">用户操作日志</Link>
						</MenuItem>
					</Menu>
						
				</Col>	
				<Col className="contents b">
				{ this.props.contents || "" }
				</Col>
			</Row>
			
        )

    }
}

function mapStateToProps(state){
	return {
		routing : state.routing,
		current : 'mail',
		theme : 'dark'
	};
}
export default connect(mapStateToProps)(Layout)

