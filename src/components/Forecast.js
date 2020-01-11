import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../css/weather-icons.css";
import { convertKtoC, convertCtoF, convertFtoC } from "../converter.js";

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    const { temp, feels_like, temp_min, temp_max } = this.props.weather.main;

    this.state = {
      isCel: true,
      temp: convertKtoC(temp),
      feels: convertKtoC(feels_like),
      min: convertKtoC(temp_min),
      max: convertKtoC(temp_max)
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.weather.name !== this.props.weather.name) {
      const { temp, feels_like, temp_min, temp_max } = this.props.weather.main;

      this.setState({
        temp: convertKtoC(temp),
        feels: convertKtoC(feels_like),
        min: convertKtoC(temp_min),
        max: convertKtoC(temp_max)
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
    const { name, sys, weather } = this.props.weather;
    const { temp, feels, min, max, isCel } = this.state;

    return (
      <div>
        <h1>
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
          <Button onClick={this.convertWeather}>
            {isCel ? "Fahrenheit" : "Celsius"}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Forecast;
