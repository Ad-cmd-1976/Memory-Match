import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';
import Cards from './component/Cards.jsx';
import Restart from './component/Restart.jsx';
import RestartButton from './component/RestartButton.jsx';

function formatTime(time){
  const minutes=String(Math.floor(time/60)).padStart(2, "0");
  const seconds=String(time%60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function App() {
  const { generateCards, moves, best, game, timer, setGame, startTimer, pauseTimer, setDifficulty, difficulty, intervalId, resetTimerAndMoves }=useHelperStore();

  useEffect(()=>{
    generateCards();
    if(intervalId!=null) clearInterval(intervalId);
    setGame("idle");
    resetTimerAndMoves();
  },[difficulty]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      
      <div className="flex flex-wrap items-center justify-between w-full max-w-3xl p-4 text-lg gap-3">
        <div className="flex items-center gap-6">
          <span>Moves: {moves}</span>
          <span>Time: {formatTime(timer)}</span>
          <span>Best: {best === 0 ? "-" : best}</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="pl-2 pr-5 py-2 bg-gray-700 rounded"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {game === "idle" || game === "paused" ? (
            <button
              className="px-3 py-1 bg-gray-700 rounded"
              onClick={() => {
                setGame("playing");
                startTimer();
              }}
            >
              Start
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-gray-700 rounded"
              onClick={() => {
                setGame("paused");
                pauseTimer();
              }}
            >
              Pause
            </button>
          )}
        </div>
      </div>


      { (game==="won" || timer==0) ? (
        <Restart/>
      ): (
        <div className='flex flex-col border border-gray-700 rounded-lg bg-gray-800 w-full max-w-3xl pb-3'>
          <Cards />
          <div className='flex justify-center'>
            <RestartButton />  
          </div>
         </div> 
      )}
    </div>
  );
}



export default App
