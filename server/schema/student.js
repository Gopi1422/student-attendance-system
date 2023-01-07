const mongoose = require("mongoose");
const Attendance = require("../schema/attendance");

var schema = new mongoose.Schema(
  {
    // _id: false,
    name: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
    },
  },
  { collection: "students-data" },
  { autoIndex: false }
);

schema.pre("deleteOne", function (next) {
  // Remove all the assignment docs that reference the removed person.
  Attendance.deleteMany({ student: this.getQuery()["_id"] }, next);
});

const student = mongoose.model("students-data", schema);

module.exports = student;
