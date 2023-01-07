import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  styled,
  Button,
  ToggleButton,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CoPresentIcon from "@mui/icons-material/CoPresent";

import {
  getStudent,
  deleteStudent,
  recordAttendance,
  getStatus,
} from "../service/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Heading = styled(Typography)`
  margin: 15px 10px 0px 10px;
  text-align: center;
  font-style: bold;
`;

const StyledTable = styled(Table)`
  width: 90%;
  margin: 30px auto 0 auto;
`;

const THead = styled(TableHead)`
  background-color: #111111;
  & > tr > th {
    color: #fff;
    font-size: 15px;
    position: sticky;
    top: 0;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 15px;
  }
`;

const AllStudent = () => {
  const [, setUpdatedRecord] = useState({});
  const [attendances, setAttendances] = useState([]);
  const [selected, setSelected] = useState([]);
  const formatTwoDigits = (digit) => ("0" + digit).slice(-2);

  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = async () => {
    let response = await getStudent();
    setAttendances(response.data);
    response = await getStatus();
    console.log(response.data);
    setSelected(response.data.getIsSelected);
  };

  const deleteStudentData = async (id) => {
    await deleteStudent(id);
    getAllStudent();
  };

  const markAbsent = async (id, recordId, datetime) => {
    var date = `${formatTwoDigits(datetime.getDate())}/${formatTwoDigits(
      datetime.getMonth() + 1
    )}/${datetime.getFullYear()}`;
    const attendance = {
      _id: recordId,
      isPresent: false,
      student: id,
      date: date,
      checkIn: null,
      checkOut: null,
    };
    const response = await recordAttendance(attendance);
    setSelected({ ...selected, [recordId]: false });
    const updObj = attendances.findIndex(
      (attendance) => attendance._id === recordId
    );
    attendances[updObj] = response.data;
    console.log(response.data);
  };

  const recordAttendanceData = async (
    id,
    recordId,
    datetime,
    checkIn,
    checkOut
  ) => {
    var date = `${formatTwoDigits(datetime.getDate())}/${formatTwoDigits(
      datetime.getMonth() + 1
    )}/${datetime.getFullYear()}`;
    var time = `${formatTwoDigits(datetime.getHours())}:${formatTwoDigits(
      datetime.getMinutes()
    )}:${formatTwoDigits(datetime.getSeconds())}`;
    console.log(selected[recordId]);
    const attendance = {
      _id: recordId,
      isPresent: true,
      student: id,
      date: date,
      checkIn: checkIn,
      checkOut: checkOut,
    };

    if (selected[recordId] === true) {
      attendance.checkOut = time;
      setSelected({ ...selected, [recordId]: false });
    } else {
      attendance.checkIn = time;
      setSelected({ ...selected, [recordId]: true });
    }
    const response = await recordAttendance(attendance);
    setUpdatedRecord(response.data);
    const updObj = attendances.findIndex(
      (attendance) => attendance._id === recordId
    );
    attendances[updObj] = response.data;
    console.log(response.data);
  };

  return (
    <>
      <Heading variant="h5" component="div">
        All Attendance Record
      </Heading>
      <StyledTable>
        <THead>
          <TableRow>
            <TableCell>Roll No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>CheckIn Time</TableCell>
            <TableCell>CheckOut Time</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Check In/Out</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </THead>
        <TableBody>
          {attendances.map((attendance) => (
            <TRow key={attendance._id}>
              <TableCell>{attendance.student._id}</TableCell>
              <TableCell>{attendance.student.name}</TableCell>
              <TableCell>{attendance.date}</TableCell>
              <TableCell>{attendance.checkIn || "---"}</TableCell>
              <TableCell>{attendance.checkOut || "---"}</TableCell>
              <TableCell>
                {attendance.isPresent ? "Present" : "Absent"}
              </TableCell>
              <TableCell>
                <ToggleButton
                  value="check"
                  selected={selected[attendance._id]}
                  style={{
                    backgroundColor: selected[attendance._id]
                      ? "#2e7d32"
                      : "#fff",
                    color: selected[attendance._id] ? "#fff" : "#2e7d32",
                  }}
                  onChange={() => {
                    recordAttendanceData(
                      attendance.student._id,
                      attendance._id,
                      new Date(),
                      attendance.checkIn,
                      attendance.checkOut
                    );
                  }}
                >
                  <CheckIcon />
                </ToggleButton>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CoPresentIcon />}
                  onClick={() =>
                    markAbsent(
                      attendance.student._id,
                      attendance._id,
                      new Date()
                    )
                  }
                >
                  Absent
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{ marginLeft: 10, marginRight: 10 }}
                  component={Link}
                  to={`/edit/${attendance.student._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => deleteStudentData(attendance.student._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllStudent;
