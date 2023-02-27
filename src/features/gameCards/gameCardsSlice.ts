import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../../types";

interface GameCards {
  gameCards: PlayingCard[];
}

const initialState: GameCards = {
  gameCards: [
    { id: 1, name: "stingray", image: "/images/img-0.png" },
    { id: 2, name: "stingray", image: "/images/img-0.png" },
    { id: 3, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 4, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 5, name: "clownfish", image: "/images/img-2.png" },
    { id: 6, name: "clownfish", image: "/images/img-2.png" },
    { id: 7, name: "octopus", image: "/images/img-3.png" },
    { id: 8, name: "octopus", image: "/images/img-3.png" },
    { id: 9, name: "sea turtle", image: "/images/img-4.png" },
    { id: 10, name: "sea turtle", image: "/images/img-4.png" },
    { id: 11, name: "whale shark", image: "/images/img-5.png" },
    { id: 12, name: "whale shark", image: "/images/img-5.png" },
  ],
};

const gameCardsSlice = createSlice({
  name: "gameCards",
  initialState,

  reducers: {
    shuffleCards: (state) => {
      const clonedCards = initialState.gameCards.slice(0);
      const randomArray = [];
      for (let i = 0; i < 12; i++) {
        let randomIndex = Math.floor(Math.random() * clonedCards.length);
        randomArray.push(clonedCards[randomIndex]);
        clonedCards.splice(randomIndex, 1);
      }
      state.gameCards = randomArray;
    },
  },
});

export const { shuffleCards } = gameCardsSlice.actions;

export default gameCardsSlice.reducer;
