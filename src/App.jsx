import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';

function formatTime(time){
  const minutes=String(Math.floor(time/60)).padStart(2, "0");
  const seconds=String(time%60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function App() {
  const { cards, generateCards, handleFlip, moves, best, game, timer, setGame, startTimer, resetTimerAndMoves, pauseTimer }=useHelperStore();

  useEffect(()=>{
    generateCards();
  },[]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      
      <div className="flex justify-between w-full max-w-3xl p-4 text-lg">
        <div>{`Moves: ${moves}`}</div>
        <div>{`Time: ${formatTime(timer)}`}</div>
        <div>{`Best: ${best==0? "-": best}`}</div>
        { (game==="idle" || game==="paused") ?(
          <button 
          className='px-3 py-1 bg-gray-700 rounded' 
          onClick={()=>{
            setGame("playing");
            startTimer();}
          }
          >
            Start
          </button>
        ) : (
          <button 
          className="px-3 py-1 bg-gray-700 rounded" 
          onClick={() =>{
            setGame("paused");
            pauseTimer();
          }}>
            Pause
          </button>
        )}
      </div>


      { (game==="won" || timer==0) ? (
        <div className='absolute inset-0 flex items-center justify-center bg/black/70'>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h2 className="text-2xl mb-4">{timer===0? "Game Over" : "You Win!"}</h2>
            <p className="mb-2">Moves: {moves}</p>
            <p className="mb-4">Best: {best===0? "-" : best}</p>
            <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              onClick={() => {
                generateCards();
                resetTimerAndMoves();
                setGame("playing");
              }}
            >
              Restart
            </button>
          </div>
        </div>
      ): (
        <div className="grid grid-cols-4 gap-4 p-4 w-full max-w-3xl border border-gray-700 rounded-lg bg-gray-800">
          { cards.map((card, index)=>(
            <div key={card.id} 
            className={`w-20 h-28 flex items-center justify-center rounded-lg cursor-pointer
            ${(card.isFlipped || card.isMatched) ? "bg-pink-500" : "bg-blue-600"}`}
            onClick={()=>handleFlip(index)}
            >
              { ((card.isFlipped || card.isMatched)? card.value : "?")}
            </div>
          )) }
        </div>
      )}
    </div>
  );
}



export default App
