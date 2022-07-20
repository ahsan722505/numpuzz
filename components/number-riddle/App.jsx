import  Game  from './Game'
import Levels from './Levels'
import { useContext} from 'react'
import GameContext from "../../store/number-riddle/GameContext";
function App() {
  const {showGame}=useContext(GameContext);
  return (
    <div>
      { !showGame && <Levels/>}
      {  showGame && <Game/>}
    </div>
  )
}

export default App
