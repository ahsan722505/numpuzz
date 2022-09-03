import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import styles from "./AccountInfo.module.scss";
import Menu from "@mui/material/Menu";
import { ListItemIcon, MenuItem } from "@mui/material";
import { useState } from "react";
import { Util } from "../../helpers/GlobalUtil";
const AccountInfo = () => {
  const { username, photo } = useSelector((state) => state.global);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutHandler = () => {
    Util.deleteCookie("token");
    location.reload();
  };
  return (
    <>
      <div className={styles.profile} onClick={handleClick}>
        <ProfileImage src={photo} />
        <div>{username}</div>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountInfo;
