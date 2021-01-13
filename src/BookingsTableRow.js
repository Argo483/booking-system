import React from "react";
import { isBetween } from "./IsBetween";

export const BookingsTableRow = ({ hourToRender, dateToDisplay, index }) => {
  let backgroundColor = index % 2 === 0 ? "lightgrey" : "darkgrey";
  let hourHasCurrentBooking = false;
  let hourHasNewBooking = false;
  if (dateToDisplay.hasBooking) {
    if (
      isBetween(
        hourToRender,
        dateToDisplay.bookingStartTime,
        dateToDisplay.bookingEndTime
      )
    ) {
      hourHasCurrentBooking = true;
      // backgroundColor = "green";
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
          backgroundColor: hourHasNewBooking ? "green" : "initial",
        }}
      ></td>
    </tr>
  );
};
