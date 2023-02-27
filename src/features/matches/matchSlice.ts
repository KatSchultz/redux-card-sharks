import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../../types";

interface MatchState {
  matches: number;
  matchedCards: string[];
}

const initialState: MatchState = {
  matches: 0,
  matchedCards: [],
};

export const matchSlice = createSlice({
  name: "matches",
  initialState,

  //reducers are actions
  reducers: {
    matchIncrement: (state, action: PayloadAction<number>) => {
      state.matches += action.payload;
    },
    trackMatchedCards: (state, action: PayloadAction<string>) => {
      state.matchedCards.push(action.payload);
    },
    resetMatches: (state) => {
      state = initialState;
    },
  },
});

//Action creators are generated for each case reducer function
export const { matchIncrement, resetMatches, trackMatchedCards } =
  matchSlice.actions;

export default matchSlice.reducer;
