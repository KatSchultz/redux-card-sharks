import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../../types";

interface FlippedCardsState {
  flippedCards: PlayingCard[];
  currentFlipCount: number;
  totalFlipCount: number;
}

const initialState: FlippedCardsState = {
  flippedCards: [],
  currentFlipCount: 0,
  totalFlipCount: 0,
};

export const flippedCardsSlice = createSlice({
  name: "flippedCards",
  initialState,
  reducers: {
    trackFlips: (state, action: PayloadAction<PlayingCard>) => {
      state.flippedCards.push(action.payload);
    },
    resetFlippedCards: (state) => {
      state.flippedCards = [];
    },
    incrementCurrentFlipCount: (state) => {
      state.currentFlipCount += 1;
    },
    incrementTotalFlipCount: (state) => {
      state.totalFlipCount += 1;
    },
  },
});

export const {
  trackFlips,
  resetFlippedCards,
  incrementCurrentFlipCount,
  incrementTotalFlipCount,
} = flippedCardsSlice.actions;

export default flippedCardsSlice.reducer;
