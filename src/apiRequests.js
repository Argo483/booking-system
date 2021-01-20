import axios from "axios";

const apiUrl = "http://localhost:3001";

export async function getBookings() {
  const response = await axios.get(`${apiUrl}/bookings`);
  return response.data;
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
      console.error(error);
    });
}
