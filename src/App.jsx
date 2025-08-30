import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';

function App() {
  const { cards, generateCards, handleFlip, moves, best }=useHelperStore();
  useEffect(()=>{
    generateCards();
  },[])
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      
      <div className="flex justify-between w-full max-w-3xl p-4 text-lg">
        <div>{`Moves: ${moves}`}</div>
        <div>Time: 00:00</div>
        <div>{`Best: ${best}`}</div>
      </div>

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
    </div>
  );
}



export default App
