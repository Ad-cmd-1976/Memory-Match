import { useHelperStore } from "../store/useHelperStore";

const StartButton = () => {
    const { setGame, startTimer }=useHelperStore();
  return (
    <button
    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 hover:scale-105 transition-all ease-in-out rounded ring-2 ring-blue-500"
    onClick={() => {
    setGame("playing");
    startTimer();
    }}
    >
        Start
    </button>
  )
}

export default StartButton