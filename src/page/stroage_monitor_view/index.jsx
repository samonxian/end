import React from 'react'
import Component from 'libs/react-libs/Component'
import { connect } from 'react-redux'
import { stroageMonitorViewFetch, stroageMonitorViewCharFetch } from './action'
import { isEmptyObj, generateMixed } from 'libs/function'
import { Spin, Table } from 'antd'
import { DiskMessage } from './components/DiskMessage'
import { AreaMessage } from './components/AreaMessage'
import { AreaDetailMessage } from './components/AreaDetailMessage'
import { CharMessage } from './components/CharMessage'

let imgUrl = require('../../../style/img/background.jpg');
require('css/stroage_monitor_view.css');

class StroageMonitorView extends Component{
    
    componentDidMount(){
    	const { dispatch } =  this.props;
        dispatch(stroageMonitorViewFetch());
        dispatch(stroageMonitorViewCharFetch());
        this.clearInt = setInterval(function(){
            dispatch(stroageMonitorViewFetch());
            dispatch(stroageMonitorViewCharFetch());
        },30*1000)
    }

    componentWillMount(){
        clearInterval(this.clearInt);
    }

	render(){
		const { stroageMonitorViewProps, stroageCharProps } = this.props;

        if(isEmptyObj(stroageMonitorViewProps)){
        	return <Spin/>
        }

    	return <div style = {{background:'url('+imgUrl+') repeat',margin:'-20px -40px'}} 
    	            className = "stroage_monitor_view_page">
    	        <div className = "stroage_monitor_view_page_contianer">
    	             <DiskMessage { ...this.props }/>
                     <CharMessage { ...this.props }/>
                     <AreaMessage { ...this.props }/>
                     <AreaDetailMessage { ...this.props }/>
    	        </div>
    	    </div>
		
	}
}

function mapStateToProps(state){
	return {
		stroageMonitorViewProps : state.stroageMonitorView,
        stroageCharProps : state.stroageMonitorChar
	};
}

module.exports = connect(mapStateToProps)(StroageMonitorView)