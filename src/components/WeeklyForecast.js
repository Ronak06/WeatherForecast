import React from "react";
import axios from "axios";

class WeeklyForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weeklyInfo: [] };
  }

  componentDidMount() {
    // console.log(this.props.city);
    // console.log(this.props.country);
    // axios
    //   .get(
    //     `http://api.openweathermap.org/data/2.5/forecast?APPID=bf1652439d3e518f2bd45f4ef891dfcc&q=${this.props.city},${this.props.country}`
    //   )
    //   .then(res => {
    //     const weatherC = res.data;
    //     //console.log(weatherC);
    //     this.setState({
    //       weeklyInfo: weatherC
    //     });
    //   });
  }
  render() {
    const { list } = this.state.weeklyInfo;
    {
      console.log(this.state.weeklyInfo);
      console.log(list);
    }

    return (
      <div>
        <h3>This is the weekly forecast!</h3>
        {list !== undefined ? (
          list.map(item => <p>{item.dt_txt}</p>)
        ) : (
          <p> nothing yet</p>
        )}
      </div>
    );
  }
}

export default WeeklyForecast;
