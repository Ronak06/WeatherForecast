import React from "react";
import "./App.css";
import Forecast from "./components/Forecast";

class App extends React.Component {
  render() {
    return (
      <div>
        <Forecast />
      </div>
    );
  }
}

export default App;
