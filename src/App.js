import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./App.css";
import moment from "moment";

const apiUrl = "http://localhost:3001";

const getHoursInDay = (date) => {
  var result = [];
  let hour = date.startOf("day");
  result.push(hour);
  for (var i = 0; i < 23; i++) {
    hour = hour.clone().add(1, "hour");
    result.push(hour);
  }
  return result;
};

const isBetweenInclusive = (dateToCheck, startDate, endDate) => {
  if(dateToCheck.unix() >= startDate.unix() && dateToCheck.unix() <= endDate.unix()){
    return true;
  }
  else{
    return false;
  }
}

class App extends Component {
  state = {};

  componentWillMount() {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then((bookings) => {
        bookings.forEach((booking)=>{
          booking.duration = booking.duration / (60 * 1000);
        })
        this.setState({ bookings });
      });
  }

  onDrop(files) {
    console.log(files);
  }

  render() {
    const days = 10;
    const datesToDisplay = [];
    for (let i = 0; i < days; i++) {
      // const timelineDate = new Date(i + 1 + "Mar 2018");
      const momentB = moment;
      const timelineDate = moment(i + 1 + "Mar 2018");
      let hasBooking = false;
      const hours = getHoursInDay(timelineDate);
      let bookingStartTime;
      let bookingEndTime;
      for (const booking of this.state.bookings || []) {
        const bookingDate = moment(booking.time);
        if (bookingDate.format("L") === timelineDate.format("L")) {
          bookingStartTime = bookingDate;
          bookingEndTime = bookingDate.clone().add(booking.duration, "minutes");
          hasBooking = true;
        }
      }
      datesToDisplay.push({
        timelineDate,
        hasBooking,
        hours,
        bookingStartTime,
        bookingEndTime,
      });
    }

    return (
      <div className="App">
        <div className="App-header">
          <Dropzone accept=".csv" onDrop={this.onDrop}>
            Drag files here
          </Dropzone>
        </div>
        <div className="App-main">
          <p>Existing bookings:</p>
          {(this.state.bookings || []).map((booking, i) => {
            const date = new Date(booking.time);
            return (
              <p key={i} className="App-booking">
                <span className="App-booking-time">{date.toString()}</span>
                <span className="App-booking-duration">
                  {booking.duration.toFixed(1)}
                </span>
                <span className="App-booking-user">{booking.userId}</span>
              </p>
            );
          })}
          <p>Existing bookings timeline:</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {datesToDisplay.map((dateToDisplay) => {
              return (
                <div
                  style={{
                    width: "1000px",
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "mediumgrey",
                  }}
                >
                  {dateToDisplay.timelineDate.format("L")}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "grey",
                    }}
                  >
                    {dateToDisplay.hours.map((hourToRender, index) => {
                      let backgroundColor =
                        index % 2 === 0 ? "lightgrey" : "darkgrey";
                      if (dateToDisplay.hasBooking) {
                        if (
                          isBetweenInclusive(hourToRender, dateToDisplay.bookingStartTime, dateToDisplay.bookingEndTime)
                        ) {
                          backgroundColor = "green";
                        }
                      }
                      return (
                        <div style={{ backgroundColor }}>
                          {hourToRender.format("LT")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex" }}>
            {(this.state.bookings || []).map((booking, i) => {
              const date = new Date(booking.time);
              const duration = booking.duration / (60 * 1000);
              return <div></div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
