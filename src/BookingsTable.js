import React from "react";
import { BookingsTableRow } from "./BookingsTableRow";

export const BookingsTable = ({ datesToDisplay }) => {
  return (
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
            <table
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "grey",
              }}
            >
              <tbody>
                {dateToDisplay.hours.map((hourToRender, index) => {
                  return <BookingsTableRow
                    hourToRender={hourToRender}
                    dateToDisplay={dateToDisplay}
                    index={index}
                  ></BookingsTableRow>;
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
