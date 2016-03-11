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
        
        var data = [
            {
                 label: 'somethingB',
                 values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}, {x: 4.5, y: 7}, {x: 5, y: 7.8}, {x: 5.5, y: 9}]
            },
            {
                 label: 'somethingC',
                 values: [{x: 6.5, y: 9}, {x: 7.5, y: 9}, {x: 8.5, y: 9}, {x: 9.5, y: 9}, {x: 10.5, y: 9}, {x: 11.5, y: 9}, {x: 12.5, y: 9}, {x: 5.5, y: 9}],
            }
        ];

        return <LineChart 
                data={ data }
                width={ 400 }
                height={ 400 }
                isAnmiation = { true }
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
	}

}