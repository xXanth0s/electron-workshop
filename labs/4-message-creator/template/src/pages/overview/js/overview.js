import '../../../pollyfills'
import { ipcRenderer } from 'electron';
import { LOAD_TASKS_MESSAGE, TOGGLE_TASK_MESSAGE } from '../../../messages/messages.const';
import { addTaskToHtml } from './html';

window.toDo = {
  toggleTask(id) {
    ipcRenderer.send(TOGGLE_TASK_MESSAGE, id);
  },
  openAddToDoTaskPage() {
    console.log('add ToDoTask');
  },
}

async function loadTasks() {
  try {
    const tasks = await ipcRenderer.invoke(LOAD_TASKS_MESSAGE);
    tasks.forEach(addTaskToHtml);
  } catch (e) {
    console.error('error occurred while loading tasks from main', e)
  }
}

loadTasks();
