import axios from "axios";

const URL = "http://localhost:8000";

export const addStudent = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.log("Error while calling addStudent API: ", error);
  }
};

export const getStudent = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.log("Error while calling getStudent API: ", error);
  }
};

export const getStudentOnDate = async (date) => {
  try {
    date = date.replaceAll("/", "-");
    return await axios.get(`${URL}/all/${date}`);
  } catch (error) {
    console.log("Error while calling getStudentOnDate API: ", error);
  }
};

export const getStudentData = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling getStudentData API: ", error);
  }
};

export const getStatus = async () => {
  try {
    return await axios.get(`${URL}/status`);
  } catch (error) {
    console.log("Error while calling getStatus API: ", error);
  }
};

export const editStudent = async (student) => {
  try {
    return await axios.put(`${URL}/${student._id}`, student);
  } catch (error) {
    console.log("Error while calling editStudent API: ", error);
  }
};

export const deleteStudent = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling deleteStudent API: ", error);
  }
};

export const recordAttendance = async (attendance) => {
  try {
    return await axios.post(`${URL}/recordattendance`, attendance);
  } catch (error) {
    console.log("Error while calling recordAttendance API: ", error);
  }
};

export const addAttendance = async (data) => {
  try {
    return await axios.post(`${URL}/addattendance`, data);
  } catch (error) {
    console.log("Error while calling addAttendance API: ", error);
  }
};
