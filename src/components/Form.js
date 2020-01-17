import React, { Fragment } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import randomCoordinates from "random-coordinates";

import Forecast from "./weather/Forecast";

class Form extends React.Component {
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

    if (this.state.cityName === "") {
      console.log("debug pin");
    } else {
      // console.log(this.state.loading);
      axios({
        url: `https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_CAGE_API_KEY}&language=en&pretty=1`,
        method: "get",
        params: { q: `${this.state.cityName}` }
      }).then(res => {
        const { lng, lat } = res.data.results[0].geometry;
        console.log(res.data);
        this.setState({
          longitude: lng,
          latitude: lat,
          geoData: res.data.results[0],
          cityName: ""
        });
        this.getWeather();
      });
    }
  };

  getWeather = () => {
    if (this.state.longitude.length !== 0 && this.state.latitude.length !== 0) {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_API_KEY}/${this.state.latitude},${this.state.longitude}`,
        method: "get"
      }).then(res => {
        this.setState({ weatherInfo: res.data });
      });
    }
  };

  useGeolocation = () => {
    // prompts user to enable location and extracts user's location
    navigator.geolocation.getCurrentPosition(this.showPosition);
  };

  // function used to get location of current user and search weather using corresponding longitude and latitude
  showPosition = position => {
    const { longitude, latitude } = position.coords;
    // console.log(longitude);

    this.getLocationName(latitude + "%2C%20" + longitude);

    if (longitude.length !== 0 && latitude.length !== 0) {
      axios({
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_API_KEY}/${latitude},${longitude}`,
        method: "get"
      }).then(res => {
        this.setState({ weatherInfo: res.data });
      });
    }
  };

  getLocationName = props => {
    console.log(props);
    axios({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${props}&key=${process.env.REACT_APP_CAGE_API_KEY}&language=en&pretty=1`,
      method: "get"
    }).then(res => {
      this.setState({
        geoData: res.data.results[0]
      });
    });
  };

  imFeelingLucky = () => {
    let coords = randomCoordinates({ fixed: 2 }).split(",");

    this.getLocationName(coords[0] + "%2C%20" + coords[1]);

    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_API_KEY}/${coords}`,
      method: "get"
    }).then(res => {
      this.setState({ weatherInfo: res.data });
    });
  };

  render() {
    return (
      <Fragment>
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
                style={{ marginBottom: "-5px", marginRight: "10px" }}
                size="small"
              />

              <Button variant="outlined" size="medium" type="submit">
                >>
              </Button>
            </form>
            <Button
              onClick={this.useGeolocation}
              variant="outlined"
              style={{ marginTop: "25px", marginRight: "10px" }}
            >
              <MyLocationIcon />
            </Button>
            <Button
              onClick={this.imFeelingLucky}
              variant="outlined"
              style={{ marginTop: "25px" }}
            >
              I'm feeling lucky!
            </Button>
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
                style={{ marginBottom: "-5px", marginRight: "10px" }}
                size="small"
              />

              <Button variant="outlined" size="medium" type="submit">
                >>
              </Button>
            </form>
            <Button
              onClick={this.useGeolocation}
              variant="outlined"
              style={{ marginTop: "25px", marginRight: "10px" }}
            >
              <MyLocationIcon />
            </Button>
            <Button
              onClick={this.imFeelingLucky}
              variant="outlined"
              style={{ marginTop: "25px" }}
            >
              I'm feeling lucky!
            </Button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Form;
