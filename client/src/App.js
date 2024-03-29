import React, { useState, useEffect } from "react";
import Customer from "./components/Customers";
import CustomerAdd from "./components/CustomerAdd";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 1080,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});

const App = ({ classes }) => {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const cellList = [
    "번호",
    "이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];

  const stateRefresh = () => {
    setCustomers([]);
    setCompleted(0);
    setSearchKeyword("");
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

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return (
        <Customer
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
          stateRefresh={stateRefresh}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            고객 관리 시스템
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search .. "
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length !== 0 ? (
              filteredComponents(customers)
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
    </div>
  );
};

export default withStyles(styles)(App);
