import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import "./App.css";
import { BookingsTable } from "./BookingsTable";
import { BookingsList } from "./BookingsList";
import { getCalendarDays } from "./getCalendarDays";
import { fetchBookings, postBookings } from "./apiRequests";


class App extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      bookings: [],
      csvBookings: [],
    };
  }

  fetchBookings = async () => {

    const bookings = await fetchBookings(); 
    console.log("blah2");
    bookings.forEach((booking) => {
      booking.duration = booking.duration / (60 * 1000);
    });
    this.setState({ bookings });
    console.log(this.state.bookings);
  };

  componentDidMount = () => {
    console.log("blah");
    this.fetchBookings();
  };

  onCsvParse = (results) => {
    const csvRows = results.data;
    // Remove heading row ("time, duration, userId")
    csvRows.shift();
    let csvBookings = [];
    for (const row of csvRows) {
      const isValidRow = row.length === 3;
      if (isValidRow) {
        csvBookings.push({
          time: Date.parse(row[0]),
          duration: parseInt(row[1], 10),
          userId: row[2].trim(),
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
    const bookingsToPost = [...this.state.bookings];
    if (this.state.csvBookings.length) {
      for (const booking of this.state.csvBookings) {
        if (!booking.isOverlappingBooking) {
          bookingsToPost.push({...booking});
        }
      }
    }
    console.log(`posting ${bookingsToPost}`);
    postBookings(bookingsToPost);
  };

  onReloadBookingsClicked = () => {
    this.setState({ bookings: [], csvBookings: [] });
    this.fetchBookings();
  };

  render() {
    const calendarDays = getCalendarDays(
      this.state.bookings || [],
      this.state.csvBookings
    );

    return (
      <div className="App">
        <button></button>
        <div className="App-header">
          <Dropzone accept=".csv" onDrop={this.onDrop}>
          </Dropzone>
        </div>
        <div className="App-main">
          <BookingsList bookings={this.state.bookings}/>

          <button data-testid="save-bookings-button" onClick={this.onSaveBookingsClicked}>
            Save new bookings
          </button>
          <button data-testid="reload-bookings-button" onClick={this.onReloadBookingsClicked}>
            Reload bookings
          </button>
          <p>Existing bookings timeline:</p>
          <BookingsTable calendarDays={calendarDays}></BookingsTable>
        </div>
      </div>
    );
  }
}

export default App;
