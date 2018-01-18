import React from 'react';
// import axios from 'axios';
// Bootstrap, Grid, Row, Col,
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import './Header.css'
// const api_key = "dzs_7Mq_ru1UBTg38nYt";

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ""
		}
	}

	handleChange = event => {
		this.setState({
			value: event.target.value
		});
	};

	validate = e => {
		if(e.key == "Enter") {
// DEBUGGING STUFF DELETE Later
			if(this.state.value === "dump") {
				console.log(this.props.data);
				this.setState({value: ""});
			} else {
				this.props.addStock(this.state.value.toUpperCase(), () => {this.setState({value: ""})});
			}
		}
	}

	render() {
		return (
			<Navbar className="head" fixedTop>
				<div className="container">
					<Navbar.Header>
						<Navbar.Brand>
							<a href="" id="brand">Test</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Navbar.Form pullRight>
							<FormGroup>
								<FormControl
									type="text"
									placeholder="Add Ticker"
									value={this.state.value}
									onChange={this.handleChange}
									onKeyPress={this.validate}
								/>
							</FormGroup>{' '}
						</Navbar.Form>
					</Navbar.Collapse>
				</div>
			</Navbar>

		);
	}
}
