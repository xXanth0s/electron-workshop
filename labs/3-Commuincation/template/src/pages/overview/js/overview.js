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
    title: 'Mal wieder richtig einen Heben gehen',
    description: 'Im Augustinerkeller',
    approved: false
  },
  {
    id: '1',
    title: 'Electron App bauen',
    description: 'Electron ist MEEEGA Geil',
    approve: true
  }
];

tasks.forEach(task => addTaskToHtml(task));
