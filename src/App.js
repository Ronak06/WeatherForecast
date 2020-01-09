import React, { Fragment } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OrbitSpinner from "@bit/bondz.react-epic-spinners.orbit-spinner";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import Forecast from "./components/Forecast";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      weatherInfo: [],
      long: "",
      lat: "",
      loading: false
    };
  }

  onChange = e => {
    this.setState({ cityName: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.cityName === "" && !navigator.geolocation) {
      console.log("debug pin");
    } else if (this.state.cityName.length !== 0) {
      this.setState({ loading: true });
      // console.log(this.state.loading);
      axios({
        url: `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.REACT_APP_OWM_API_KEY}`,
        method: "get",
        params: { q: `${this.state.cityName}` }
      }).then(res => {
        this.setState({
          weatherInfo: res.data
        });
      });
      this.setState({ cityName: "", loading: false });
    } else {
      // prompts user to enable location and extracts user's location
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  };

  // function used to get location of current user and search weather using corresponding longitude and latitude
  showPosition = position => {
    const { longitude, latitude } = position.coords;
    console.log(longitude);

    if (longitude.length !== 0 && latitude.length !== 0) {
      axios({
        url: `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.REACT_APP_OWM_API_KEY}`,
        method: "get",
        params: { lat: `${latitude}`, lon: `${longitude}` }
      }).then(res => {
        this.setState({
          weatherInfo: res.data
        });
      });
    }
  };

  render() {
    return (
      <Fragment>
        <p
          style={{
            textAlign: "center",
            fontFamily: "Great Vibes",
            fontSize: "75px",
            marginTop: "50px"
          }}
        >
          {" "}
          Weather Forecast{" "}
        </p>
        <div style={{ textAlign: "center" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <p
                style={{
                  fontFamily: "IBM Plex Serif",
                  fontSize: "20px"
                }}
              >
                Search for a city or enable location!
              </p>
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
                <Button variant="outlined" size="medium" type="submit">
                  >>
                </Button>
              </form>
              {/* <AnalogClock /> */}
            </Grid>
            <Grid item xs={6}>
              {Object.entries(this.state.weatherInfo).length !== 0 ? (
                <Forecast weather={this.state.weatherInfo} />
              ) : this.state.loading ? (
                <OrbitSpinner />
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default App;
