import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionSlice {
    token: string;
    isLoggedIn: boolean;
}

const initialState: SessionSlice = {
    token: "",
    isLoggedIn: false,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        updateLoginDetails: (state, action:PayloadAction<SessionSlice>) => {
            console.log(action.payload);
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        resetLoginDetails: (state) => {
            state.token = "";
            state.isLoggedIn = false;
        }
    },
});

export const { updateLoginDetails, resetLoginDetails} = sessionSlice.actions;
export default sessionSlice.reducer;
