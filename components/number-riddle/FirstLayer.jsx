import React from "react";
import BackButton from "./BackButton";
import Volume from "./Volume";
import styles from "./FirstLayer.module.scss";
import { useSelector } from "react-redux";
const FirstLayer = () => {
  const { gameDim } = useSelector((state) => state.numberRiddle);
  return (
    <div className={styles.firstLayer}>
      <BackButton />
      <div>
        {gameDim}x{gameDim}
      </div>
      <Volume />
    </div>
  );
};

export default FirstLayer;
