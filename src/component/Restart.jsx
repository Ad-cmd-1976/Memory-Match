import { useHelperStore } from '../store/useHelperStore.js';
import RestartButton from './RestartButton.jsx';

const Restart = () => {
    const { timer, moves, difficulty }=useHelperStore();
    let Best=JSON.parse(localStorage.getItem("Best"));
  return (
    <div className='absolute inset-0 flex items-center justify-center bg/black/70'>
        <div className="p-6 bg-gray-800 rounded-lg text-center">
        <h2 className="text-2xl mb-4">{timer===0? "Game Over" : "You Win!"}</h2>
        <p className="mb-2">Moves: {moves}</p>
        <p className="mb-4">Best: {Best[difficulty]===0? "-" : Best[difficulty]}</p>
        <RestartButton />
        </div>
    </div>
  )
}

export default Restart