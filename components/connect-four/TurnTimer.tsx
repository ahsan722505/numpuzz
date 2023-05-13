import React, { useEffect, useMemo, useRef, useState } from "react";
import useConnectFourStore from "../../store/connect-four";
import ProfileImage from "../Auth/ProfileImage";
import styles from "./TurnTimer.module.scss";
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const TIME_LIMIT = 20;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
const calculateTimePassed = () => {
  const prevSnapShot = localStorage.getItem("connectFourTimeSnapShot");
  if (prevSnapShot) {
    const timePassed = Date.now() - parseInt(prevSnapShot);
    const v = Math.floor(timePassed / 1000);
    console.log("passed", v);
    return v;
  }
  return 0;
};
const TurnTimer = ({
  profileSrc,
  startTimer,
}: {
  profileSrc: string;
  startTimer: boolean;
}) => {
  const updateCurrentPlayer = useConnectFourStore(
    (state) => state.updateCurrentPlayer
  );
  const initialTimePassed = useMemo(() => calculateTimePassed(), []);
  const timePassed = useRef<number>(initialTimePassed);
  const intervalRef = useRef<NodeJS.Timer>();
  const [circleDasharray, setCircleDasharray] = useState<[number, number]>([
    getRemainingProgress(),
    283,
  ]);
  const [remainingPathColor, setRemainingPathColor] = useState<string>(
    getRemainingPathColor
  );
  console.log("circle", circleDasharray);

  function calculateTimeFraction(timeLeft: number) {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  function getRemainingProgress() {
    return (
      calculateTimeFraction(TIME_LIMIT - timePassed.current) * FULL_DASH_ARRAY
    );
  }
  function getRemainingPathColor() {
    const timeLeft = TIME_LIMIT - timePassed.current;
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) return alert.color;
    else if (timeLeft <= warning.threshold) return warning.color;
    else return info.color;
  }
  function readTimeSnapShotFromDisk() {
    return localStorage.getItem("connectFourTimeSnapShot");
  }
  console.log("start", startTimer);

  useEffect(() => {
    if (startTimer) {
      if (!readTimeSnapShotFromDisk()) {
        console.log("turn started");

        localStorage.setItem("connectFourTimeSnapShot", Date.now().toString());
      }
      intervalRef.current = setInterval(() => {
        timePassed.current += 1;
        const timeLeft = TIME_LIMIT - timePassed.current;
        setCircleDasharray([getRemainingProgress(), 283]);
        setRemainingPathColor(getRemainingPathColor());
        if (timeLeft === 0) {
          console.log("turn ended");
          updateCurrentPlayer();
          setCircleDasharray([283, 283]);
          timePassed.current = 0;
          setRemainingPathColor(COLOR_CODES.info.color);
          localStorage.removeItem("connectFourTimeSnapShot");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  return (
    <div className={styles.baseTimer}>
      <svg
        className={styles.baseTimerSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.baseTimerCircle}>
          <circle
            className={styles.baseTimerPathElapsed}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            style={{ color: startTimer && remainingPathColor }}
            stroke-dasharray={`${circleDasharray[0]} ${circleDasharray[1]}`}
            className={styles.baseTimerPathRemaining}
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          ></path>
        </g>
      </svg>
      <ProfileImage
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          height: "85%",
        }}
        src={profileSrc}
      />
    </div>
  );
};

export default TurnTimer;
