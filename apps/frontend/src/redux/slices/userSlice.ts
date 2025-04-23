import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  userId?: string;
}

const initialState: UserData = {
    email: "",
    first_name: "",
    last_name: "",
    role: "user",
    userId: "", 
}   

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserDetails: (state, action:PayloadAction<UserData>) => {
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
        },
        resetUserDetails: (state) => {
            state.email = "";
            state.first_name = "";
            state.last_name = "";
            state.role = "";
            state.userId = "";
        }
    }
})

export const {updateUserDetails, resetUserDetails} = userSlice.actions;
export default userSlice.reducer;