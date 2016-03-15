import Component from 'libs/react-libs/Component'
import React from 'react'
import { BarItem } from './BarItem'
import { AREA_BG } from './until'
import { isEmptyObj, generateMixed } from 'libs/function'
// import { LineChart } from 'libs/defined-chart/LineChart'
import * as d3 from "d3"
let ReactD3 = require('react-d3-components')
let LineChart = ReactD3.LineChart

export class LineChar extends Component{

    render(){

        const { width, data } = this.props;
        var lineData = [],
            initX = [];

        lineData.push({
            label : 'yAxis',
            values : [{
                x : 0,
                y : 150
            }],
        });

        for(var area in data){
            lineData.push({
                label : area,
                values : data[area]
            })
        }
        
        for(var i=0;i<125;i++){
            initX.push({
                x : i,
                y : 0,
            })
        }

        lineData.push({
            label : 'xAxis',
            values : initX
        });

        return <LineChart 
                data={ lineData }
                width={ width }
                height={ 250 }
                isAnmiation = { true }
                barPadding = { 1 }
                xAxis = {{label: "时间"}}
                yAxis= {{label: "使用数量"}}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
	}

}