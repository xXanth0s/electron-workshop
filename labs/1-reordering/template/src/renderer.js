import './pollyfills'
import './index.css';
import { ipcRenderer } from 'electron';
import { TOGGLE_TASK_MESSAGE } from '../../../2-Commuincation/solution/src/messages/messages.const';

const fallbackTask = {
  id: '42',
  title: '',
  description: '',
  checked: false
}

/*
adding task to the html.
@Input task. structure {id: string, title: string, description: string, checked: boolean)
 */
export function addTaskToHtml(task = fallbackTask) {
  const id = `task_${task.id}`
  const html = `
    <div class="card mt-2">
        <div class="card-header">
            
            <div class="d-flex align-content-center justify-content-between">
              <div class="d-flex align-content-center">
                  ${task.title}
                <button class="btn btn-link p-0 ml-1"
                        data-toggle="collapse"
                        data-target="#${id}">
                        toggle
                </button>
              </div>  
              <div class="form-check">
                <input type="checkbox" onchange="toDo.toggleTask(${task.id})" class="form-check-input" ${task.checked ? 'checked' : ''}>
              </div>         
            </div>               
        </div>
        <div id="${id}" class="collapse">
            <div class="card-body">
            ${task.description}
            </div>
        </div>
    </div>`

  const div = document.createElement('div');
  div.innerHTML = html;

  document.getElementById('to-do-container').appendChild(div);
}

window.toDo = {
  toggleTask(id) {
    return ipcRenderer.invoke(TOGGLE_TASK_MESSAGE, id);
  },
  openAddToDoTaskPage() {
    console.log('add ToDoTask');
  },
};

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

addTaskToHtml(toDoTasks)
