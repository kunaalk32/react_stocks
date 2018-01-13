import React, { Component } from 'react';
import './App.css';
import {FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import axios from 'axios';
let api_key = "dzs_7Mq_ru1UBTg38nYt";

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			crosshairVals: []
		}
	}
	componentWillMount() {
		axios.get(encodeURI("https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=" + api_key)).then(
			res => {
				if(res.data.dataset_data.data) {
					let newData = res.data.dataset_data.data.map(arr => {
						return {x: new Date(arr[0]), y: arr[4]};
					});
					let meta = {
						ticker: "FB",
						data: newData
					}
					this.state.data.push(meta);
					this.setState({
						data: this.state.data
					});
				}
			});
	}

	_onNearestX = (value, {index}) =>  {
		this.setState({
			crosshairVals: this.state.data.map(meta => meta.data[index].y),
		});
	}

	_onMouseLeave = () => {
	    this.setState({crosshairVals: []});
	  }

	render() {
		return (
			<div className="App container">
				<FlexibleWidthXYPlot height={500} xType="time" onMouseLeave={this._onMouseLeave}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					<Crosshair
						values={this.state.crosshairVals}
						itemsFormat={vals =>
							vals.map((val, index) => {
								return {title: this.state.data[index].ticker, value: val}
							})
						}
					/>
					{
						this.state.data.map(meta =>
							<LineSeries
								animation
								data={meta.data}
								key={`$(meta.ticker)$(data.data.x)`}
								onNearestX={this._onNearestX}
							/>)
					}
				</FlexibleWidthXYPlot>
			</div>
		);
	}
}

export default App;
