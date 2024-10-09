import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../../typings/stores/states/user';

const initialState: UserState = {
  isAdmin: false,
  isAuthenticated: false,
  role: 'common-user',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAdminStatus: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const {
  setAdminStatus,
  setAuthenticatedStatus,
  setUserRole,
} = userSlice.actions;

export default userSlice.reducer;
