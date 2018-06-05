import React, { Component } from 'react';
import { Card, TextField, Button, Typography } from 'material-ui';
import { Add, Delete } from 'material-ui-icons';

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
			searchTextError: false,
			searchTextHelperText: '',
		};
	}

	//checks if Regexes find the SearchText
	handleRegex() {
		const inputs = this.state.inputs;
		const searchText = this.state.searchText;

		//check if Search Text is not null
		if (!searchText) {
			this.setState({
				searchTextError: true,
				searchTextHelperText: 'Muss vorhanden sein',
			});
			return 'Suchtext muss vorhanden sein'
		}
		//itereating over regexes
		inputs.map(input => {
			let error = true;
			let helperText = 'Suchtext nicht gefunden';

			try { //trying to make a RegEx out of UserInput
				let reg = new RegExp(this.state[input]);

				if(reg.test(searchText) && this.state[input].length > 0) {
					helperText = `Suchtext gefunden`;
					error = false;
				}
			}
			catch(e) {
				helperText = `RegEx ${input} ist nicht valide`;
			}
			this.setState({
				[input + 'Error']: error,
				[input + 'HelperText']: helperText,
			});
			return input;
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
		this.setState({[name]: event.target.value});
	}

	//handles Delete of RegEx Form
	handleDelete(event) {
		const name = event.target.name;
		const { inputs } = this.state;
		const index = inputs.indexOf(name);
		inputs.splice(index, 1);
		this.setState({inputs});
	}

	render() {
	  const { inputs } = this.state;
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
								<div key={input} className="FilterInput">
									<TextField
										error={this.state[input+'Error']}
										helperText={this.state[input+'HelperText']}
										name={input}
										label={`Filter${index+1}`}
										onChange={this.handleChange.bind(this)}/>
									<Delete onClick={this.handleDelete.bind(this)}/>
								</div>
							)}
							</div>
							<Button
								className="Button"
								onClick={this.appendInput.bind(this)}
								variant="raised"
							>
								<Add /><Typography>Add RegEx</Typography>
							</Button>
						</div>
						<div>
							<TextField
								name="searchText"
								label="Suchtext"
								error={this.state.searchTextError}
								helperText={this.state.searchTextHelperText}
								onChange={this.handleChange.bind(this)}/>
						</div>
					</div>
					<div className="Regex">
						<Button
							onClick={this.handleRegex.bind(this)}
							variant="raised"
							color="primary">
							Test RegEx
						</Button>
					</div>
        </Card>
      </div>
    );
  }
}

export default App;
