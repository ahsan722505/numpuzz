import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Reset.module.scss";
import { useSelector } from "react-redux";

const Reset = ({ setResetGame }) => {
  const { play, other } = useSelector((state) => state.numberRiddle);

  return (
    <div
      className={`${styles.reset} pointer`}
      onClick={() => {
        if (play) {
          other.currentTime = 0;
          other.play();
        }
        setResetGame((state) => state + 1);
      }}
    >
      <FontAwesomeIcon icon={faArrowsRotate} />
    </div>
  );
};

export default Reset;
