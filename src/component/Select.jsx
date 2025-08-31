import { useHelperStore } from "../store/useHelperStore.js";

const Select = () => {
    const { setDifficulty }=useHelperStore();
  return (
    <select
    className="pl-2 pr-5 py-2 bg-gray-700 rounded ring-2 ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) => setDifficulty(e.target.value)}
    >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
    </select>
  )
}

export default Select