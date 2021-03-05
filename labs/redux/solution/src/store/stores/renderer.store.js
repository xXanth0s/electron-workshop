import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';
import { forwardToMain, replayActionRenderer } from 'electron-redux';

export const rendererStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer
  },
  middleware: [
      forwardToMain,
      ...getDefaultMiddleware()
  ]
})

replayActionRenderer(rendererStore);
