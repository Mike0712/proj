import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "store/thunks/userThunk";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  additionalName: string;
  phoneNumber: string;
  city?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  status: null | string;
  role: string;
  userData: UserData;
}

const initialState = {
  status: null,
  role: "ROLE_ACCOUNT",
  userData: {},
} as UserState;

// Then, handle actions in your reducers:
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    status: (state: UserState, action) => {
      state.status = action.payload;
    },
    userData: (state: UserState, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [authThunk.fulfilled.type]: (state: UserState, { payload }) => {
      const { data } = payload;
      if (data) {
        state.userData = data;
      }
    },
  },
});


export const { status, userData } = userSlice.actions;
export default userSlice.reducer;
