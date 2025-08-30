import { useEffect } from 'react';
import { useHelperStore } from './store/useHelperStore.js';

function App() {
  const { cards, generateCards }=useHelperStore();
  useEffect(()=>{
    generateCards();
  },[])
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      
      <div className="flex justify-between w-full max-w-3xl p-4 text-lg">
        <div>Moves: 0</div>
        <div>Time: 00:00</div>
        <div>Best: 15 moves</div>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 w-full max-w-3xl border border-gray-700 rounded-lg bg-gray-800">
        { cards.map((card, index)=>(
          <div key={cards.id} className={`w-20 h-28 flex items-center justify-center rounded-lg cursor-pointer`}>
            { ((card.isflipped || card.isMatched)? card.value : "?")}
          </div>
        )) }
      </div>
    </div>
  );
}



export default App
