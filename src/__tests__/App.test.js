import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

import * as apiRequests from "../apiRequests";
import * as DropZone from "react-dropzone";

const getBookingsResult = [{ time: 2318938183, duration: 18000, userId: "1" }];

const getBookingsSpy = jest
  .spyOn(apiRequests, "getBookings")
  .mockImplementation(() => {
    return getBookingsResult;
  });

const postBookingsSpy = jest
  .spyOn(apiRequests, "postBookings")
  .mockImplementation(() => {});

afterEach(() => {
    getBookingsSpy.mockClear()
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
  expect(postBookingsSpy).toHaveBeenCalledWith(getBookingsResult);
});


it("reload bookings button should fetch bookings again", async () => {
    render(<App></App>);
    await fetchResponseReceived();
    expect(getBookingsSpy).toHaveBeenCalledTimes(1);
    screen.getByTestId("reload-bookings-button").click();
    expect(getBookingsSpy).toHaveBeenCalledTimes(2);
  });
  