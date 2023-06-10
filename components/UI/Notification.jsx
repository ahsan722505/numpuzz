import { Snackbar } from "@mui/material";
import React from "react";
import useGlobalStore from "../../store/global";

const Notification = () => {
  const setNotification = useGlobalStore((state) => state.setNotification);
  const notification = useGlobalStore((state) => state.notification);
  const handleClose = () => {
    setNotification(null);
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
