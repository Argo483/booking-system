import moment from "moment";

export const getDatesToDisplay = (bookings) => {
  const days = 10;
  const datesToDisplay = [];
  for (let i = 0; i < days; i++) {
    const timelineDate = moment(i + 1 + "Mar 2018");
    let hasBooking = false;
    const hours = getHoursInDay(timelineDate);
    let bookingStartTime;
    let bookingEndTime;
    for (const booking of bookings) {
      const bookingDate = moment(booking.time);
      if (bookingDate.format("L") === timelineDate.format("L")) {
        bookingStartTime = bookingDate;
        bookingEndTime = bookingDate.clone().add(booking.duration, "minutes");
        hasBooking = true;
      }
    }
    datesToDisplay.push({
      timelineDate,
      hasBooking,
      hours,
      bookingStartTime,
      bookingEndTime,
    });
  }
  return datesToDisplay;
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