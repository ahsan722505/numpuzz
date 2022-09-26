import React from "react";
import styles from "./BackButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { endGame } from "../../reduxStore/NumberRiddleSlice";
const BackButton = ({ home, riddleHome }) => {
  const { play, other } = useSelector((state) => state.numberRiddle);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <button
      className={`${styles.back} pointer`}
      onClick={() => {
        if (play) {
          other.currentTime = 0;
          other.play();
        }
        if (home) router.replace("/");
        else if (riddleHome) router.replace("/number-riddle");
        else dispatch(endGame());
      }}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export default BackButton;
