import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Result = ({ showResult, toggleResult }) => {
  return (
    <Dialog
      open={showResult}
      onClose={toggleResult}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText
          sx={{ textAlign: "center", fontSize: "1.8rem" }}
          id="alert-dialog-description"
        >
          You win!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleResult}>Leave</Button>
        <Button onClick={toggleResult}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Result;
