import React from "react";
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

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "신혜림",
    birthday: "961210",
    gender: "남자",
    job: "배달의민족",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "정가연",
    birthday: "970531",
    gender: "남자",
    job: "넥센타이어",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이현주",
    birthday: "980218",
    gender: "남자",
    job: "더존",
  },
];

const App = ({ classes }) => {
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
