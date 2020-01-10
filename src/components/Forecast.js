import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../css/weather-icons.css";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCel: true,
      temp: parseFloat((this.props.weather.main.temp - 273.15).toFixed(0)),
      feels: parseFloat(
        (this.props.weather.main.feels_like - 273.15).toFixed(0)
      ),
      min: parseFloat((this.props.weather.main.temp_min - 273.15).toFixed(0)),
      max: parseFloat((this.props.weather.main.temp_max - 273.15).toFixed(0))
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.weather.name != this.props.weather.name) {
      this.setState({
        temp: parseFloat((this.props.weather.main.temp - 273.15).toFixed(0)),
        feels: parseFloat(
          (this.props.weather.main.feels_like - 273.15).toFixed(0)
        ),
        min: parseFloat((this.props.weather.main.temp_min - 273.15).toFixed(0)),
        max: parseFloat((this.props.weather.main.temp_max - 273.15).toFixed(0))
      });
    }
  }

  ctof = () => {
    const { temp, feels, min, max, isCel } = this.state;

    if (isCel === true) {
      let newTemp = (temp * 9) / 5 + 32;
      let newFeels = (feels * 9) / 5 + 32;
      let newMin = (min * 9) / 5 + 32;
      let newMax = (max * 9) / 5 + 32;

      this.setState({
        temp: parseFloat(newTemp).toFixed(0),
        feels: parseFloat(newFeels).toFixed(0),
        min: parseFloat(newMin).toFixed(0),
        max: parseFloat(newMax).toFixed(0),
        isCel: false
      });
    }
  };

  ftoc = () => {
    const { temp, feels, min, max, isCel } = this.state;

    if (!isCel) {
      let newTemp = ((temp - 32) * 5) / 9;
      let newFeels = ((feels - 32) * 5) / 9;
      let newMin = ((min - 32) * 5) / 9;
      let newMax = ((max - 32) * 5) / 9;

      this.setState({
        temp: parseFloat(newTemp).toFixed(0),
        feels: parseFloat(newFeels).toFixed(0),
        min: parseFloat(newMin).toFixed(0),
        max: parseFloat(newMax).toFixed(0),
        isCel: true
      });
    }
  };

  render() {
    const { name, sys, weather } = this.props.weather;
    const { temp, feels, min, max, isCel } = this.state;

    return (
      <div style={{ marginRight: "30%" }}>
        <h1 style={{ marginBottom: "-5%" }}>
          {name}, {sys.country} <br />
          <br />
        </h1>
        <h2>
          <i
            className={`wi wi-owm-${weather[0].id}`}
            style={{ fontSize: "5em" }}
          ></i>
          <br />
          <br />
          {weather[0].main}
        </h2>
        <p>{weather[0].description}</p>
        <h1 style={{ fontSize: "50px" }}>
          {temp}
          {isCel ? "°C" : "F"}
        </h1>
        <p>Feels like:</p>
        <h4>
          {feels}
          {isCel ? "°C" : "F"}
        </h4>
        <p>Low/High:</p>
        <h4>
          {min}
          {isCel ? "°C" : "F"}/{max}
          {isCel ? "°C" : "F"}
        </h4>
        <ButtonGroup aria-label="outlined primary button group">
          <Button onClick={this.ftoc}>Celsius</Button>
          <Button onClick={this.ctof}>Fahrenheit</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Forecast;
