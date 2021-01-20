import axios from "axios";

const apiUrl = "http://localhost:3001";

export async function getBookings() {
  const response = await axios.get(`${apiUrl}/bookings`);
  return response.data;
}

export async function postBookings(bookings) {
  try {
    await axios.post(`${apiUrl}/bookings`, {
      bookings,
    });
    
    
  } catch (error) {
    console.error(error);
  }
}
