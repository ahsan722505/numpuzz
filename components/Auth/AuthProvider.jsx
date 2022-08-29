import React from "react";
import styles from "./AuthProvider.module.scss";
const AuthProvider = ({ name, icon }) => {
  const googleHandler = () => {
    window.open(
      `http://localhost:8080/auth/google/?returnTo=${window.location.href}`,
      "_self"
    );
  };
  return (
    <div className={styles.provider} onClick={googleHandler}>
      <div>{icon}</div>
      <div>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default AuthProvider;
