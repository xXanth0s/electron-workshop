import '../../../pollyfills'
import { invokeMessageToMain, sendMessageToMain } from '../../../messages/messages.utils';
import { getAllToDoTasks, toggleToDoTaskMessage } from '../../../messages/messages.creator';
import { addTaskToHtml } from './html';

window.toDo = {
  toggleTask(id) {
    sendMessageToMain(toggleToDoTaskMessage({ id }))
  },
  openAddToDoTaskPage() {
    console.log('add ToDoTask');
  }
}

async function loadTasks() {
  try {
    const tasks = await invokeMessageToMain(getAllToDoTasks());
    tasks.forEach(addTaskToHtml);
  } catch (e) {
    console.error('[loadTasks] Error occrued while loading the tasks from main', e);
  }
}

loadTasks()
