import { create } from "zustand";

export const useHelperStore=create((set,get)=>({
    cards:[],
    flipped:[],
    moves:0,
    timer:0,
    best: 0,
    game: "idle",
    setGame: (state)=>set({ game: state}),
    resetTimerAndMoves: ()=>set({ timer: 0, moves:0 }),

    generateCards:()=>{
        const arr=[1,2,3,4,5,6,7,8];
        const deck=[...arr,...arr].sort(() => Math.random-0.8).map((value,ind)=>({
            id:ind,
            value,
            isFlipped:false,
            isMatched:false
        }))
        set({ cards:deck });
    },

    handleFlip:(index)=>{
        const card=get().cards[index];
        if(get().flipped.length===2 || card.isFlipped || card.isMatched) return;
        
        const newCards=get().cards;
        newCards[index].isFlipped=true;
        set({ cards: newCards });
        
        const newFlipped=[...get().flipped, index];
        set({ flipped: newFlipped });
        if(newFlipped.length==2){
            set({ moves: get().moves+1 });
            const [ind1, ind2]=newFlipped;
            if(newCards[ind1].value===newCards[ind2].value){
                newCards[ind1].isMatched=true;
                newCards[ind2].isMatched=true;
                set({ cards: newCards, flipped: [] });
                get().isWon(newCards);
            }
            else{
                setTimeout(()=>{
                    newCards[ind1].isFlipped=false;
                    newCards[ind2].isFlipped=false;
                    set({ cards: newCards, flipped: [] });
                }, 1000)
            }
        }
    },

    isWon:(cards)=>{
        if(cards.every(card=>card.isMatched)){
            set({ game: "won" });
            const moves=get().moves;
            if(moves<get().best || get().best==0){
                set({ best: moves });
                localStorage.setItem("Best", get().moves);
            }
        }
    },

    startTimer:()=>{
        let timer=0
        if(get().game==="playing"){
            timer=setInterval(() => {
                set({ timer: get().timer+1 });
            }, 1000);
        }
        return ()=>clearInterval();
    }
}))