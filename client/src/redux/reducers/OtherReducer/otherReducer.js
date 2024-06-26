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
      .addCase('approachRequest', state => {
        state.loading = true;
      })
      .addCase('approachSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('approachFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearError', state => {
        state.error = null;
      })
      .addCase('fetchNotificationRequest', state => {
        state.loading = true;
      })
      .addCase('fetchNotificationSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.notifications = action.payload.notifications;
      })
      .addCase('fetchNotificationFail', (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase('clearMessage', state => {
        state.message = null;
      });
  }
);
