import { useHelperStore } from '../store/useHelperStore.js';

const RestartButton = () => {
    const { generateCards, resetTimerAndMoves, setGame, startTimer }=useHelperStore();
  return (
    <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        onClick={() => {
        generateCards();
        resetTimerAndMoves();
        setGame("idle");
        }}
        >
        Restart
    </button>
  )
}

export default RestartButton