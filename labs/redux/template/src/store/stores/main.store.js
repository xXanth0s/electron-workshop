import { configureStore } from '@reduxjs/toolkit';
import { toDoTaskReducer } from '../reducers/to-do-task.reducer';
import { forwardToRenderer, replayActionMain } from 'electron-redux';

export const mainStore = configureStore({
  reducer: {
    tasks: toDoTaskReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(forwardToRenderer)
})

replayActionMain(mainStore);
