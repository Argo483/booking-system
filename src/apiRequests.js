import axios from "axios";

const apiUrl = "http://localhost:3001";

export async function fetchBookings() {
  const response = await fetch(`${apiUrl}/bookings`);
  return response.json();
}

export function postBookings(bookings) {
  axios
    .post(`${apiUrl}/bookings`, {
      bookings,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
