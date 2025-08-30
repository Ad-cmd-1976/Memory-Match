import { create } from "zustand";
import flipSoundFile from "../assets/flip.mp3";

export const useHelperStore=create((set,get)=>({
    cards:[],
    flipped:[],
    moves:0,
    timer: 30,
    difficulty:"Easy",
    best: 0,
    game: "idle",
    intervalId: null,
    setDifficulty: (state)=>set({ difficulty: state }),
    setGame: (state)=>set({ game: state}),
    resetTimerAndMoves: ()=>{
        if(get().intervalId) clearInterval(get().intervalId)
        set({ timer: 30, moves:0, intervalId: null, game: "idle" });
    },

    generateCards:()=>{
        const obj={
            "Easy": [1,2,3,4],
            "Medium":[1,2,3,4,5,6],
            "Hard":[1,2,3,4,5,6,7,8]
        };
        const diff=get().difficulty;
        const arr=obj[diff];
        const deck=[...arr,...arr].sort(() => Math.random()-0.5).map((value,ind)=>({
            id:ind,
            value,
            isFlipped:false,
            isMatched:false
        }))
        set({ cards:deck });
    },

    playFlipSound:()=>{
        const audio = new Audio(flipSoundFile);
        audio.volume = 0.5; 
        audio.play();
    },

    handleFlip:(index)=>{
        if(get().game!=="playing") return;
        const card=get().cards[index];
        if((get().flipped).length===2 || card.isFlipped || card.isMatched) return;
        
        get().playFlipSound();
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
            clearInterval(get().intervalId);
            set({ game: "won", intervalId: null });

            const moves=get().moves;
            if(moves<get().best || get().best==0){
                set({ best: moves });
                localStorage.setItem("Best", get().moves);
            }
        }
    },

    startTimer:()=>{
        if(get().intervalId!=null) return;
        
        const id=setInterval(() => {
            const currentTime=get().timer;
            if(currentTime>0){
                set({ timer: currentTime-1 });
            }
            else{
                clearInterval(get().intervalId);
                set({ intervalId: null, game: "over" });
            }
        }, 1000);

        set({ intervalId: id });
    },

    pauseTimer:()=>{
        clearInterval(get().intervalId);
        set({ intervalId: null, game:"paused" });
    }
}))