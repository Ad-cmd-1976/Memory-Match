import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';
import { motion } from 'framer-motion';
import CardContainer from './component/CardContainer.jsx';
import Restart from './component/Restart.jsx';

function formatTime(time){
  const minutes=String(Math.floor(time/60)).padStart(2, "0");
  const seconds=String(time%60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function App() {
  const { generateCards, moves, game, timer, setGame, startTimer, pauseTimer, setDifficulty, difficulty, intervalId, resetTimerAndMoves }=useHelperStore();
  
  useEffect(()=>{
    generateCards();
    if(intervalId!=null) clearInterval(intervalId);
    setGame("idle");
    resetTimerAndMoves();
  },[difficulty]);

  let Best=JSON.parse(localStorage.getItem("Best")) || { "Easy": 0, "Medium": 0, "Hard": 0 };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      
      <div className="flex flex-wrap items-center justify-between w-full max-w-3xl p-4 text-lg gap-3">
        <div className="flex items-center gap-6">
          <span>Moves: {moves}</span>
          <span>Time: {formatTime(timer)}</span>
          <span>Best: {Best[difficulty] === 0 ? "-" : Best[difficulty]}</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="pl-2 pr-5 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {game === "idle" || game === "paused" ? (
            <button
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 hover:scale-105 transition-all ease-in-out rounded"
              onClick={() => {
                setGame("playing");
                startTimer();
              }}
            >
              Start
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 hover:scale-105 transition-all ease-in-out rounded"
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


      { (game==="won" || timer==0) ? (<Restart/>) : (<CardContainer/>)}
    </div>
  );
}



export default App
