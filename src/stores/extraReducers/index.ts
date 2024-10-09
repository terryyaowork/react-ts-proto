import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CommonState } from '../../typings/stores/states/common';
import { testDataReducers } from './testDataReducers';
import { testAdditionDataReducers } from './testAdditionDataReducers';
import { actionTestData, actionAdditionalData } from '../actions/test';

// 集中管理所有 extraReducers
export const buildCommonStateExtraReducers = (builder: ActionReducerMapBuilder<CommonState>) => {
  builder
    // 第一隻 api
    .addCase(actionTestData.pending, testDataReducers.pending)
    .addCase(actionTestData.fulfilled, testDataReducers.fulfilled)
    .addCase(actionTestData.rejected, testDataReducers.rejected)
    // 第二隻 api
    .addCase(actionAdditionalData.pending, testAdditionDataReducers.pending)
    .addCase(actionAdditionalData.fulfilled, testAdditionDataReducers.fulfilled)
    .addCase(actionAdditionalData.rejected, testAdditionDataReducers.rejected);
};
