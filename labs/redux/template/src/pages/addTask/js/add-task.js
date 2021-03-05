import '../../../pollyfills'
import { addInputMissingError, getTaskDataFromHtml } from './html';
import { rendererStore } from '../../../store/stores/renderer.store';
import { addTaskAction } from '../../../store/reducers/to-do-task.reducer';

window.toDoAddTask = {
  addTask() {
    const task = getTaskDataFromHtml();
    if (isTaskValid(task)) {
      rendererStore.dispatch(addTaskAction(task));
      window.close();
    } else {
      addInputMissingError();
    }
  },
}

function isTaskValid(task) {
  return Boolean(task.title) && Boolean(task.description)
}

