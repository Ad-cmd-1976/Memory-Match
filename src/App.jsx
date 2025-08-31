import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';
import Navbar from './component/Navbar.jsx';
import CardContainer from './component/CardContainer.jsx';
import Restart from './component/Restart.jsx';
import StartButton from './component/StartButton.jsx';
import PauseButton from './component/PauseButton.jsx';
import MovesTimeBest from './component/MovesTimeBest.jsx';
import Select from './component/Select.jsx';

function App() {
  const { generateCards, game, timer, setGame, difficulty, intervalId, resetTimerAndMoves }=useHelperStore();
  
  useEffect(()=>{
    generateCards();
    if(intervalId!=null) clearInterval(intervalId);
    setGame("idle");
    resetTimerAndMoves();
  },[difficulty]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white overflow-x-hidden">

      <Navbar />
      
      <div className="flex flex-wrap items-center justify-between w-full max-w-3xl p-4 text-lg gap-3">
        <MovesTimeBest/>
        <div className="flex items-center gap-3">
          <Select/>
          {game === "idle" || game === "paused" ? (<StartButton/>) : (<PauseButton/>)}
        </div>
      </div>


      { (game==="won" || timer==0) ? (<Restart/>) : (<CardContainer/>)}
    </div>
  );
}



export default App
