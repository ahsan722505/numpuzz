import  Game  from './Game'
import Levels from './Levels'
import { useContext} from 'react'
import GameContext from "../../store/number-riddle/GameContext";
import { useSelector } from 'react-redux';
function App() {
  // const {showGame}=useContext(GameContext);
  const {showGame}=useSelector(state=> state.numberRiddle)
  return (
    <div>
      { !showGame && <Levels/>}
      {  showGame && <Game/>}
    </div>
  )
}

export default App
