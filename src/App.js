import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
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

  onCsvParse = (results) => {
    const csvRows = results.data;
    csvRows.pop();
    let csvBookings = [];
    for (const row of csvRows) {
      csvBookings.push({
        time: row[0],
        duration: row[1],
        user_id: row[2],
      });
    }

    this.setState({ csvBookings, ...this.state });
    console.log(this.state);
  };

  onDrop = (files) => {
    console.log(files);

    Papa.parse(files[0], {
      complete: this.onCsvParse,
    });

    // reader.onabort = () => console.log("file reading was aborted");
    // reader.onerror = () => console.log("file reading failed");
    // reader.onload = () => {
    //   // Parse CSV file
    //   csv.parse(reader.result, (err, data) => {
    //     console.log("Parsed CSV data: ", data);
    //   });
    // };
  };

  render() {
    const datesToDisplay = getDatesToDisplay(this.state.bookings || [], this.state.csvBookings);

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
