import React from 'react'
import { useHelperStore } from '../store/useHelperStore.js';
import RestartButton from './RestartButton.jsx';

const Restart = () => {
    const { timer, moves, best }=useHelperStore();
  return (
    <div className='absolute inset-0 flex items-center justify-center bg/black/70'>
        <div className="p-6 bg-gray-800 rounded-lg text-center">
        <h2 className="text-2xl mb-4">{timer===0? "Game Over" : "You Win!"}</h2>
        <p className="mb-2">Moves: {moves}</p>
        <p className="mb-4">Best: {best===0? "-" : best}</p>
        <RestartButton />
        </div>
    </div>
  )
}

export default Restart