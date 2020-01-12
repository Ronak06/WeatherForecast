import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../css/weather-icons.css";
import { convertCtoF, convertFtoC } from "../converter.js";

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props);

    const {
      temperatureLow,
      temperatureHigh
    } = this.props.weather.daily.data[0];
    const {
      apparentTemperature,
      summary,
      temperature,
      windSpeed
    } = this.props.weather.currently;

    this.state = {
      isCel: true,
      temp: convertFtoC(temperature),
      feels: convertFtoC(apparentTemperature),
      min: convertFtoC(temperatureLow),
      max: convertFtoC(temperatureHigh)
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.weather.name !== this.props.weather.name) {
      const { temperatureLow, temperatureHigh } = this.props.daily.data[0];
      const {
        apparentTemperature,
        summary,
        temperature,
        windSpeed
      } = this.props.currently;

      this.state = {
        isCel: true,
        temp: convertFtoC(temperature),
        feels: convertFtoC(apparentTemperature),
        min: convertFtoC(temperatureLow),
        max: convertFtoC(temperatureHigh)
      };
    }
  }

  convertWeather = () => {
    const { temp, feels, min, max, isCel } = this.state;

    if (isCel === true) {
      this.setState({
        temp: convertCtoF(temp),
        feels: convertCtoF(feels),
        min: convertCtoF(min),
        max: convertCtoF(max),
        isCel: false
      });
    } else {
      this.setState({
        temp: convertFtoC(temp),
        feels: convertFtoC(feels),
        min: convertFtoC(min),
        max: convertFtoC(max),
        isCel: true
      });
    }
  };

  render() {
    const { city, country } = this.props.geography.components;
    const { currently, daily, hourly } = this.props.weather;
    const { temp, feels, min, max, isCel } = this.state;

    return (
      <div>
        <h1>
          {city}, {country} <br />
        </h1>
        <h2>
          <svg width="5cm" height="4px">
            <img href="SVG/Cloud-Rain.svg" />
          </svg>
          <br />
          <br />
          {currently.summary}
        </h2>
        <p>{daily.data[0].summary}</p>
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
          <Button onClick={this.convertWeather}>
            {isCel ? "Fahrenheit" : "Celsius"}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Forecast;
