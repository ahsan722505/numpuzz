import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../reduxStore/globalSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.global);
  const handleClose = () => {
    dispatch(setNotification(null));
  };
  return (
    <Snackbar
      open={notification}
      autoHideDuration={6000}
      onClose={handleClose}
      message={notification?.message}
    />
  );
};

export default Notification;
