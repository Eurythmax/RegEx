import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from 'material-ui';
import { Add } from 'material-ui-icons';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputs: ['Filter1'],
			searchText: '',
			regExInputs: [],
			Filter1Error: false,
			Filter1HelperText: '',
		};
	}

	//checks if Regexes find the SearchText
	handleRegex() {
		const inputs = this.state.inputs;
		const searchText = this.state.searchText;

		let regExInputs = inputs.map(input => {
			let message = `Suchtext mit ${input} nicht gefunden`;
			let error = true;
			let helperText = 'Suchtext nicht gefunden';
			debugger;

			try {
				let reg = new RegExp(this.state[input]);

				if(reg.test(searchText) && this.state[input].length > 0) {
					console.log(`Suchtext mit ${input} gefunden`);

					message = `Suchtext mit ${input} gefunden`;
					helperText = `Suchtext gefunden`;
					error = false;
				}
			}
			catch(e) {
				message = `RegEx ${input} ist nicht valide`;
			}
			this.setState({
				[input + 'Error']: error,
				[input + 'HelperText']: helperText,
			});
			return message;
		});

		this.setState({
			regExInputs,
		});
  };

	// appends new RegEx InputField to state
	appendInput() {
	  const { inputs } = this.state;
		let newInput = `Filter${inputs.length + 1}`;
		console.log(newInput);
		this.setState({
			inputs: inputs.concat([newInput]),
			[newInput+'Error']: false,
			[newInput+'HelperText']: '',
		});
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
							{inputs.map((input, index) =>
								<TextField
									className="FilterInput"
									error={this.state[input+'Error']}
									helperText={this.state[input+'HelperText']}
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