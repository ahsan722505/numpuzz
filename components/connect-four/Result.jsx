import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Result = ({ showResult, toggleResult, MyTurn, playAgain, LeaveGame }) => {
  const status = MyTurn() ? "You Won!" : "You Lost!";
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
          {status}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={LeaveGame}>Leave</Button>
        <Button onClick={playAgain}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Result;
