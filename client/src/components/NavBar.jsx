import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = styled(AppBar)`
  background-color: #111111;
`;

const Tabs = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  return (
    <Header position="sticky">
      <Toolbar>
        <Tabs to="/">
          <Typography variant="h6" component="div" sx={{ minWidth: 200 }}>
            AttendanceSystem
          </Typography>
        </Tabs>
        <Tabs to="/all" sx={{ minWidth: 100 }}>
          All Students
        </Tabs>
        <Tabs to="/add" sx={{ minWidth: 100 }}>
          Add Student
        </Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
