import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import useConnectFourStore from "../../store/connect-four";

const Result = ({
  playAgain,
  leaveGame,
}: {
  playAgain: () => void;
  leaveGame: () => void;
}) => {
  const resultStatus = useConnectFourStore((state) => state.resultStatus);
  const setResultStatus = useConnectFourStore((state) => state.setResultStatus);
  return (
    <Dialog
      open={Boolean(resultStatus)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText
          sx={{ textAlign: "center", fontSize: "1.8rem" }}
          id="alert-dialog-description"
        >
          {resultStatus}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={leaveGame}>Leave</Button>
        <Button onClick={playAgain}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Result;
