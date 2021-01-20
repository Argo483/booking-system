import React from "react";

export const BookingsList = ({ bookings }) => {
  return (
    <div>
      <p>Existing bookings:</p>
      {(bookings || []).map((booking, i) => {
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
    </div>
  );
};

