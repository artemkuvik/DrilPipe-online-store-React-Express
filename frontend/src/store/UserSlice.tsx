import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../types/types";

const initialState: UserState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
