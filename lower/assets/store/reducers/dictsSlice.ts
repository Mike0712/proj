import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const useFetching = () => {};

// First, create the thunk
const countryThunk = createAsyncThunk("dicts/country", async () => {
  const resp = await useFetching();
  return resp;
});

const currencyThunk = createAsyncThunk("dicts/currency", async () => {
  const resp = await useFetching();
  return resp;
});

interface DictsState {
    countries: [],
    currencies: []
}

const initialState = {
    countries: [],
    currencies: []
} as DictsState


// Create slice
export const dictsSlice = createSlice({
    name: 'dicts',
    initialState,
    reducers: {}
});

export { countryThunk, currencyThunk };
export default dictsSlice.reducer;
