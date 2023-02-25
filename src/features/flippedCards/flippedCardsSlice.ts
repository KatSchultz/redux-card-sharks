import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../../types";

interface FlippedCardsState {
  flippedCards: PlayingCard[];
}

const initialState: FlippedCardsState = {
  flippedCards: [],
};

export const flippedCardsSlice = createSlice({
  name: "flippedCards",
  initialState,
  reducers: {
    trackFlips: (state, action: PayloadAction<PlayingCard>) => {
      state.flippedCards.push(action.payload);
    },
  },
});
