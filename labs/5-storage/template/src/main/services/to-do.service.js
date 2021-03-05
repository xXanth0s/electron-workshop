export class ToDoService {

  #tasks = {
    1: {
      id: '1',
      title: 'Neue Bewerbung schreieben',
      description: 'Am besten bei adesso :D',
      approved: false
    },
    2: {
      id: '2',
      title: 'Electron App bauen',
      description: 'Electron ist MEEEGA Geil',
      approved: true
    }
  }

  constructor() {
    this.currentIndex = 2;
  }

  toggleTask(id) {
    this.#tasks[id].checked = !this.#tasks[id].checked;
  }

  addTask(task) {
    task.id = ++this.currentIndex;
    this.#tasks[this.currentIndex] = task
    return task;
  }

  getAllTasks() {
    return Object.values(this.#tasks);
  }
}
