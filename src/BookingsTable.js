import React from "react";
import { BookingsTableRow } from "./BookingsTableRow";

export const BookingsTable = ({ calendarDays }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {calendarDays.map((calendarDay, index) => {
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
            {calendarDay.day.format("L")}
            <table
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "grey",
              }}
            >
              <tbody>
                {calendarDay.hours.map((hourToRender, index) => {
                  return (
                    <BookingsTableRow
                      key={index}
                      hourToRender={hourToRender}
                      calendarDay={calendarDay}
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
