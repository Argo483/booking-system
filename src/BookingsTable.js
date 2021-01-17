import React from "react";
import { BookingsTableRow } from "./BookingsTableRow";

export const BookingsTable = ({ datesToDisplay }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {datesToDisplay.map((dateToDisplay, index) => {
        return (
          <div
            key={index}
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
                  return (
                    <BookingsTableRow
                      key={index}
                      hourToRender={hourToRender}
                      dateToDisplay={dateToDisplay}
                      index={index}
                    ></BookingsTableRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
