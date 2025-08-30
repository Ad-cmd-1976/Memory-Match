import { useHelperStore } from "../store/useHelperStore";
const Cards = () => {
    const { cards, handleFlip }=useHelperStore();
  return (
    <div className="grid grid-cols-4 gap-4 p-4 justify-items-center w-full ">
        { cards.map((card, index)=>(
            <div key={card.id} 
            className={`w-20 h-28 flex items-center justify-center rounded-lg cursor-pointer
            ${(card.isFlipped || card.isMatched) ? "bg-pink-500" : "bg-blue-600"}`}
            onClick={()=>handleFlip(index)}
            >
            { ((card.isFlipped || card.isMatched)? card.value : "?")}
            </div>
        )) }
    </div>
  )
}

export default Cards