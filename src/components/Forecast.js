import React from "react";

import "../css/weather-icons.css";
//import AnalogClock from "../components/AnalogClock";

class Forecast extends React.Component {
  render() {
    const { main, name, sys, weather } = this.props.weather;

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
          {parseFloat((main.temp - 273.15).toFixed(0))}
          °C
        </h1>
        <p>Feels like:</p>
        <h4>{parseFloat(main.feels_like - 273.15).toFixed(0)}°C</h4>
        <p>Low/High:</p>
        <h4>
          {parseFloat(main.temp_min - 273.15).toFixed(0)}°C/
          {parseFloat(main.temp_max - 273.15).toFixed(0)}°C
        </h4>
        {/* <WeeklyForecast city={name} country={sys.country} /> */}
      </div>
    );
  }
}

export default Forecast;
