import { useHelperStore } from '../store/useHelperStore.js';

const RestartButton = () => {
    const { generateCards, resetTimerAndMoves }=useHelperStore();
  return (
    <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-400 hover:scale-105 transition-all ease-in-out"
        onClick={() => {
        generateCards();
        resetTimerAndMoves();
        }}
        >
        Restart
    </button>
  )
}

export default RestartButton