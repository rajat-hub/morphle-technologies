import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      inputlist: [],
      count: 1
    };
  }

  appendChild = () => {
    this.setState({
      count: this.state.count + 1
    });
    const inputlist = this.state.inputlist.concat(
      <ParentComponent add={<ParentComponent />} c={this.state.count} />
    );
    this.setState({ inputlist });

    console.log(this.state.inputlist);
  };

  render() {
    return (
      <div>
        <button onClick={this.appendChild}>Add Parent</button>
        <Draggable handle="strong">
          <div className="box no-cursor">
            <strong className="cursor">
              <div>Title (child)</div>
              {this.state.inputlist}
            </strong>
            {/* {this.state.inputlist} */}
          </div>
        </Draggable>
      </div>
    );
  }
}

const ParentComponent = props => (
  <Draggable handle="strong">
    <div className="box no-cursor">
      <strong className="cursor">
        <div>Title (after click {props.c})</div>
      </strong>
      {/* <div>{props.add}</div> */}
    </div>
  </Draggable>
);
export default App;
