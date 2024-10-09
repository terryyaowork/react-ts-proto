import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from '../../typings/stores/states/theme';

// TODOS: 後續可以把 theme 設定成 enum
const initialState: ThemeState = {
  theme: 'main',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
