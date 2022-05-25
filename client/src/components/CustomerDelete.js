import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CustomerDelete = ({ id, stateRefresh }) => {
  const [open, setOpen] = useState(false);

  const deleteCustomer = (event) => {
    event.preventDefault();
    const url = "/api/customers/" + event.target.value;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        value={id}
      >
        삭제
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle onClose={handleClickClose}>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={deleteCustomer}
            value={id}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
