import React, { Component } from 'react';
import axios from 'axios';

const smurfsApiUrl = 'http://localhost:3333/smurfs';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      error: '',
      loading: ''
    };
  }

  addSmurf = async event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const newSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    }

    this.setState({ loading: true });
    try {
      await axios.post(smurfsApiUrl, newSmurf)
        .then(() => this.props.getAllSmurfs());
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ loading: false });
    }

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
