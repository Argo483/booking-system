const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // so that app can access

const convertBookingToStorageFormat = (bookingRecord) => {};

let bookings = JSON.parse(fs.readFileSync("./server/bookings.json")).map(() => {
  return {
    time: Date.parse(bookingRecord.time),
    duration: bookingRecord.duration * 60 * 1000, // mins into ms
    userId: bookingRecord.user_id,
  };
});

app.get("/bookings", (_, res) => {
  res.json(bookings);
});

app.use(bodyParser.json({ extended: true }));

const isValidBody = (body) => {
  for (const booking of body.bookings) {
    if (
      isNaN(booking.time) ||
      isNaN(booking.duration) ||
      typeof booking.userId !== "string"
    ) {
      return false;
    }
  }
  return true;
};

app.post("/bookings", (request, response) => {
  if (isValidBody(request.body)) {
    bookings = request.body.bookings.map((bookingRecord) => {
      return {
        time: bookingRecord.time,
        duration: bookingRecord.duration * 60 * 1000, // mins into ms
        userId: bookingRecord.userId,
      };
    });
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
});

app.listen(3001);
