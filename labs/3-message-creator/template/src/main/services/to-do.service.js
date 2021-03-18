export class ToDoService {

  constructor() {
    this.tasks = [
      {
        id: '0',
        title: 'Mal wieder richtig einen heben gehen',
        description: 'Corona fürn A**ch'
      },
      {
        id: '1',
        title: 'Electron App bauen',
        description: 'Electron ist MEEEGA Geil'
      }
    ];
    this.currentIndex = 2;
  }

  toggleTasks(id) {
    this.tasks[id].checked = !this.tasks[id].checked;
  }

  addTask(task) {
    task.id = this.currentIndex++;
    this.tasks.push(task)
    return task;
  }

  getAllTasks() {
    return this.tasks;
  }
}
