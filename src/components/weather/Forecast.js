import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { convertCtoF, convertFtoC } from "../../helpers/converter.js";
import WeatherIcon from "./WeatherIcon.js";
import { isUndefined } from "util";

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    const {
      temperatureLow,
      temperatureHigh
    } = this.props.weather.daily.data[0];
    const { apparentTemperature, temperature } = this.props.weather.currently;


    this.state = {
      isCel: true,
      temp: convertFtoC(temperature),
      feels: convertFtoC(apparentTemperature),
      min: convertFtoC(temperatureLow),
      max: convertFtoC(temperatureHigh)
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.weather !== this.props.weather) {
      const {
        temperatureLow,
        temperatureHigh
      } = this.props.weather.daily.data[0];
      const { apparentTemperature, temperature } = this.props.weather.currently;

      this.setState({
        isCel: true,
        temp: convertFtoC(temperature),
        feels: convertFtoC(apparentTemperature),
        min: convertFtoC(temperatureLow),
        max: convertFtoC(temperatureHigh)
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
      this.props.callbackFromParent(false);
 
    } else {
      this.setState({
        temp: convertFtoC(temp),
        feels: convertFtoC(feels),
        min: convertFtoC(min),
        max: convertFtoC(max),
        isCel: true
      });
      this.props.callbackFromParent(true);
    }
  };

  render() {
    const { currently, daily } = this.props.weather;
    const { temp, feels, min, max, isCel } = this.state;

    console.log(this.props);

    return (
      <div>
        <h1>
          {isUndefined(this.props.geography)
            ? "Location name not found"
            : `${this.props.geography.formatted}`}{" "}
          <br />
        </h1>
        <h2>
          <WeatherIcon icon={this.props.weather.currently.icon} />
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
          <strong>
            {feels}
            {isCel ? "°C" : "F"}
          </strong>
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
        <br />
        <br />
      </div>
    );
  }
}

export default Forecast;
