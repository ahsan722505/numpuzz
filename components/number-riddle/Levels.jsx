import React from "react";
import styles from "./Levels.module.scss";
import BackButton from "./BackButton";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../reduxStore/NumberRiddleSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useRouter } from "next/router";
import Login from "../Auth/Login";
const Levels = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { play, other } = useSelector((state) => state.numberRiddle);
  const { isLoggedIn } = useSelector((state) => state.global);
  return (
    <div className={styles.levels}>
      <div>
        <BackButton home={true} />
        <Button
          style={{ padding: ".5rem" }}
          onClick={() => router.push("/number-riddle/leaderboard")}
        >
          <span>
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </span>
          {"  "}
          <span>Leaderboard</span>
        </Button>
        {!isLoggedIn && <Login />}
      </div>

      <div>
        <ul>
          {[3, 4, 5, 6, 7, 8].map((each) => (
            <li
              key={each}
              onClick={() => {
                if (play) {
                  other.currentTime = 0;
                  other.play();
                }
                dispatch(startGame(each));
              }}
            >
              {each}x{each}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Levels;
