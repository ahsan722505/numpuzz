import React, { useEffect, useRef } from "react";
import useConnectFourStore from "../../store/connect-four";
import ProfileImage from "../Auth/ProfileImage";
import styles from "./TurnTimer.module.scss";

const TurnTimer = ({
  profileSrc,
  gameId,
}: {
  profileSrc: string;
  gameId: 1 | 2;
}) => {
  const currentPlayer = useConnectFourStore((state) => state.currentPlayer);
  const startTimer = currentPlayer && gameId && currentPlayer === gameId;
  console.log("startTimer", startTimer);
  const intervalRef = useRef<NodeJS.Timer>(null);
  const key = gameId ? `timer${gameId}` : "timer1";
  console.log("key", key);
  console.log("gameId", gameId);
  const { circleDashArray, remainingPathColor } = useConnectFourStore(
    (state) => state[key]
  );
  const updateTimer = useConnectFourStore((state) => state.updateTimer);

  useEffect(() => {
    if (startTimer) {
      intervalRef.current = setInterval(() => {
        updateTimer(gameId);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
            stroke-dasharray={`${circleDashArray[0]} ${circleDashArray[1]}`}
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
