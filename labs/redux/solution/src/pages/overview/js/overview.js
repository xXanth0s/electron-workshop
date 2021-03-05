import '../../../pollyfills'
import { sendMessageToMain } from '../../../messages/messages.utils';
import { openAddToDoTaskPageMessage } from '../../../messages/messages.creator';
import { addTaskToHtml } from './html';
import { rendererStore } from '../../../store/stores/renderer.store';
import { toggleTaskAction } from '../../../store/reducers/to-do-task.reducer';

window.toDo = {
  toggleTask(taskId) {
    rendererStore.dispatch(toggleTaskAction({taskId}))
  },
  openAddToDoTaskPage() {
    sendMessageToMain(openAddToDoTaskPageMessage())
  }
}

async function loadTasks() {
  try {
    let renderedTasks = [];
    rendererStore.subscribe(() => {
      const state = rendererStore.getState();
      const tasks = Object.values(state.tasks);

      tasks.filter(task => !renderedTasks.some(renderedTask => renderedTask.id === task.id))
          .forEach(task => addTaskToHtml(task));

      renderedTasks = tasks;
    })
  } catch (e) {
    console.error('[loadTasks] Error occrued while loading the tasks from main', e);
  }
}

loadTasks()
