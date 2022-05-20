import React, { useEffect, useState } from "react";
import "./App.css";
import Customer from "./components/Customers";
import CustomerAdd from "./components/CustomerAdd";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
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
  progress: {
    margin: createTheme().spacing(2),
  },
});

const App = ({ classes }) => {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);

  const stateRefresh = () => {
    setCustomers([]);
    setCompleted(0);
    callApi()
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  };

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    let percentage = 0;
    setInterval(() => {
      if (percentage >= 200) {
        percentage = 0;
      } else {
        percentage = percentage + 1;
      }
      setCompleted(percentage);
    }, 20);
    callApi()
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
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
            {customers.length !== 0 ? (
              customers.map((c) => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell>
                    <CircularProgress
                      className={classes.progress}
                      variant="determinate"
                      value={completed}
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
};

export default withStyles(styles)(App);
