import { useHelperStore } from "../store/useHelperStore";

function formatTime(time){
  const minutes=String(Math.floor(time/60)).padStart(2, "0");
  const seconds=String(time%60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const MovesTimeBest = () => {
    const { difficulty, moves, timer }=useHelperStore();
    let Best=JSON.parse(localStorage.getItem("Best")) || { "Easy": 0, "Medium": 0, "Hard": 0 };
  return (
    <div className="flex items-center gap-6">
        <span>Moves: {moves}</span>
        <span>Time: {formatTime(timer)}</span>
        <span>Best: {Best[difficulty] === 0 ? "-" : Best[difficulty]}</span>
    </div>
  )
}

export default MovesTimeBest