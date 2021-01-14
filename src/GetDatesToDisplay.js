import moment from "moment";

export const getDatesToDisplay = (bookings, csvBookings) => {
  const days = 10;
  const datesToDisplay = [];
  for (let i = 0; i < days; i++) {
    const timelineDate = moment(i + 1 + "Mar 2018");
    const hours = getHoursInDay(timelineDate);
    let bookingsOnThisDay = getBookingsOnDate(bookings, timelineDate);
    let csvBookingsOnThisDay = getBookingsOnDate(csvBookings, timelineDate);

    datesToDisplay.push({
      timelineDate,
      hours,
      bookingsOnThisDay,
      csvBookingsOnThisDay,
    });
  }
  return datesToDisplay;
};

const getBookingsOnDate = (bookings, date) => {
  let matchingBookings = [];
  for (const booking of bookings) {
    const bookingDate = moment(booking.time);
    if (bookingDate.format("L") === date.format("L")) {
      const startTime = bookingDate;
      const endTime = bookingDate.clone().add(booking.duration, "minutes");
      matchingBookings.push({ startTime, endTime });
    }
  }
  console.log(matchingBookings);
  return matchingBookings;
};

const getHoursInDay = (date) => {
  var result = [];
  let hour = date.startOf("day");
  result.push(hour);
  for (var i = 0; i < 23; i++) {
    hour = hour.clone().add(1, "hour");
    result.push(hour);
  }
  return result;
};
