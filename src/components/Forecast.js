import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { convertCtoF, convertFtoC } from "../helpers/converter.js";
import WeatherIcon from "./WeatherIcon.js";
import { isUndefined } from "util";

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    const {
      temperatureLow,
      temperatureHigh
    } = this.props.weather.daily.data[0];
    const {
      apparentTemperature,
      temperature,
      icon
    } = this.props.weather.currently;

    let newIcon = icon.replace(/-/g, "").toUpperCase();

    this.state = {
      isCel: true,
      temp: convertFtoC(temperature),
      feels: convertFtoC(apparentTemperature),
      min: convertFtoC(temperatureLow),
      max: convertFtoC(temperatureHigh),
      icon: newIcon
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.weather !== this.props.weather) {
      const {
        temperatureLow,
        temperatureHigh
      } = this.props.weather.daily.data[0];
      const {
        apparentTemperature,
        temperature,
        icon
      } = this.props.weather.currently;

      let newIcon = icon.replace(/-/g, "").toUpperCase();

      this.setState({
        isCel: true,
        temp: convertFtoC(temperature),
        feels: convertFtoC(apparentTemperature),
        min: convertFtoC(temperatureLow),
        max: convertFtoC(temperatureHigh),
        icon: newIcon
      });
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
    const { currently, daily, hourly } = this.props.weather;
    const { temp, feels, min, max, isCel, icon } = this.state;

    const { components } = this.props.geography;

    return (
      <div>
        <h1>
          <br />
          {isUndefined(components.city)
            ? components.county
            : components.city}, {components.country} <br />
        </h1>
        <h2>
          <WeatherIcon icon={icon} />
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
