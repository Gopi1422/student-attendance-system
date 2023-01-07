const Attendance = require("../schema/attendance");

exports.recordAttendance = async (req, res) => {
  const attendance = req.body;
  console.log(attendance);

  const newAttendance = new Attendance(attendance);

  try {
    console.log(newAttendance);
    const doc = await Attendance.findOneAndUpdate(
      { _id: attendance._id },
      newAttendance,
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    ).populate("student");
    console.log(doc);
    res.status(201).json(doc);
  } catch (error) {
    console.log(error.code);
    if (error.code === 11000) {
      this.addAttendance(req, res);
    }
    res.status(409).json({ message: error.message });
  }
};

exports.addAttendance = async (req, res) => {
  const attendance = req.body;
  console.log(attendance);

  const newAttendance = new Attendance(attendance);

  try {
    const result = await (await newAttendance.save()).populate("student");
    console.log(result);
    // return newAttendance;
    res.status(201).json(result);
  } catch (error) {
    // return error;
    res.status(409).json({ message: error.message });
  }
};
