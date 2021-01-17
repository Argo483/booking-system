import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";
import "./App.css";
import { BookingsTable } from "./BookingsTable";
import { getDatesToDisplay } from "./GetDatesToDisplay";

const apiUrl = "http://localhost:3001";

class App extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      bookings: [],
      csvBookings: [],
    };
  }

  fetchBookings = () => {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then((bookings) => {
        bookings.forEach((booking) => {
          booking.duration = booking.duration / (60 * 1000);
        });
        this.setState({ bookings });
      });
  };

  componentWillMount = () => {
    this.fetchBookings();
  };

  onCsvParse = (results) => {
    const csvRows = results.data;
    // Remove heading row ("time, duration, userId")
    csvRows.shift();
    let csvBookings = [];
    for (const row of csvRows) {
      const isValidRow = row.length === 3;
      if(isValidRow){
        csvBookings.push({
          time: Date.parse(row[0]),
          duration: parseInt(row[1], 10),
          user_id: row[2],
        });
      }
    }

    this.setState({ csvBookings });
    console.log(this.state);
  };

  onDrop = (files) => {
    console.log(files);

    Papa.parse(files[0], {
      complete: this.onCsvParse,
    });
  };

  onSaveBookingsClicked = () => {
    const bookingsToPost = this.state.bookings;
    if (this.state.csvBookings.length) {
      for (const booking of this.state.csvBookings) {
        if (!booking.isOverlappingBooking) {
          bookingsToPost.push(booking);
        }
      }
    }
    console.log(`posting ${bookingsToPost}`)
    axios
      .post(`${apiUrl}/bookings`, {
        bookings: bookingsToPost,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onReloadBookingsClicked = () => {
    this.fetchBookings();
  };

  render() {
    const datesToDisplay = getDatesToDisplay(
      this.state.bookings || [],
      this.state.csvBookings
    );

    return (
      <div className="App">
        <button></button>
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

          <button onClick={this.onSaveBookingsClicked}>
            Save new bookings
          </button>
          <button onClick={this.onReloadBookingsClicked}>
            Reload bookings
          </button>
          <p>Existing bookings timeline:</p>
          <BookingsTable datesToDisplay={datesToDisplay}></BookingsTable>
        </div>
      </div>
    );
  }
}

export default App;
