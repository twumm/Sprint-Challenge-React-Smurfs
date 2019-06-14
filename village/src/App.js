import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const smurfsApiUrl = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: '',
      loading: '',
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    this.getAllSmurfs();
  }

  getAllSmurfs = async () => {
    this.setState({ loading: true });
    try {
      const smurfsData = await axios.get(smurfsApiUrl);
      this.setState({ smurfs: smurfsData.data });
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteSmurf = async (event, id) => {
    event.preventDefault();
    try {
      await axios.delete(`${smurfsApiUrl}/${id}`)
        .then(() => this.getAllSmurfs());
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '20px'
            }}
          >
            <NavLink
              to="/"
              exact
            >
              All Smurfs
            </NavLink>

            <NavLink
              to="/smurf-form"
            >
              Add Smurf
            </NavLink>
          </nav>

          <Route
            path="/"
            render={props => (
              <Smurfs
                {...props}
                smurfs={this.state.smurfs}
                deleteSmurf={this.deleteSmurf}
              />
            )}
          />

          <Route
            path="/smurf-form"
            render={props => (
              <SmurfForm
                {...props}
                getAllSmurfs={this.getAllSmurfs}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
