import Component from 'libs/react-libs/Component'
import React from 'react'
import { BarItem } from './BarItem'
import { AREA_BG, areaColor } from './until'
import { isEmptyObj, generateMixed } from 'libs/function'
// import { LineChart } from 'libs/defined-chart/LineChar'
import * as d3 from "d3"
let ReactD3 = require('react-d3-components')
let LineChart = ReactD3.LineChart

export class LineChar extends Component{

    constructor(){
        super(); 
    }

    events(){
        var obj = {
            colorScale(){
                return areaColor(arguments[0])
            }
        }
        return obj;
    }

    render(){

        const { width, data, viewBox } = this.props;
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
                height={ 180 }
                isAnmiation = { true }
                barPadding = { 1 }
                colorScale = { this.colorScale }
                viewBox = { viewBox }
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
	}

}