import React, { Fragment } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import "../css/weather-icons.css";
import AnalogClock from "../components/AnalogClock";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityName: "", weatherInfo: [], long: "", lat: "" };
  }

  onChange = e => {
    this.setState({ cityName: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.cityName === "" && !navigator.geolocation) {
      console.error("Please enter a city.");
    } else if (this.state.cityName.length !== 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${process.env.REACT_APP_OWM_API_KEY}`
        )
        .then(res => {
          this.setState({
            weatherInfo: res.data
          });
        });
      this.setState({ cityName: "" });
    } else {
      // prompts user to enable location and extracts user's location
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  };

  // function used to get location of current user and search weather using corresponding longitude and latitude
  showPosition = position => {
    const { longitude, latitude } = position.coords;

    if (longitude.length !== 0 && latitude.length !== 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_OWM_API_KEY}`
        )
        .then(res => {
          this.setState({
            weatherInfo: res.data
          });
        });
    }
  };

  render() {
    const { main, name, sys, weather } = this.state.weatherInfo;

    return (
      <Fragment>
        <h1 style={{ textAlign: "center" }}> Weather Forecast </h1>
        <div style={{ textAlign: "center" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3>Search for a city!</h3>
              <form onSubmit={this.onSubmit} style={{ marginTop: "5%" }}>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  onChange={this.onChange}
                  value={this.state.cityName}
                  style={{ margin: "5px" }}
                  size="small"
                />
                <Button
                  onClick={this.onSubmit}
                  style={{ marginBottom: "-30px" }}
                >
                  <MyLocationIcon />
                </Button>

                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                >
                  >>
                </Button>
              </form>
              {/* <AnalogClock /> */}
            </Grid>
            <Grid item xs={6}>
              {Object.entries(this.state.weatherInfo).length !== 0 ? (
                <div>
                  <h1 style={{ marginBottom: "-50px" }}>
                    {name}, {sys.country} <br />
                    <br />
                  </h1>
                  <h2>
                    <i
                      className={`wi wi-owm-${weather[0].id}`}
                      style={{ fontSize: "5em" }}
                    ></i>
                    <br />
                    {weather[0].main}
                  </h2>
                  <p style={{ marginBottom: "-25px" }}>
                    {weather[0].description}
                  </p>
                  <h1 style={{ fontSize: "50px" }}>
                    {parseFloat((main.temp - 273.15).toFixed(0))}
                    °C
                  </h1>
                  <p>Feels like:</p>
                  <h4>{parseFloat(main.feels_like - 273.15).toFixed(0)}°C</h4>
                  <p>Low/High:</p>
                  <h4>
                    {parseFloat(main.temp_min - 273.15).toFixed(0)}/
                    {parseFloat(main.temp_max - 273.15).toFixed(0)}°C
                  </h4>
                  {/* <WeeklyForecast city={name} country={sys.country} /> */}
                </div>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Forecast;
