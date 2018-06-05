import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from 'material-ui';
import { Add } from 'material-ui-icons';
import './App.css';

class RegEx extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputs: ['input-0'],
			searchText: '',
			regExInputs: [],
		};
	}

	//checks if Regexes find the SearchText
	handleRegex() {
		const inputs = this.state.inputs;
		const searchText = this.state.searchText;

		let regExInputs = inputs.map(input => {
			let message = `Suchtext mit ${input} nicht gefunden`;
			try {
				let reg = new RegExp(this.state[input]);

				if(reg.test(searchText) && this.state[input].length > 0) {
					console.log(`Suchtext mit ${input} gefunden`);
					message = `Suchtext mit ${input} gefunden`;
				}
			}
			catch(e) {
				message = `RegEx ${input} ist nicht valide`;
			}
			return message;
		});

		this.setState({regExInputs});
	};

	// appends new RegEx InputField to state
	appendInput() {
		const { inputs } = this.state;
		let newInput = `input-${inputs.length}`;
		console.log(newInput);
		this.setState({ inputs: inputs.concat([newInput]) });
	}

	//handles Change of every Input Field
	handleChange(event) {
		const name = event.target.name;
		console.log(event.target.value);
		this.setState({[name]: event.target.value});
	}

	render() {
		const { inputs, regExInputs } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">RegEx Test App</h1>
				</header>
				<Card className="App-intro">
					<div className="Container">
						<div className="Filter">
							<div className="FilterInputContainer">
								<RegEx/>
								{inputs.map((input, index) =>
									<TextField
										className="FilterInput"
										error={}
										helperText={}
										key={input}
										name={input}
										label={`Filter${index+1}`}
										onChange={this.handleChange.bind(this)}/>)}
							</div>
							<Button
								className="Button"
								onClick={this.appendInput.bind(this)}
								variant="raised"
							>
								<Add /><Typography>Add RegEx</Typography>
							</Button>
						</div>
						<TextField name="searchText" label="Suchtext" onChange={this.handleChange.bind(this)}/>
					</div>
					<Button
						className="Button"
						onClick={this.handleRegex.bind(this)}
						variant="raised"
						color="primary"
					>
						Test RegEx
					</Button>
					{regExInputs.map(message =>
						<Typography key ={message}>{message}</Typography>
					)}

				</Card>
			</div>
		);
	}
}

export default App;
