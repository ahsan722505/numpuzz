import { InputLabel, MenuItem,TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import { useState } from 'react';
import styles from "./Leaderboard.module.scss";
const LeaderBoard=()=>{
    const [size,setSize]=useState(null);
    const handleChange=(e)=> setSize(e.target.value)
    const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused,label {
    color: rgba(255, 255, 255, 0.5);
  }
  & .MuiSvgIcon-root{
    color : white;
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
  & .MuiSelect-select{
    color : white;
  }
`;
    return (
        <div className={styles.board}>
            <h1>Top users with best scores</h1>
            <div className={styles.tableCont}>
                <WhiteBorderTextField
                value={size}
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
                    <tr>
                        <td>#1</td>
                        <td>Ahsan</td>
                        <td>00:11</td>
                    </tr>
                    <tr>
                        <td>#2</td>
                        <td>Jav</td>
                        <td>00:13</td>
                    </tr>
            </table>
            </div>
            
        </div>
    )
}
export default LeaderBoard;