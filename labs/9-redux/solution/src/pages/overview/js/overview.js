import '../../../pollyfills'
import { sendMessageToMain } from '../../../messages/messages.utils';
import { addTaskToHtml } from './html';
import { rendererStore } from '../../../store/stores/renderer.store';
import { toggleTaskAction } from '../../../store/reducers/to-do-task.reducer';
import { getAllToDoTasks } from '../../../store/selectors/to-do-task.selector';
import { openAddToDoTaskPageMessage } from '../../../messages/messages.creator';

window.toDo = {
  toggleTask(taskId) {
    rendererStore.dispatch(toggleTaskAction({ taskId }))
  },
  openAddToDoTaskPage() {
    sendMessageToMain(openAddToDoTaskPageMessage())
  }
}

async function loadTasks() {
  try {
    let renderedTasksIds = [];
    rendererStore.subscribe(() => {
      const tasks = getAllToDoTasks(rendererStore.getState());

      tasks.filter(task => !renderedTasksIds.includes(task.id)).forEach(task => addTaskToHtml(task));

      renderedTasksIds = tasks.map(task => task.id);
    })
  } catch (e) {
    console.error('[loadTasks] Error occrued while loading the tasks from main', e);
  }
}

loadTasks()
