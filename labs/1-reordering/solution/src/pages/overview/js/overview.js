import '../../../styles/styles.css'

import 'bootstrap'
import { drawTaskToHTML } from './html';

window.toDo = {
  toggleTask(id) {
    return ipcRenderer.invoke(TOGGLE_TASK_MESSAGE, id);
  },
  openAddToDoTaskPage() {
    console.log('add ToDoTask');
  },
}

const toDoTasks = [
  {
    id: '1',
    title: 'Neue Bewerbung schreiben',
    description: 'Am besten bei adesso :D'
  },
  {
    id: '2',
    title: 'Electron App bauen',
    description: 'Electron ist MEEEGA Geil'
  }
];

toDoTasks.forEach(drawTaskToHTML)
