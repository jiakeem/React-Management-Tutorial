import React from "react";
import { TableRow, TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

const Customer = ({ id, image, name, birthday, gender, job, stateRefresh }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <img src={image} alt="profile" />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{birthday}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{job}</TableCell>
      <TableCell>
        <CustomerDelete id={id} stateRefresh={stateRefresh} />
      </TableCell>
    </TableRow>
  );
};

export default Customer;
