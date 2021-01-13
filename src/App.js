import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./App.css";
import { BookingsTable } from "./BookingsTable";
import {getDatesToDisplay} from "./GetDatesToDisplay";

const apiUrl = "http://localhost:3001";



class App extends Component {
  state = {};

  componentWillMount() {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then((bookings) => {
        bookings.forEach((booking) => {
          booking.duration = booking.duration / (60 * 1000);
        });
        this.setState({ bookings });
      });
  }

  onDrop(files) {
    console.log(files);

    
  }

  render() {
    const datesToDisplay = getDatesToDisplay(this.state.bookings || []);

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
          <BookingsTable datesToDisplay={datesToDisplay}></BookingsTable>

          {/* <div style={{ display: "flex" }}>
            {(this.state.bookings || []).map((booking, i) => {
              const date = new Date(booking.time);
              const duration = booking.duration / (60 * 1000);
              return <div></div>;
            })}
          </div> */}
        </div>
      </div>
    );
  }

  
}

export default App;
