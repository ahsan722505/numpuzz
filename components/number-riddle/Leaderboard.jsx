import { MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderBoardSize } from "../../reduxStore/NumberRiddleSlice";
import ProfileImage from "../Auth/ProfileImage";
import BackButton from "./BackButton";
import Login from "../Auth/Login";
import styles from "./Leaderboard.module.scss";
import useGlobalStore from "../../store/global";
const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused,
  label {
    color: rgba(255, 255, 255, 0.5);
  }
  & .MuiSvgIcon-root {
    color: white;
  }
  &:hover .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
  & .MuiSelect-select {
    color: white;
  }
`;
const LeaderBoard = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(setLeaderBoardSize(e.target.value));
  const { leaderBoardData, leaderBoardSize } = useSelector(
    (state) => state.numberRiddle
  );
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  return (
    <div className={styles.board}>
      <div>
        <BackButton riddleHome={true} />
        <h1>Top users with best scores</h1>
        {!isLoggedIn && (
          <Login style={{ position: "absolute", top: "-6px", right: "10px" }} />
        )}
      </div>
      <div className={styles.tableCont}>
        <WhiteBorderTextField
          value={leaderBoardSize}
          onChange={handleChange}
          select
          label="size"
          className={styles.select}
        >
          <MenuItem value={3}>3x3</MenuItem>
          <MenuItem value={4}>4x4</MenuItem>
          <MenuItem value={5}>5x5</MenuItem>
          <MenuItem value={6}>6x6</MenuItem>
          <MenuItem value={7}>7x7</MenuItem>
          <MenuItem value={8}>8x8</MenuItem>
        </WhiteBorderTextField>
        <table>
          <tr>
            <th>Position</th>
            <th>User</th>
            <th>Time</th>
          </tr>
          {leaderBoardData[leaderBoardSize]?.map((each, i) => (
            <tr key={i}>
              <td>#{i + 1}</td>
              <td className={styles.profile}>
                <span>
                  <ProfileImage src={each.photo} />
                </span>
                <span>{each.username}</span>
              </td>
              <td>{each.time}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default LeaderBoard;
