const Store = require('electron-store');

const STORE_KEY = 'toDoTaskStore';

export class ToDoService {
  #tasks = {};

  #currentIndex = -1
  #store = new Store();

  constructor() {
    this.#loadStore();
  }

  toggleTaks(id) {
    this.#tasks[id].checked = !this.#tasks[id].checked;
    this.#updateStore();
  }

  addTask(task) {
    task.id = ++this.#currentIndex;
    this.#tasks[this.#currentIndex] = task
    this.#updateStore();
    return task;
  }

  getAllTasks() {
    return Object.values(this.#tasks);
  }

  #loadStore() {
    const storeData = this.#store.get(STORE_KEY);
    if (storeData) {
      this.#currentIndex = storeData.index;
      this.#tasks = storeData.tasks;
    }
  }

  #updateStore() {
    const storeData = {
      index: this.#currentIndex,
      tasks: this.#tasks
    };

    this.#store.set(STORE_KEY, storeData)
  }
}
