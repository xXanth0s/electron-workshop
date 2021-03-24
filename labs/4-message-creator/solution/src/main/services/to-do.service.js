export class ToDoService {

  constructor() {
    this.tasks = [
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
        approved: true
      }
    ];
    this.currentIndex = 2;
  }

  toggleTasks(id) {
    this.tasks[id].checked = !this.tasks[id].checked;
    console.log(this.tasks);
  }

  getAllTasks() {
    return this.tasks;
  }
}
