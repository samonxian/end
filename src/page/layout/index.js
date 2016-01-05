import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Icon, Row ,Col}from 'antd';
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
		console.log("Layout",this.props);
        return (
			<div>
				<Menu onClick={this.handleClick} selectedKeys={[current]} theme={theme} mode="horizontal">
					<MenuItem key="title">
						羚羊后台监控
					</MenuItem>
					<MenuItem key="mail" disabled>
						<Icon type="mail" />消息
					</MenuItem>
					<SubMenu title={<span> <Icon type="user" />管理员</span>}>
						<MenuItem key="setting:1">选项1</MenuItem>
						<MenuItem key="setting:2">选项2</MenuItem>
						<MenuItem key="setting:3">选项3</MenuItem>
						<MenuItem key="setting:4">选项4</MenuItem>
					</SubMenu>
				</Menu>
				<Row type="flex" justify="start">
					<Col className="sidebar-left">
						<Menu  theme={theme }>
							<MenuItem>
								<Link to="/demo">存储服务监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/udp">UDP转发地理监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/rtmp_position">RTMP转发地理监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/rtmp_service">RTMP转发服务监控</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/index_service">索引服务监控</Link>
							</MenuItem>
						</Menu>
					</Col>
					<Col className="contents b">
					{
						this.props.contents || ""
					}
					</Col>
				</Row>
			</div>	
			
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

