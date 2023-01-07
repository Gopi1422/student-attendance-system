import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  Typography,
  styled,
  Button,
  TextField,
} from "@mui/material";
import { editStudent, getStudentData } from "../service/api";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  name: "",
  _id: "",
};

const EditStudent = () => {
  const [student, setStudent] = useState(defaultValue);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    const response = await getStudentData(id);
    setStudent(response.data);
  };
  const onValueChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const editStudentDetails = async () => {
    await editStudent(student);
    navigate("/all");
  };
  return (
    <Container>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Edit Student
      </Typography>
      <FormControl>
        <TextField
          name="name"
          label="Student Name"
          value={student.name}
          onChange={(e) => onValueChange(e)}
        />
      </FormControl>
      <FormControl>
        <TextField
          name="_id"
          label="Roll Number"
          value={student._id}
          onChange={(e) => onValueChange(e)}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => editStudentDetails()}>
          Edit Student
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditStudent;
