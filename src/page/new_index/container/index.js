import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

class Index extends Component {
	render(){
		return <div>新建索引</div>
	}
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(Index)