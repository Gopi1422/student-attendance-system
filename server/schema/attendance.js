const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");

var attendanceSchema = new mongoose.Schema({
  isPresent: { type: Boolean, default: false },
  date: { type: String },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  student: { type: String, ref: "students-data" },
});

// --- for auto incremented id ---
// autoIncrement.initialize(mongoose.connection);
// attendanceSchema.plugin(autoIncrement.plugin, "attendance");

const studentAtendance = mongoose.model("attendance", attendanceSchema);

module.exports = studentAtendance;
