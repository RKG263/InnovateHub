import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  builder => {
    builder
      .addCase('contactRequest', state => {
        state.loading = true;
      })
      .addCase('contactSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('contactFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearError', state => {
        state.error = null;
      })
      .addCase('clearMessage', state => {
        state.message = null;
      });
  }
);
