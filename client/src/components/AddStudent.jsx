import { useState } from "react";
import {
  FormGroup,
  FormControl,
  Typography,
  styled,
  Button,
  TextField,
  ToggleButton,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { addStudent, addAttendance } from "../service/api";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  date: dayjs(new Date()),
  checkIn: null,
  checkOut: null,
};

const AddStudent = () => {
  const [student, setStudent] = useState();
  const [attendance, setAttendance] = useState(defaultValue);
  const [selected, setSelected] = useState(false);
  const [text, setText] = useState("Check In");
  const [value, setValue] = useState(dayjs(new Date())); // dayjs("2014-08-18T21:11:54")
  const formatTwoDigits = (digit) => ("0" + digit).slice(-2);

  const navigate = useNavigate();
  const onValueChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handleChange = (newValue) => {
    setAttendance({ ...attendance, date: newValue });
    setValue(newValue);
  };

  const addStudentDetails = async () => {
    const datetime = new Date(attendance.date);
    attendance.date = `${formatTwoDigits(datetime.getDate())}/${formatTwoDigits(
      datetime.getMonth() + 1
    )}/${datetime.getFullYear()}`;
    if (attendance.checkIn) {
      attendance.checkIn = `${formatTwoDigits(
        datetime.getHours()
      )}:${formatTwoDigits(datetime.getMinutes())}:${formatTwoDigits(
        datetime.getSeconds()
      )}`;
      attendance.isPresent = true;
    } else {
      attendance.checkIn = null;
    }
    attendance.student = student._id;

    await addStudent(student);
    await addAttendance(attendance);
    navigate("/all");
  };
  return (
    <Container>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Add Student
      </Typography>
      <FormControl>
        <TextField
          name="name"
          label="Student Name"
          onChange={(e) => onValueChange(e)}
        />
      </FormControl>
      <FormControl>
        <TextField
          name="_id"
          label="Roll Number"
          onChange={(e) => onValueChange(e)}
        />
      </FormControl>
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="DD/MM/YYYY"
            value={value}
            name="date"
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl>
        <ToggleButton
          name="checkIn"
          value="check"
          style={{
            backgroundColor: selected ? "#2e7d32" : "#fff",
            color: selected ? "#fff" : "#2e7d32",
          }}
          selected={selected}
          onChange={() => {
            if (!selected) setText("Check Out");
            else setText("Check In");
            setAttendance({ ...attendance, checkIn: !selected });
            setSelected(!selected);
          }}
        >
          <Typography>{text}</Typography>
        </ToggleButton>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => addStudentDetails()}>
          Add Student
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddStudent;
