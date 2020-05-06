import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Moment from "react-moment";
import uuid from "uuid";

import WeatherIcon from "./WeatherIcon";
import { convertFtoC } from "../../helpers/converter";

class WeeklyForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyInfo: this.props.daily,
      summary: this.props.daily.summary
    };
  }

  render() {
    const { data } = this.props.daily;
    const { isCel } = this.props;

    return (
      <div>
        <br />
        <br />
        <h2 style={{ fontFamily: "Great Vibes", fontSize: "75px", textAlign: "center" }}>
          Weekly Forecast
        </h2>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Low</TableCell>
                <TableCell>High</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data !== undefined ? (
                data.map(item => (
                  <TableRow key={uuid.v4()}>
                    <TableCell component="th" scope="row">
                      <WeatherIcon icon={item.icon} />
                    </TableCell>
                    <TableCell>
                      <Moment unix>{item.time}</Moment>
                    </TableCell>
                    <TableCell>{item.summary}</TableCell>
                    <TableCell>
                      {isCel
                        ? convertFtoC(item.temperatureLow)
                        : item.temperatureLow}
                      {isCel ? "°C" : "F"}
                    </TableCell>
                    <TableCell>
                      {isCel
                        ? convertFtoC(item.temperatureHigh)
                        : item.temperatureHigh}
                      {isCel ? "°C" : "F"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p> Still gathering the information...</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default WeeklyForecast;
