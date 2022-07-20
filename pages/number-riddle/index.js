import App from "../../components/number-riddle/App";
import {GameContextProvider} from "../../store/number-riddle/GameContext";
const index = () => {
  return (
    <GameContextProvider>
        <App/>
    </GameContextProvider>
  )
}

export default index