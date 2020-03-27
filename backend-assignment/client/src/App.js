import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null,
    maindata: [],
    extracount: 0
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  printsub = e => {
    var str = e.target.value;
    str = str.trim();
    var allSubstrings = [];
    var fresults = [];
    var i, j;

    for (i = 0; i < str.length; i++) {
      for (j = i + 1; j < str.length + 1; j++) {
        allSubstrings.push(str.slice(i, j));
      }
    }
    allSubstrings.sort(function(a, b) {
      return b.length - a.length;
    });
    let len = allSubstrings.length - 50;
    if (str.length > 6 && len > 0) {
      for (let i = 0; i < 50; i++) {
        fresults.push(allSubstrings[i]);
      }

      this.setState({
        maindata: fresults,
        extracount: len
      });
    } else {
      this.setState({
        maindata: allSubstrings
      });
    }

    console.log(this.state.maindata);
  };
  render() {
    return (
      <div>
        <p>Input</p>
        <input type="text" onChange={this.printsub} />
        <p className="App-intro">{this.state.data}</p>
        <p>Output</p>
        {this.state.maindata
          ? this.state.maindata.map(item => {
              return (
                <li>
                  <span>{item}</span>
                </li>
              );
            })
          : null}
        {this.state.extracount > 0 ? (
          <h1>Remaining count: {this.state.extracount}</h1>
        ) : null}
      </div>
    );
  }
}

export default App;
