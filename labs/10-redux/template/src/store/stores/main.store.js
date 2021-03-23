import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';
import { forwardToRenderer, replayActionMain } from 'electron-redux';

export const mainStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer
  },
  middleware: [
    ...getDefaultMiddleware(),
    forwardToRenderer       // must be the last middleware
  ]
})

replayActionMain(mainStore);
