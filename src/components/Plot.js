import React from 'react';
import {FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';

export default class Plot extends React.Component {
	render() {
		return (
			<div className="container">
				<FlexibleWidthXYPlot height={500} xType="time" onMouseLeave={this._onMouseLeave}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
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
								key={`$(meta.ticker)$(data.data.x)`}
								onNearestX={index === 0 ? this._onNearestX : null}
							/>)
					}
				</FlexibleWidthXYPlot>
			</div>
		)
	}
}
