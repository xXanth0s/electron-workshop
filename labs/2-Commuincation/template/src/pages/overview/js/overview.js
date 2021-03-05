import '../../../pollyfills'
import { addTaskToHtml } from './html';


window.toDo = {
  toggleTask(id) {
    console.log('toggle task with id', id);
  },
  openAddToDoTaskPage() {
    console.log('add ToDoTask');
  },
}

const tasks = [
  {
    id: '0',
    title: 'Neue Bewerbung schreiben',
    description: 'Am besten bei adesso :D'
  },
  {
    id: '1',
    title: 'Electron App bauen',
    description: 'Electron ist MEEEGA Geil'
  }
];

tasks.forEach(task => addTaskToHtml(task));
