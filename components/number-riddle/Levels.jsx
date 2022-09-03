import React from "react";
import styles from "./Levels.module.scss";
import { useContext } from "react";
import GameContext from "../../store/number-riddle/GameContext";
import BackButton from "./BackButton";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../reduxStore/NumberRiddleSlice";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useRouter } from "next/router";
const Levels = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { play, other } = useSelector((state) => state.numberRiddle);
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
      </div>

      <div>
        <h1>Select Size of puzzle</h1>
        <ul>
          {[3, 4, 5, 6, 7, 8].map((each) => (
            <li
              key={each}
              onClick={() => {
                if (play) {
                  other.currentTime = 0;
                  other.play();
                }
                // startGame(each);
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
