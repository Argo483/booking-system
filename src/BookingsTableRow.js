import React from "react";
import { isBetween } from "./IsBetween";
import PropTypes from 'prop-types';


export const BookingsTableRow = ({ hourToRender, calendarDay, index }) => {
  let backgroundColor = index % 2 === 0 ? "lightgrey" : "darkgrey";
  let hourHasCurrentBooking = false;
  for (const booking of calendarDay.bookingsOnThisDay){
    if (
      isBetween(
        hourToRender,
        booking.startTime,
        booking.endTime
      )
    ) {
      hourHasCurrentBooking = true;
    }
  }
  let newBookingColor = "initial";
  for (const booking of calendarDay.csvBookingsOnThisDay){
    if (
      isBetween(
        hourToRender,
        booking.startTime,
        booking.endTime
      )
    ) {
      newBookingColor = "green";
      if(booking.isOverlappingBooking){
        newBookingColor = "red";
      }
    }
  }

  return (
    <tr style={{ backgroundColor }}>
      <td>{hourToRender.format("LT")}</td>
      <td
        style={{
          width: "100px",
          backgroundColor: hourHasCurrentBooking ? "green" : "initial",
        }}
      ></td>
      <td
        style={{
          width: "100px",
          backgroundColor: newBookingColor,
        }}
      ></td>
    </tr>
  );
};

BookingsTableRow.propTypes = {
  hourToRender: PropTypes.moment, calendarDay: PropTypes.moment, index: PropTypes.number
};