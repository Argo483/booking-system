import moment from "moment";
import axios from "axios";
import { postBookings, getBookings } from "../apiRequests";

jest.mock("axios");
const axiosPostSpy = jest.spyOn(axios, "post");
const axiosGetSpy = jest.spyOn(axios, "get");

it("should post bookings using axios", () => {
  axios.post.mockImplementation(() => Promise.resolve());
  const bookings = [
    {
      time: moment("20111031 01:00", "YYYYMMDD hh:mm"),
      duration: 180,
      userId: "123",
    },
  ];
  postBookings(bookings);
  expect(axiosPostSpy).toHaveBeenCalledWith("http://localhost:3001/bookings", {
    bookings: bookings,
  });
});

it("should get bookings using axios", async () => {
  const mockBookings = [
    {
      time: moment("20111031 01:00", "YYYYMMDD hh:mm"),
      duration: 180,
      userId: "123",
    },
  ];
  axios.get.mockImplementation(() => Promise.resolve({ data: mockBookings }));
  const bookings = await getBookings();
  expect(axiosGetSpy).toHaveBeenCalledWith("http://localhost:3001/bookings");
  expect(bookings).toEqual(mockBookings);
});
