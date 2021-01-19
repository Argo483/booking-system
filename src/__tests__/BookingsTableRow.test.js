import React from "react";
import renderer from "react-test-renderer";
import moment from "moment";
import { BookingsTableRow } from "../BookingsTableRow";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BookingsTableRow
        hourToRender={moment("20111031 02:00", "YYYYMMDD hh:mm")}
        calendarDay={{
          bookingsOnThisDay: [
            {
              startTime: moment("20111031 01:30", "YYYYMMDD hh:mm"),
              endTime: moment("20111031 02:30", "YYYYMMDD hh:mm"),
            },
          ],
          csvBookingsOnThisDay: [
            {
              startTime: moment("20111031 01:30", "YYYYMMDD hh:mm"),
              endTime: moment("20111031 02:30", "YYYYMMDD hh:mm"),
            },
          ],
        }}
      ></BookingsTableRow>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("if current and new bookings overlap this hour, they should be highlighted in green", () => {
  const tree = render(
    <table>
      <tbody>
        <BookingsTableRow
          hourToRender={moment("20111031 02:00", "YYYYMMDD hh:mm")}
          calendarDay={{
            bookingsOnThisDay: [
              {
                startTime: moment("20111031 01:00", "YYYYMMDD hh:mm"),
                endTime: moment("20111031 03:00", "YYYYMMDD hh:mm"),
              },
            ],
            csvBookingsOnThisDay: [
              {
                startTime: moment("20111031 01:00", "YYYYMMDD hh:mm"),
                endTime: moment("20111031 03:00", "YYYYMMDD hh:mm"),
              },
            ],
          }}
        ></BookingsTableRow>
      </tbody>
    </table>
  );
  expect(screen.getByTestId("current-booking")).toHaveStyle("background-color: green");
});

it("if current and new bookings do not overlap this hour, they should not be highlighted", () => {
  const tree = render(
    <table>
      <tbody>
        <BookingsTableRow
          hourToRender={moment("20111031 02:00", "YYYYMMDD hh:mm")}
          calendarDay={{
            bookingsOnThisDay: [
              {
                startTime: moment("20111031 06:00", "YYYYMMDD hh:mm"),
                endTime: moment("20111031 07:00", "YYYYMMDD hh:mm"),
              },
            ],
            csvBookingsOnThisDay: [
              {
                startTime: moment("20111031 06:30", "YYYYMMDD hh:mm"),
                endTime: moment("20111031 07:30", "YYYYMMDD hh:mm"),
              },
            ],
          }}
        ></BookingsTableRow>
      </tbody>
    </table>
  );
  expect(screen.getByTestId("current-booking")).toHaveStyle("background-color: initial");
});

