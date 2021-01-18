import moment from "moment";
import { isBetween } from "./IsBetween";

export const getCalendarDays = (bookings, csvBookings) => {
  const days = 10;
  const calendarDays = [];
  for (let i = 0; i < days; i++) {
    const day = (i+1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const calendarDay = moment(`2018-03-${day}T00:00:00`);
    const hours = getHoursInDay(calendarDay);
    let bookingsOnThisDay = getBookingsOnDate(bookings, calendarDay);
    let csvBookingsOnThisDay = getBookingsOnDate(csvBookings, calendarDay);

    for(const csvBooking of csvBookingsOnThisDay){
      for(const booking of bookingsOnThisDay){
        if(isBetween(csvBooking.startTime, booking.startTime, booking.endTime )){
          csvBooking.isOverlappingBooking = true;
        }
        else if(isBetween(csvBooking.endTime, booking.startTime, booking.endTime)){
          csvBooking.isOverlappingBooking = true;
        }
      }
    }

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
