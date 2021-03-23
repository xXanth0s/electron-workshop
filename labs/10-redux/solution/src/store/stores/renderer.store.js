import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { forwardToMain, replayActionRenderer } from 'electron-redux';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';

export const rendererStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer     // for every store field 1 reducer
  },
  middleware: [
    forwardToMain,           // must be the first middleware
    ...getDefaultMiddleware()
  ]
})

replayActionRenderer(rendererStore); // forwards actions to the main process
