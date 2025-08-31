import { useHelperStore } from "../store/useHelperStore";

const PauseButton = () => {
    const { setGame, pauseTimer }=useHelperStore();
  return (
    <button
    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 hover:scale-105 ring-2 ring-blue-500 transition-all ease-in-out rounded"
    onClick={() => {
    setGame("paused");
    pauseTimer();
    }}
    >
        Pause
    </button>
  )
}

export default PauseButton