import React, { useEffect, useRef, useState } from "react";
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
  const timePassed = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timer>();
  const [circleDasharray, setCircleDasharray] = useState<[number, number]>([
    283, 283,
  ]);
  const [remainingPathColor, setRemainingPathColor] = useState<string>(
    COLOR_CODES.info.color
  );

  function calculateTimeFraction(timeLeft: number) {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  useEffect(() => {
    if (startTimer) {
      intervalRef.current = setInterval(() => {
        timePassed.current += 1;
        const timeLeft = TIME_LIMIT - timePassed.current;
        setCircleDasharray([
          calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY,
          283,
        ]);
        const { alert, warning } = COLOR_CODES;
        if (timeLeft <= alert.threshold) setRemainingPathColor(alert.color);
        else if (timeLeft <= warning.threshold)
          setRemainingPathColor(warning.color);

        if (timeLeft === 0) updateCurrentPlayer();
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      setCircleDasharray([283, 283]);
      timePassed.current = 0;
      setRemainingPathColor(COLOR_CODES.info.color);
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
