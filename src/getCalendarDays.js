import moment from "moment";

export const getCalendarDays = (bookings, csvBookings) => {
  const days = 10;
  const calendarDays = [];
  for (let i = 0; i < days; i++) {
    const day = (i+1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const calendarDay = moment(`2018-03-${day}T00:00:00`);
    const hours = getHoursInDay(calendarDay);
    let bookingsOnThisDay = getBookingsOnDate(bookings, calendarDay);
    let csvBookingsOnThisDay = getBookingsOnDate(csvBookings, calendarDay);
    calendarDays.push({
      day: calendarDay,
      hours,
      bookingsOnThisDay,
      csvBookingsOnThisDay,
    });
  }
  return calendarDays;
};

const getBookingsOnDate = (bookings, date) => {
  let matchingBookings = [];
  for (const booking of bookings) {
    const bookingDate = moment(booking.time);
    if (bookingDate.format("L") === date.format("L")) {
      matchingBookings.push({ startTime: booking.startTime, endTime: booking.endTime, isOverlappingBooking: booking.isOverlappingBooking });
    }
  }
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
