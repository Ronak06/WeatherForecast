import React from "react";
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

  ctof = () => {
    const { temp, feels, min, max } = this.state;
    const isCel = (this.state.isCel = !this.state.isCel);

    if (isCel === true) {
      let newTemp = ((temp - 32) * 5) / 9;
      console.log(newTemp);
      let newFeels = ((feels - 32) * 5) / 9;
      let newMin = ((min - 32) * 5) / 9;
      let newMax = ((max - 32) * 5) / 9;

      this.setState({
        temp: parseFloat(newTemp).toFixed(0),
        feels: parseFloat(newFeels).toFixed(0),
        min: parseFloat(newMin).toFixed(0),
        max: parseFloat(newMax).toFixed(0),
        isCel: isCel
      });
    } else {
      let newTemp = (temp * 9) / 5 + 32;
      let newFeels = (feels * 9) / 5 + 32;
      let newMin = (min * 9) / 5 + 32;
      let newMax = (max * 9) / 5 + 32;

      this.setState({
        temp: parseFloat(newTemp).toFixed(0),
        feels: parseFloat(newFeels).toFixed(0),
        min: parseFloat(newMin).toFixed(0),
        max: parseFloat(newMax).toFixed(0),
        isCel: isCel
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
          {temp}°{isCel ? "C" : "F"}
        </h1>
        <p>Feels like:</p>
        <h4>
          {feels}°{isCel ? "C" : "F"}
        </h4>
        <p>Low/High:</p>
        <h4>
          {min}°{isCel ? "C" : "F"}/{max}°{isCel ? "C" : "F"}
        </h4>
        <button onClick={this.ctof}>Fahrenheit</button>
        {/* <WeeklyForecast city={name} country={sys.country} /> */}
      </div>
    );
  }
}

export default Forecast;
