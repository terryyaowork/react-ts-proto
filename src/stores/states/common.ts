import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildCommonStateExtraReducers } from '../extraReducers/index'; // 使用集中管理的 extraReducers
import type { TestData, AdditionalData } from '../../typings/apis/index';
import type { CommonState } from '../../typings/stores/states/common';

const initialState: CommonState = {
  isLoading: false,
  testData: null,
  additionalData: null,
  requestSuccess: false,
  requestError: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTestData: (state, action: PayloadAction<TestData>) => {
      state.testData = action.payload;
    },
    setAdditionalData: (state, action: PayloadAction<AdditionalData>) => {
      state.additionalData = action.payload;
    },
    setRequestSuccess: (state, action: PayloadAction<boolean>) => {
      state.requestSuccess = action.payload;
    },
    setRequestError: (state, action: PayloadAction<string | null>) => {
      state.requestError = action.payload;
    },
  },
  extraReducers: (builder) => {
    buildCommonStateExtraReducers(builder); // 使用我們的 extraReducers
  },
});

export const {
  setLoadingStatus,
  setTestData,
  setRequestSuccess,
  setRequestError,
} = commonSlice.actions;
export default commonSlice.reducer;
