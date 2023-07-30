import React from "react";
import styles from "./Levels.module.scss";
import BackButton from "./BackButton";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../reduxStore/NumberRiddleSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Login from "../Auth/Login";
import StyledLink from "../UI/StyledLink";
import useGlobalStore from "../../store/global";
const Levels = () => {
  const dispatch = useDispatch();
  const { play, other } = useSelector((state) => state.numberRiddle);
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  return (
    <div className={styles.levels}>
      <div>
        <BackButton home={true} />
        <StyledLink href="/number-riddle/leaderboard">
          <FontAwesomeIcon
            icon={faArrowTrendUp}
            style={{ marginRight: ".3rem" }}
          />
          <span>Leaderboard</span>
        </StyledLink>
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
