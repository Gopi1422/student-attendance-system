const express = require("express");

const {
  addStudent,
  getStudent,
  getStudentOnDate,
  getStatus,
  getStudentData,
  editStudent,
  deleteStudent,
} = require("../controller/student");
const { recordAttendance, addAttendance } = require("../controller/attendance");

const router = express.Router();

router.post("/add", addStudent);
router.get("/all", getStudent);
router.get("/all/:date", getStudentOnDate);
router.get("/status", getStatus);
router.get("/:id", getStudentData);
router.put("/:id", editStudent);
router.delete("/:id", deleteStudent);
router.post("/recordattendance", recordAttendance);
router.post("/addattendance", addAttendance);

module.exports = router;
