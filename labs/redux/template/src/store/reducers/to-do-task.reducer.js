const { createSlice } = require('@reduxjs/toolkit');

const toDoTaskSlice = createSlice({
  name: 'toDoTasks',
  initialState: {},
  reducers: {
    addTaskAction: (state, action) => {
      const id = Object.keys(state).length;
      state[id] = {
        ...action.payload.task,
        id
      };
    },
  }
})

export const { addTaskAction, toggleTaskAction } = toDoTaskSlice.actions;

export const toDoTaskReducer = toDoTaskSlice.reducer;
