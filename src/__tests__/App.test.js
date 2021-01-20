import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

import * as apiRequests from "../apiRequests";
import * as DropZone from "react-dropzone";

const fetchBookingsResult = [{ time: 2318938183, duration: 18000, userId: "1" }];

const fetchBookingsSpy = jest
  .spyOn(apiRequests, "fetchBookings")
  .mockImplementation(() => {
    return fetchBookingsResult;
  });

const postBookingsSpy = jest
  .spyOn(apiRequests, "postBookings")
  .mockImplementation(() => {});
// const dropzoneSpy = jest
//   .spyOn(DropZone, "DropZone")
//   .mockImplementation(() => {
//     return <div />;
//   });

// beforeEach(() => {
//   jest.mock("../apiRequests", () => ({
//     fetchBookings: jest.fn(),
//     postBookings: jest.fn(),
//   }));
// });

afterEach(() => {
    fetchBookingsSpy.mockClear()
});
const fetchResponseReceived = () => new Promise(setImmediate);

it("should render app with bookings from fetch", () => {
  const tree = renderer.create(<App></App>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("when user clicks save bookings, it should send the current bookings in a post request", async () => {
  render(<App></App>);
  await fetchResponseReceived();
  screen.getByTestId("save-bookings-button").click();
  expect(postBookingsSpy).toHaveBeenCalled();
  expect(postBookingsSpy).toHaveBeenCalledWith(fetchBookingsResult);
});


it("reload bookings button should fetch bookings again", async () => {
    render(<App></App>);
    await fetchResponseReceived();
    expect(fetchBookingsSpy).toHaveBeenCalledTimes(1);
    screen.getByTestId("reload-bookings-button").click();
    expect(fetchBookingsSpy).toHaveBeenCalledTimes(2);
  });
  