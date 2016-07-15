import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { levelWarningHalfHourFetch, 
         levelWarningDayFetch, 
         levelWarningHalfHourReq,
         levelWarningDayReq } from './action'
import { isEmptyObj } from 'libs/function'
import { LEVEL_INFO_COLOR,
         LEVEL_WARNING_COLOR,
         LEVEL_ERROR_COLOR,
         LEVEL_CREASH_COLOR } from './components/Until'
import { HalfHourChar } from './components/HalfHourChar'
import { DayChar } from './components/DayChar'
import { Spin, Table, Row, Col, message, Icon } from 'antd'

require('css/level_warning.css');

class LevelWarn extends Component{
    
    componentDidMount(){

        const { dispatch } = this.props;
        dispatch(levelWarningHalfHourFetch());
        dispatch(levelWarningDayFetch());

    }

    componentWillUnmount(){

        const { dispatch } = this.props;
        dispatch(levelWarningHalfHourReq({},{}));
        dispatch(levelWarningDayReq({},{}));

    }

  	render(){

        return (
            <div className = "level_warning_container">
                 <div className = "level_warning_container_padding">
                    <Row className = "level_warning_header">
                        <Col span = "12"><h1>报警信息</h1></Col>
                        <Col span = "12" className = "level_warning_refresh"><span><Icon type="reload" />刷新</span></Col>
                    </Row>
                    <Row type="flex" justify="end" className = "level_warning_legend">
                         <ul className = "level_warning_items">
                             <li>
                                 <span className = "desc">info级别</span>
                                 <span style = {{ background : LEVEL_INFO_COLOR }} className = "level_warning_info"></span></li>
                             <li>
                                 <span className = "desc">warning级别</span>
                                 <span style = {{ background : LEVEL_WARNING_COLOR }} className = "level_warning_warning"></span></li>
                             <li>
                                 <span className = "desc">error级别</span>
                                 <span style = {{ background : LEVEL_ERROR_COLOR }} className = "level_warning_error"></span></li>
                             <li>
                                 <span className = "desc">fatal级别</span>
                                 <span style = {{ background : LEVEL_CREASH_COLOR }} className = "level_warning_crash"></span></li>
                         </ul>
                    </Row>
                    <Row className = "level_warning_char">
                         <Col span = "12">
                             <HalfHourChar { ...this.props }/>
                         </Col>
                         <Col span = "12">
                             <DayChar { ...this.props }/>
                         </Col>
                    </Row>
                 </div>
            </div>)
  	}
}

function mapStateToProps(state){
  	return {
        levelWarningHalfHourProps : state.levelWarningHalfHour,
        levelWarningDayProps : state.levelWarningDay
  	};
}

module.exports = connect(mapStateToProps)(LevelWarn)