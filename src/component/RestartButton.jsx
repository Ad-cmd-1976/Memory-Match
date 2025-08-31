import { useHelperStore } from '../store/useHelperStore.js';

const RestartButton = () => {
    const { generateCards, resetTimerAndMoves, playRestartSound }=useHelperStore();
  return (
    <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 hover:scale-105 transition-all ease-in-out"
        onClick={() => {
          playRestartSound();
          generateCards();
          resetTimerAndMoves();
        }}
        >
        Restart
    </button>
  )
}

export default RestartButton