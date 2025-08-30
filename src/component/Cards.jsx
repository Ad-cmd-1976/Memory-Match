import { motion } from "framer-motion";
import { useHelperStore } from "../store/useHelperStore";
 // <-- put your sound file in src/assets

const Cards = () => {
  const { cards, handleFlip } = useHelperStore();

  return (
    <div className="grid grid-cols-4 gap-4 p-4 justify-items-center w-full">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="w-20 h-28 perspective cursor-pointer"
          onClick={() => handleFlip(index)}
        >
          <motion.div
            className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
              card.isFlipped || card.isMatched ? "rotate-y-180" : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-blue-600 rounded-lg text-2xl font-bold backface-hidden">
              ?
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-pink-500 rounded-lg text-2xl font-bold backface-hidden rotate-y-180">
              {card.value}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
