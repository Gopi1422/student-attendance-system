const Student = require("../schema/student");
const Attendance = require("../schema/attendance");

exports.addStudent = async (req, res) => {
  const student = req.body;
  console.log(student);

  const newStudent = new Student(student);

  try {
    await newStudent.save();
    console.log(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    const attendance = await Attendance.find({});

    const getIsSelected = {};
    const getPresentCount = {};
    const result = { getIsSelected, getPresentCount };

    attendance.forEach((element) => {
      if (element.checkOut === null && element.checkIn !== null) {
        getIsSelected[element._id] = true;
      } else {
        getIsSelected[element._id] = false;
      }
    });

    let datetime = new Date();
    var date = `${formatTwoDigits(datetime.getDate())}/${formatTwoDigits(
      datetime.getMonth() + 1
    )}/${datetime.getFullYear()}`;

    const count = await Attendance.find({
      date: date,
      isPresent: true,
    }).count();
    getPresentCount.count = count;
    getPresentCount.date = date;
    console.log(getPresentCount.count);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    await Attendance.find({})
      .populate("student")
      .sort({ date: -1, _id: 1 })
      .exec(function (err, data) {
        if (err) return res.status(404).json({ message: error.message });
        console.log(data);
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getStudentOnDate = async (req, res) => {
  try {
    let date = req.params.date;
    console.log(date);
    date = date.replaceAll("-", "/");
    console.log(date);
    await Attendance.find({ date: date })
      .populate("student")
      .sort({ _id: 1 })
      .exec(function (err, data) {
        if (err) return res.status(404).json({ message: error.message });
        console.log(data);
        res.status(200).json(data);
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getStudentData = async (req, res) => {
  try {
    console.log(req.params.id);
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.editStudent = async (req, res) => {
  const student = req.body;

  const updatedStudent = new Student(student);

  try {
    await Student.updateOne({ _id: student._id }, updatedStudent);
    res.status(201).json(updatedStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
