import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from "react-moment";

import WeatherIcon from "./WeatherIcon";
import { convertFtoC } from "../helpers/converter";

class WeeklyForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyInfo: this.props.daily,
      summary: this.props.daily.summary
    };
  }

  render() {
    console.log(this.props);
    const { data } = this.state.weeklyInfo;

    return (
      <div>
        <h2>Weekly Forecast</h2>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>High</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data !== undefined ? (
                data.map(item => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <WeatherIcon icon={item.icon} />
                    </TableCell>
                    <TableCell>
                      <Moment unix>{item.time}</Moment>
                    </TableCell>
                    <TableCell>{convertFtoC(item.temperatureLow)}°C</TableCell>
                    <TableCell>{convertFtoC(item.temperatureHigh)}°C</TableCell>
                  </TableRow>
                ))
              ) : (
                <p> nothing yet</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default WeeklyForecast;
