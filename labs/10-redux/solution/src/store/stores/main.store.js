import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';
import { forwardToRenderer, replayActionMain } from 'electron-redux';

export const mainStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer  // for every store field 1 reducer
  },
  middleware: [
    ...getDefaultMiddleware(),
    forwardToRenderer       // must be the last middleware
  ]
})

replayActionMain(mainStore);   // forwards actions to the renderer process
