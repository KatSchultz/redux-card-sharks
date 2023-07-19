import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../../types";

interface FlippedCardsState {
  flippedCards: PlayingCard[];
  currentFlipCount: number;
  totalMoveCount: number;
}

const initialState: FlippedCardsState = {
  flippedCards: [],
  currentFlipCount: 0,
  totalMoveCount: 0,
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
      // state.currentFlipCount = 0;
    },
    incrementCurrentFlipCount: (state) => {
      state.currentFlipCount += 1;
    },
    resetCurrentFlipCount: (state) => {
      state.currentFlipCount = 0;
    },
    incrementTotalMoveCount: (state) => {
      state.totalMoveCount += 1;
    },
    resetFlipTracking: () => initialState,
  },
});

export const {
  trackFlips,
  resetFlippedCards,
  incrementCurrentFlipCount,
  incrementTotalMoveCount,
  resetCurrentFlipCount,
  resetFlipTracking,
} = flippedCardsSlice.actions;

export default flippedCardsSlice.reducer;
