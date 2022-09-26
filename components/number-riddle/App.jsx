import Game from "./Game";
import Levels from "./Levels";
import { useSelector } from "react-redux";
function App() {
  const { showGame } = useSelector((state) => state.numberRiddle);
  return (
    <div>
      {!showGame && <Levels />}
      {showGame && <Game />}
    </div>
  );
}

export default App;
