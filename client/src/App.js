import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customers";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/system";

const styles = () => ({
  root: {
    width: "100%",
    marginTop: createTheme().spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

const App = ({ classes }) => {
  const [customers, setCustomers] = useState([]);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    console.log(body);
    return body;
  };

  useEffect(() => {
    callApi().then((data) => setCustomers(data));
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c) => (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(App);
