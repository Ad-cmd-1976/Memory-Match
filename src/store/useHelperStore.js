import { create } from "zustand";

export const useHelperStore=create((set,get)=>({
    cards:[],
    moves:0,
    timer:0,
    best:0,

    generateCards:()=>{
        const arr=[1,2,3,4,5,6,7,8];
        const deck=arr.sort(() => Math.random-0.8).map((val,ind)=>({
            id:ind,
            val,
            isFlipped:false,
            isMatched:false
        }))
        set({ cards:deck });
    }
}))