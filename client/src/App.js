import NavBar from "./components/NavBar";
import AttendanceSystem from "./components/AttendanceSystem";
import AddStudent from "./components/AddStudent";
import AllStudent from "./components/AllStudent";
import EditStudent from "./components/EditStudent";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AttendanceSystem />} />
        <Route path="/all" element={<AllStudent />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
