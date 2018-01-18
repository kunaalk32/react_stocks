import React, { Component } from 'react';
import './App.css';
import {FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';
import Header from './components/Header'
import '../node_modules/react-vis/dist/style.css';
import axios from 'axios';
const api_key = "dzs_7Mq_ru1UBTg38nYt";

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			crosshairVals: []
		}
	}
	componentWillMount() {
		this.addStock("FB", () => true);
	}

	addStock = (ticker, clear) => {
		axios.get(encodeURI(`https://www.quandl.com/api/v3/datasets/WIKI/${ticker}/data.json?api_key=${api_key}`)).then(
			res => {
				if(res.data.dataset_data.data) {
					let newData = res.data.dataset_data.data.map(arr => {
						return {x: new Date(arr[0]), y: arr[4]};
					});
					const col = this.randColor();
					let meta = {
						ticker: ticker,
						data: newData,
						color: col
					}
					this.state.data.push(meta);
					this.setState({
						data: this.state.data
					});
					clear();
				}
			}
		).catch(
			error => {
				console.log(error);
				if(error) {
					alert("Incorrect Ticker Symbol Provided");
				}
			}
		)
	}

	_onNearestX = (value, {index}) =>  {
		console.log();
		let arr = this.state.data.map((meta) => {
			let len = meta.data.length-1;
			if (index <= len) {
				return {x:meta.data[index].x.getTime(), y:meta.data[index].y};
			} else {
				return {x:meta.data[len].x.getTime(), y:meta.data[len].y};
			}
		});
		this.setState({
			crosshairVals: arr,
		});
	}

    _onMouseLeave = () => {
		this.setState({crosshairVals: []});
	}

	randColor = () => {
		const colors = ["#21ce99", "#ff4200", "#0dc0ca"];
		let rand = Math.random() * colors.length;
		return colors[Math.floor(rand)];
	}

	render() {
		return (
			<div className="App container-fluid">
				<Header
					addStock={this.addStock}
					// DEBUGGING STUFF DELETE Later
					data={this.state.data}
				/>
				<br/> <br/> <br/>
				<div className="container">
					<FlexibleWidthXYPlot height={500} xType="time" onMouseLeave={this._onMouseLeave} color="white" style={{color: "white", stroke: "white"}}>
						<VerticalGridLines color="white" style={{color: "white", stroke: "white"}}/>
						<HorizontalGridLines color="white" style={{color: "white", stroke: "white"}}/>
						<XAxis color="white" style={{color: "white", stroke: "white"}}/>
						<YAxis color="white" style={{color: "white", stroke: "white"}}/>
						<Crosshair
							values={this.state.crosshairVals}
							itemsFormat={vals =>
								vals.map((val, index) => {
									return {title: this.state.data[index].ticker, value: val.y}
								})
							}
							titleFormat={vals => {
								return {title: "Date", value: (new Date(this.state.crosshairVals[0].x)).toDateString().slice(4, -4)};}}
						/>
						{
							this.state.data.map((meta,index) =>
								<LineSeries
									animation
									data={meta.data}
									key={`${meta.ticker}`}
									onNearestX={index === 0 ? this._onNearestX : null}
									color={meta.color}
								/>)
						}
					</FlexibleWidthXYPlot>
				</div>
			</div>
		);
	}
}

export default App;
