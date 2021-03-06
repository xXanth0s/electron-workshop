export class ToDoService {

  constructor() {
    this.tasks = [
      {
        id: '0',
        title: 'Mal wieder richtig einen Heben gehen',
        description: 'Im Augustinerkeller'
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
    console.log(this.tasks);
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
