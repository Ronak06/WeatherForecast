import React, { Fragment } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import Forecast from "./components/Forecast";
import Header from "./components/Header";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      geoData: [],
      weatherInfo: [],
      long: "",
      lat: "",
      loading: false,
      longitude: "",
      latitude: ""
    };
  }

  onChange = e => {
    this.setState({ cityName: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    axios({
      url: `https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_CAGE_API_KEY}&language=en&pretty=1`,
      method: "get",
      params: { q: `${this.state.cityName}` }
    }).then(res => {
      const { lng, lat } = res.data.results[0].geometry;
      // console.log(res.data);
      this.setState({
        longitude: lng,
        latitude: lat,
        geoData: res.data.results[0],
        cityName: ""
      });
      this.getWeather();
    });
  };

  getWeather = () => {
    if (this.state.longitude.length !== 0 && this.state.latitude.length !== 0) {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_API_KEY}/${this.state.latitude},${this.state.longitude}`,
        method: "get"
      }).then(res => {
        // console.log(res.data);
        console.log("r");
        this.setState({ weatherInfo: res.data });
        // console.log(this.state.weatherInfo);
      });
    }
  };

  // if (this.state.cityName === "" && !navigator.geolocation) {
  //   console.log("debug pin");
  // } else if (this.state.cityName.length !== 0) {
  //   this.setState({ loading: true });
  //   // console.log(this.state.loading);
  //   axios({
  //     url: `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.REACT_APP_OWM_API_KEY}`,
  //     method: "get",
  //     params: { q: `${this.state.cityName}` }
  //   }).then(res => {
  //     this.setState({
  //       weatherInfo: res.data
  //     });
  //   });
  //   this.setState({ cityName: "", loading: false });
  // } else {
  //   // prompts user to enable location and extracts user's location
  //   navigator.geolocation.getCurrentPosition(this.showPosition);
  // }

  // function used to get location of current user and search weather using corresponding longitude and latitude
  showPosition = position => {
    const { longitude, latitude } = position.coords;
    // console.log(longitude);

    if (longitude.length !== 0 && latitude.length !== 0) {
      axios({
        url: `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.REACT_APP_OWM_API_KEY}`,
        method: "get",
        params: { lat: `${latitude}`, lon: `${longitude}` }
      }).then(res => {
        // console.log(res.data);
        this.setState({
          weatherInfo: res.data
        });
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Header />
        {Object.entries(this.state.weatherInfo).length !== 0 ? (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "IBM Plex Serif",
                fontSize: "20px"
              }}
            >
              Search for a city or enable location!
            </p>
            <form onSubmit={this.onSubmit}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                onChange={this.onChange}
                value={this.state.cityName}
                style={{ marginBottom: "-15px" }}
                size="small"
              />
              <Button onClick={this.onSubmit} style={{ marginBottom: "-15px" }}>
                <MyLocationIcon />
              </Button>

              <Button
                variant="outlined"
                size="medium"
                type="submit"
                style={{ marginBottom: "-15px" }}
              >
                >>
              </Button>
            </form>
            <br />
            <Forecast
              weather={this.state.weatherInfo}
              geography={this.state.geoData}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "IBM Plex Serif",
                fontSize: "20px"
              }}
            >
              Search for a city or enable location!
            </p>
            <form onSubmit={this.onSubmit}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                onChange={this.onChange}
                value={this.state.cityName}
                style={{ marginBottom: "-15px" }}
                size="small"
              />
              <Button onClick={this.onSubmit} style={{ marginBottom: "-15px" }}>
                <MyLocationIcon />
              </Button>

              <Button
                variant="outlined"
                size="medium"
                type="submit"
                style={{ marginBottom: "-15px" }}
              >
                >>
              </Button>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
