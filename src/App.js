import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

const apiUrl = 'http://localhost:3001'


class App extends Component {

  state = {}

  componentWillMount() {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then((bookings) => {
        this.setState({ bookings })
      })
  }

  onDrop(files) {
    console.log(files);
  }


  render() {
    
    const days = 10;
    const datesToDisplay = [];
    for(let i = 0; i< days; i++){
      datesToDisplay.push(new Date(i+1 + "Mar 2018"))
    }
    return (
      <div className="App">
        <div className="App-header">
          <Dropzone
            accept=".csv"
            onDrop={this.onDrop}
          >
            Drag files here
          </Dropzone>
        </div>
        <div className="App-main">
          <p>Existing bookings:</p>
          {
            (this.state.bookings || []).map((booking, i) => {
              const date = new Date(booking.time);
              const duration = booking.duration / (60 * 1000);
              return (
                <p key={i} className="App-booking">
                  <span className="App-booking-time">{date.toString()}</span>
                  <span className="App-booking-duration">{duration.toFixed(1)}</span>
                  <span className="App-booking-user">{booking.userId}</span>
                </p>
              )
            })
          }
          <p>Existing bookings timeline:</p>
          <div style={{display: "flex", flexDirection: "column"}}>
          {
            datesToDisplay.map((day) => {
              return <div style={{ width: "1000px", height: "40px", margin: "5px", padding: "10px", backgroundColor: "red" }}>
                {day.toLocaleDateString()}
              </div>
            })

          }  
          </div>

          <div style={{display: "flex"}}>
          {
            (this.state.bookings || []).map((booking, i) => {
              const date = new Date(booking.time);
              const duration = booking.duration / (60 * 1000);
              return (
                <div></div>

                // <p key={i} className="App-booking">
                //   <span className="App-booking-time">{date.toString()}</span>
                //   <span className="App-booking-duration">{duration.toFixed(1)}</span>
                //   <span className="App-booking-user">{booking.userId}</span>
                // </p>
              )
            })
          }
          </div>
         
        </div>
      </div>
    );
  }
}

export default App;
