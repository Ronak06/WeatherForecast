import React, { Component } from "react";
import Clock from "react-clock";

class AnalogClock extends Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Clock value={this.state.date} style={{ textAlign: "center" }} />
      </div>
    );
  }
}

export default AnalogClock;
