import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from './action'
import { BarChart } from 'react-d3-components'

let data = [{
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
}];

class Test  extends React.Component {
	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(fetchData("reactjs"));
	}

    render() {
		const { postsByReddit } = this.props;
		console.log(postsByReddit)
        return (
			<div>
				<ul>
					{
						postsByReddit && postsByReddit.fetched &&  postsByReddit.posts.map((post, i) =>
							<li key={i}>{post.title}</li>
						)
					}
				</ul>
				<BarChart data={data} width={400} height={400} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
			</div>
        )
    }
}
/**
 *	组件初始props,过state传递到props
 */
function mapStateToProps(state){
	console.log("组件初始props",state);
	return {
		postsByReddit : state.postsByReddit,
		routing : state.routing
	};
}
export default connect(mapStateToProps)(Test)

