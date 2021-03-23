const { createSlice } = require('@reduxjs/toolkit');

const toDoTaskSlice = createSlice({
  name: 'toDoTasks',
  initialState: {
    0: {
      id: '0',
      title: 'Mal wieder richtig einen Heben gehen',
      description: 'Im Augustinerkeller'
    },
    1: {
      id: '1',
      title: 'Electron App bauen',
      description: 'Electron ist MEEEGA Geil'
    }
  },
  reducers: {
    toggleTaskAction: (state, action) => {
      state[action.payload.taskId].checked = !state[action.payload.taskId].checked;
    }
  }
})

export const { addTaskAction, toggleTaskAction } = toDoTaskSlice.actions;

export const toDoTaskReducer = toDoTaskSlice.reducer;
