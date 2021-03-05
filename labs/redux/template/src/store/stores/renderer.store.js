import { configureStore } from '@reduxjs/toolkit';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';
import { replayActionRenderer } from 'electron-redux';

export const rendererStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer
  },
})

replayActionRenderer(rendererStore);
