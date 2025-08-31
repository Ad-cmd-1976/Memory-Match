import Cards from '../component/Cards.jsx';
import RestartButton from '../component/RestartButton.jsx';
import { motion } from 'framer-motion';

const CardContainer = () => {
  return (
    <motion.div layout
    transition={{duration:0.4, ease:"easeInOut"}} 
    className='flex flex-col border border-gray-700 rounded-lg bg-gray-800 w-full max-w-3xl pb-3'
    >
        <div className='w-full'>
        <Cards />
        </div>
        <div className='flex justify-center'>
        <RestartButton />  
        </div>
    </motion.div>
  )
}

export default CardContainer