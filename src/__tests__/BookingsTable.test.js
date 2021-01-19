import React from "react";
import renderer from "react-test-renderer";
import moment from "moment";
import { BookingsTable } from "../BookingsTable";
import "@testing-library/jest-dom/extend-expect";

it("should render multiple calendar days", () => {
  const tree = renderer
    .create(
      <BookingsTable
        calendarDays={[getMockCalendarDay(), getMockCalendarDay()]}
      ></BookingsTable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const getMockCalendarDay = () => {
  const hourToRender = moment("20111031 01:00", "YYYYMMDD hh:mm");
  return {
    hourToRender,
    day: moment("20111031 00:00", "YYYYMMDD hh:mm"),
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
    hours: [hourToRender],
  };
};
